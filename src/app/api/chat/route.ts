
//OpenAI API with vercel ai sdk
/* import { openai, createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';

export const maxDuration = 30;
export const runtime = 'edge'

// const openai = createOpenAI({
//     // custom settings, e.g.
//     compatibility: 'strict', // strict mode, enable when using the OpenAI API
//     apiKey: process.env.OPENAI_API_KEY,
//   });

export async function POST(request: Request) {
   const{messages}= await request.json();

   //createChatCompletion
   const response = await streamText({
       model: openai("gpt-3.5-turbo"),
       messages: convertToCoreMessages(messages),
       system: "You are a helpful assistant. You explain software concepts simply to intermediate programmers but in the way of the philosophy of Aristotle"
   })

   return response.toDataStreamResponse();
} */







//// Anthropic API with vercel ai sdk

// import Anthropic from '@anthropic-ai/sdk';
// import { streamText, convertToCoreMessages } from 'ai';
// import { anthropic } from '@ai-sdk/anthropic';

// //OR

// /* import { createAnthropic } from '@ai-sdk/anthropic';

// const anthropic = createAnthropic({
//   // custom settings
// }); */


// export const maxDuration = 30;
// export const runtime = 'edge'

// export async function POST(request: Request) {
//    const{messages}= await request.json();

//    //createChatCompletion
//    try {
//         const response = await streamText({
//             model: anthropic("claude-3-haiku-20240307"),
//             messages: convertToCoreMessages(messages),
//             system: "You are a helpful assistant. You explain software concepts simply to intermediate programmers but in the way of the philosophy of Aristotle"
//         })

//         return response.toDataStreamResponse();
//   } catch (error) {
//     console.error('Error creating chat completion:', error);
//     return new Response('Internal Server Error', { status: 500 });
//   }
// }





// META Llama API with vercel ai sdk

import { createOpenAI as createGroq } from '@ai-sdk/openai'
import { streamText, convertToCoreMessages } from 'ai';


const groq = createGroq({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
  });

export const maxDuration = 30;
export const runtime = 'edge'

export async function POST(request: Request) {
   const{messages}= await request.json();

   //createChatCompletion
   try {
        const response = await streamText({
            model: groq('llama-3.1-70b-versatile'),
            messages: convertToCoreMessages(messages),
            system: "You are a helpful assistant. You explain software concepts simply to intermediate programmers but in the way of the philosophy of Aristotle"
        })

        return response.toDataStreamResponse();
  } catch (error) {
    console.error('Error creating chat completion:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}