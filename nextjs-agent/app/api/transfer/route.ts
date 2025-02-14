import { executeTransfers } from "@/app/helpers/transfer";
import { NextRequest, NextResponse } from "next/server";
import { initializeAgent } from "@/app/helpers/agent";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { recipient, amount } = body;

    if (!recipient || !amount) {
      return NextResponse.json({ error: "Recipient and amount are required" }, { status: 400 });
    }

    const { agent } = await initializeAgent();
    const signature = await executeTransfers(agent, recipient, amount);

    return NextResponse.json({ response: signature });
  } catch (error) {
    console.error("Error in /api/transfer:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
