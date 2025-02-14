
import { initializeAgent} from "./agent"
import { HumanMessage } from '@langchain/core/messages';

const messages: HumanMessage[] = [];

const MAX_HISTORY = 2;

export async function checkBalance(userMessage: string): Promise<string> {
  let agentText = "";

  try {
    const { langAgent } = await initializeAgent(); 

    // Maintain chat history within limits
    if (messages.length >= MAX_HISTORY) {
      messages.shift();
    }
    messages.push(new HumanMessage(userMessage));

    const config = { configurable: { thread_id: "Solana Agent Kit!" } };

    const stream = await langAgent.stream({ messages }, config);

    for await (const chunk of stream) {
      if ('agent' in chunk) {
        const message = chunk.agent.messages[0].content.trim();
        console.log(message);

        if (message.includes("Your wallet balance is")) {
          agentText = message;
        }
      }
    }
    
  } catch (error) {
    console.error(" Error in runChat:", error);
  }

  return agentText;
}






