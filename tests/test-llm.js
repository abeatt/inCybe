require('dotenv').config();
const { llm } = require('../index');

async function runTest() {
  console.log('🧪 Testing LLM Abstraction Layer...\n');

  const systemPrompt = "You are a concise technical assistant.";
  const userPrompt = "Explain what an abstraction layer is in one sentence.";

  console.log(`📤 Sending prompt to [${process.env.LLM_PROVIDER || 'ollama'}]...`);
  
  try {
    const start = Date.now();
    const response = await llm.complete(`${systemPrompt}\n\n${userPrompt}`, { model: process.env.OLLAMA_MODEL || 'mistral' });
    const duration = ((Date.now() - start) / 1000).toFixed(2);

    console.log(`\n✅ Response received in ${duration}s:`);
    console.log('---------------------------------------------------');
    console.log(response.trim());
    console.log('---------------------------------------------------');
  } catch (err) {
    console.error('\n❌ Test Failed:', err.message);
  }
}

runTest();