import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CureModel from "@/models/Cure";
import DiseaseModel from "@/models/Disease";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const diseaseName = searchParams.get("disease_name");
    const confidence = searchParams.get("confidence");

    if (!diseaseName) {
      return NextResponse.json(
        { success: false, message: "Provide disease_name in query" },
        { status: 400 }
      );
    }

    console.log("Searching for disease:", diseaseName);

    // Search Disease collection by disease_name
    const disease = await DiseaseModel.findOne({ disease_name: diseaseName }).lean();

    if (!disease) {
      console.log("Disease not found");
      return NextResponse.json(
        { success: false, message: "Disease not found" },
        { status: 404 }
      );
    }

    // Get related cure data using disease_id
    const cure = await CureModel.findOne({ disease_id: disease._id }).lean() || {};

    // Return combined disease and cure info
    return NextResponse.json(
      { success: true, disease, cure, confidence: confidence },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching disease and cure:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}