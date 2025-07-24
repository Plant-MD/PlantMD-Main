import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an image.' },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    const externalFormData = new FormData();
    externalFormData.append('file', file);

    const response = await fetch(
      'https://ec2-3-76-37-144.eu-central-1.compute.amazonaws.com:8000/predict',
      {
        method: 'POST',
        body: externalFormData,

        signal: AbortSignal.timeout(30000), 
      }
    );

    if (!response.ok) {
      console.error('External API error:', response.status, response.statusText);
      return NextResponse.json(
        { error: `Analysis service unavailable. Please try again later. (${response.status})` },
        { status: 502 }
      );
    }

    const data = await response.json();

    if (!data.predictions || !Array.isArray(data.predictions)) {
      console.error('Invalid response structure from external API:', data);
      return NextResponse.json(
        { error: 'Invalid response from analysis service' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      predictions: data.predictions
    });

  } catch (error) {
    console.error('API route error:', error);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Analysis timeout. Please try again with a smaller image.' },
          { status: 408 }
        );
      }
      
      if (error.message.includes('fetch')) {
        return NextResponse.json(
          { error: 'Unable to connect to analysis service. Please try again later.' },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}