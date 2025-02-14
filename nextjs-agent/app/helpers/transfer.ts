
import { SolanaAgentKit } from "solana-agent-kit";
import { PublicKey } from "@solana/web3.js";

export async function executeTransfers(agent: SolanaAgentKit, recipient: string, amount: number) {
  try {
    const recipientPublicKey = new PublicKey(recipient);

    const solTransfer = await agent.transfer(recipientPublicKey, amount);
    console.log("SOL transfer successful:", solTransfer);

    return solTransfer; 
  } catch (error) {
    console.error(" error during SOL transfer:", error);
    throw error;
  }
}