
// import { initializeAgent } from './agent.ts';
// import { SolanaAgentKit } from "solana-agent-kit";
// import { PublicKey } from "@solana/web3.js";

// export async function executeTransfers(agent: SolanaAgentKit) {
//   const solTransfer = await agent.transfer(
//     new PublicKey("FfXMLdEAcit6ECxMCc4oiFBhkyb7uwoWYGHyED2F2vos"),
//     1.5  // 1.5 SOL
//   );
//   console.log("SOL transfer:", solTransfer);

// }

// (async () => {
//     const { agent } = await initializeAgent(); 
//     await executeTransfers(agent); 
//   })();










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


