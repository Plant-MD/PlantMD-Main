import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('🧪 [TEST-FORMAT] Testing different API request formats...');
  
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const plant = formData.get('plant') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log('📤 [TEST-FORMAT] Testing with file:', file.name, file.type, file.size);

    // Test 1: FormData with 'file' and 'plant'
    console.log('🧪 [TEST-FORMAT] Test 1: FormData with file + plant');
    try {
      const testFormData1 = new FormData();
      testFormData1.append('file', file);
      testFormData1.append('plant', plant);

      const response1 = await fetch('https://api.plantmd.xyz/predict', {
        method: 'POST',
        body: testFormData1,
        signal: AbortSignal.timeout(10000),
      });

      console.log('📡 [TEST-FORMAT] Test 1 response:', response1.status);
      if (response1.ok) {
        const data1 = await response1.json();
        return NextResponse.json({
          success: true,
          format: 'FormData with file + plant',
          status: response1.status,
          data: data1
        });
      } else {
        const error1 = await response1.text();
        console.log('❌ [TEST-FORMAT] Test 1 failed:', error1);
      }
    } catch (error) {
      console.log('❌ [TEST-FORMAT] Test 1 error:', error);
    }

    // Test 2: FormData with 'image' and 'category'
    console.log('🧪 [TEST-FORMAT] Test 2: FormData with image + category');
    try {
      const testFormData2 = new FormData();
      testFormData2.append('image', file);
      testFormData2.append('category', plant);

      const response2 = await fetch('https://api.plantmd.xyz/predict', {
        method: 'POST',
        body: testFormData2,
        signal: AbortSignal.timeout(10000),
      });

      console.log('📡 [TEST-FORMAT] Test 2 response:', response2.status);
      if (response2.ok) {
        const data2 = await response2.json();
        return NextResponse.json({
          success: true,
          format: 'FormData with image + category',
          status: response2.status,
          data: data2
        });
      } else {
        const error2 = await response2.text();
        console.log('❌ [TEST-FORMAT] Test 2 failed:', error2);
      }
    } catch (error) {
      console.log('❌ [TEST-FORMAT] Test 2 error:', error);
    }

    // Test 3: JSON with base64 image
    console.log('🧪 [TEST-FORMAT] Test 3: JSON with base64');
    try {
      const base64 = await file.arrayBuffer().then(buffer => 
        Buffer.from(buffer).toString('base64')
      );

      const jsonData = {
        image: base64,
        category: plant,
        filename: file.name
      };

      const response3 = await fetch('https://api.plantmd.xyz/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
        signal: AbortSignal.timeout(10000),
      });

      console.log('📡 [TEST-FORMAT] Test 3 response:', response3.status);
      if (response3.ok) {
        const data3 = await response3.json();
        return NextResponse.json({
          success: true,
          format: 'JSON with base64',
          status: response3.status,
          data: data3
        });
      } else {
        const error3 = await response3.text();
        console.log('❌ [TEST-FORMAT] Test 3 failed:', error3);
      }
    } catch (error) {
      console.log('❌ [TEST-FORMAT] Test 3 error:', error);
    }

    return NextResponse.json({
      success: false,
      message: 'All test formats failed',
      note: 'Check server logs for detailed error information'
    }, { status: 400 });

  } catch (error) {
    console.error('💥 [TEST-FORMAT] Test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 