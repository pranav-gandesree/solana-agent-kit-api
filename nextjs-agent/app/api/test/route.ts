import { runChat } from "@/app/helpers/balance";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await req.json();
    const { message } = body;

    // console.log('Received request body:', body);

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    console.log('Processing message:', message);
    const response = await runChat(message);
    console.log('Response from checkBalance:', response);

    const responseTime = Date.now() - startTime; 

    const jsonResponse = NextResponse.json({ response });
    jsonResponse.headers.set("X-Response-Time", `${responseTime}ms`);


    return jsonResponse;
  } catch (error) {
    console.error("Error in /api/checkbalance:", error);
    const responseTime = Date.now() - startTime; 
    console.log(`Response time (error): ${responseTime}ms`);

    const errorResponse = NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    errorResponse.headers.set("X-Response-Time", `${responseTime}ms`);

    return errorResponse;
  }
}
