import { SolanaAgentKit, createSolanaTools } from "solana-agent-kit";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";
import * as dotenv from "dotenv";

dotenv.config();

export async function initializeAgent() {
  const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  const agent = new SolanaAgentKit(
    process.env.SOLANA_PRIVATE_KEY!,
    process.env.RPC_URL!,
    {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
    }
  );

  const tools = createSolanaTools(agent);
  const memory = new MemorySaver();

  const langAgent = await createReactAgent({
    llm,
    tools,
    checkpointSaver: memory,
  });

  return { agent, langAgent }; 
}