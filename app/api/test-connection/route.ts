import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('🧪 [TEST] Testing connection to PlantMD API...');
  
  try {
    // Test with a simple GET request to check if the API is accessible
    console.log('🌐 [TEST] Testing basic connectivity to PlantMD API...');
    const testResponse = await fetch('https://api.plantmd.xyz/predict', {
      method: 'GET',
      signal: AbortSignal.timeout(10000),
    });
    
    console.log('📡 [TEST] Test response status:', testResponse.status);
    console.log('📡 [TEST] Test response headers:', Object.fromEntries(testResponse.headers.entries()));
    
    return NextResponse.json({
      success: true,
      status: testResponse.status,
      message: 'PlantMD API is accessible',
      endpoint: 'https://api.plantmd.xyz/predict',
      headers: Object.fromEntries(testResponse.headers.entries())
    });
    
  } catch (error) {
    console.error('💥 [TEST] Connection test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'PlantMD API is not accessible',
      endpoint: 'https://api.plantmd.xyz/predict',
      note: 'This might be expected if the API only accepts POST requests'
    }, { status: 503 });
  }
} 