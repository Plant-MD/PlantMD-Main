import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('🌐 [API] POST request received to /api/analyze');
  try {
    console.log('📦 [API] Parsing FormData...');
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const plant = formData.get('plant') as string;

    console.log('📋 [API] Request details - Plant category:', plant, 'File type:', file?.type, 'File size:', file?.size);

    if (!file) {
      console.log('❌ [API] No file provided in request');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!file.type.startsWith('image/')) {
      console.log('❌ [API] Invalid file type:', file.type);
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an image.' },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      console.log('❌ [API] File too large:', file.size, 'bytes');
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    console.log('✅ [API] File validation passed, preparing external API request...');
    
    // According to API docs: plant as query parameter, file as request body
    const externalFormData = new FormData();
    externalFormData.append('file', file);
    // Note: plant parameter will be added as query parameter, not in FormData

    // Log what we're sending
    console.log('📤 [API] FormData contents:');
    console.log('  file:', file.name, file.type, file.size, 'bytes');
    console.log('  plant (query param):', plant);

    console.log('🌍 [API] Sending request to external API with plant:', plant);
    console.log('🌐 [API] External API URL: https://api.plantmd.xyz/predict');
    
    try {
      // Build URL with query parameter
      const url = `https://api.plantmd.xyz/predict?plant=${encodeURIComponent(plant)}`;
      console.log('🔗 [API] Full URL with query params:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        body: externalFormData, // Only file in FormData, plant is in URL
        signal: AbortSignal.timeout(30000), 
      });

      console.log('📡 [API] External API response status:', response.status);
      console.log('📡 [API] External API response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [API] External API error:', response.status, response.statusText);
        console.error('❌ [API] Error response body:', errorText);
        
        // Try to parse error response as JSON for more details
        try {
          const errorJson = JSON.parse(errorText);
          console.error('❌ [API] Parsed error response:', errorJson);
        } catch (e) {
          console.error('❌ [API] Error response is not JSON:', errorText);
        }
        
        return NextResponse.json(
          { error: `Analysis service unavailable. Please try again later. (${response.status})` },
          { status: 502 }
        );
      }

      console.log('✅ [API] External API request successful, parsing response...');
      const data = await response.json();
      console.log('📊 [API] External API response data:', data);

      if (!data.predictions || !Array.isArray(data.predictions)) {
        console.error('❌ [API] Invalid response structure from external API:', data);
        return NextResponse.json(
          { error: 'Invalid response from analysis service' },
          { status: 502 }
        );
      }

      console.log('✅ [API] Response validation passed, returning predictions');
      return NextResponse.json({
        success: true,
        predictions: data.predictions
      });
    } catch (fetchError) {
      console.error('💥 [API] Fetch error details:', fetchError);
      console.error('💥 [API] Error name:', fetchError instanceof Error ? fetchError.name : 'Unknown');
      console.error('💥 [API] Error message:', fetchError instanceof Error ? fetchError.message : 'Unknown');
      
      if (fetchError instanceof Error) {
        if (fetchError.name === 'AbortError') {
          console.log('⏰ [API] Request timeout');
          return NextResponse.json(
            { error: 'Analysis timeout. Please try again with a smaller image.' },
            { status: 408 }
          );
        }
        
        if (fetchError.message.includes('fetch') || fetchError.message.includes('network')) {
          console.log('🌐 [API] Network connection error');
          return NextResponse.json(
            { error: 'Unable to connect to analysis service. Please try again later.' },
            { status: 503 }
          );
        }
      }
      
      throw fetchError; // Re-throw to be caught by outer catch block
    }

  } catch (error) {
    console.error('💥 [API] API route error:', error);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.log('⏰ [API] Request timeout');
        return NextResponse.json(
          { error: 'Analysis timeout. Please try again with a smaller image.' },
          { status: 408 }
        );
      }
      
      if (error.message.includes('fetch')) {
        console.log('🌐 [API] Network connection error');
        return NextResponse.json(
          { error: 'Unable to connect to analysis service. Please try again later.' },
          { status: 503 }
        );
      }
    }

    console.log('❓ [API] Unexpected error occurred');
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}