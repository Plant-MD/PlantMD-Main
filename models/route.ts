import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CureModel from "@/models/cure";
import DiseaseModel from "@/models/Disease";
 
export async function GET(request: NextRequest) {
  await dbConnect();
 
  try {
    // Get query param from URL, e.g. /api/cure?disease=Powdery%20Mildew
    const { searchParams } = new URL(request.url);
    const disease = searchParams.get("disease");
    const disease_id = searchParams.get("disease_id");
 
    if (!disease && !disease_id) {
      return NextResponse.json(
        { success: false, message: "Provide disease or disease_id in query" },
        { status: 400 }
      );
    }
 
    // Query Cure collection by disease or disease_id
    const cure = await CureModel.findOne({
      $or: [{ disease_id }, { disease }],
    }).lean();
 
    if (!cure) {
      return NextResponse.json(
        { success: false, message: "Cure not found" },
        { status: 404 }
      );
    }
 
    // Return cure info
    return NextResponse.json({ success: true, cure }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cure:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}