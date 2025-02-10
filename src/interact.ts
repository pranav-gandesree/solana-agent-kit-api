import { initializeAgent } from './agent';
import { HumanMessage } from '@langchain/core/messages';

const messages: HumanMessage[] = [];

const MAX_HISTORY = 2;

async function runChat() {
  const agent = await initializeAgent();

  console.log('in the runchat');

  if (messages.length >= MAX_HISTORY) {
    messages.shift();
  }

  messages.push(new HumanMessage("check my wallet balance"));

  const config = { configurable: { thread_id: "Solana Agent Kit!" } };

  const stream = await agent.stream({ messages }, config);

  // const signature = await agent.transfer(
  //   new PublicKey("recipient-address"),
  //   1.5  // amount in SOL
  // );
  

  // Handle the response
  for await (const chunk of stream) {
    if ('agent' in chunk) {
      console.log(chunk.agent.messages[0].content);
    } else if ('tools' in chunk) {
      console.log(chunk.tools.messages[0].content);
    }
    console.log('-------------------');
  }
}

runChat().catch(console.error);