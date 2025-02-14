import { checkBalance } from "@/app/helpers/balance";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    console.log('Received request body:', body);

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    console.log('Processing message:', message);
    const response = await checkBalance(message);
    console.log('Response from checkBalance:', response);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in /api/checkbalance:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
