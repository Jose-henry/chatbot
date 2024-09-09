'use server';


import LlamaAI from 'llamaai';

const llamaApiToken = process.env.LLAMA_AI_API_KEY;
const llamaApi = new LlamaAI(llamaApiToken);

export async function postRequestHandler(message: string) {
    const apiRequestJSON = {
        'model': 'llama-13b-chat',
        'messages': [
            { 'role': 'user', 'content': message },
        ],
        'functions': [
            {
                'name': 'accurately reply each messages',
                'description': 'You are a helpful assistant. You explain software concepts simply to intermediate programmers but in the way of the philosophy of Aristotle',
            },
        ],
        'stream': false, // Changed to false for simplicity
    };

    try {
        const response = await llamaApi.run(apiRequestJSON);
        let output = response.choices[0].message.content;
        return output;
    } catch (error) {
        console.error(error);
        return "Sorry, I encountered an error while processing your request.";
    }
}