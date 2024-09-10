// src/lib/actions/LlamaActions.ts
'use server';

import LlamaAI from 'llamaai';

// Load the API key from environment variables
const llamaApiToken = process.env.LLAMA_API_KEY;

if (!llamaApiToken) {
    console.error('Llama API key is missing. Please set LLAMA_API_KEY in your environment.');
    throw new Error('Llama API key is missing. Server cannot process requests.');
}

// Initialize the LlamaAI instance using the API key from the environment
const llamaApi = new LlamaAI(llamaApiToken);

export async function postRequestHandler(message: string) {
    console.log('Sending request to Llama AI...');

    const apiRequestJSON = {
        'model': 'llama3.1-405b',
        'messages': [
            { 'role': 'user', 'content': message },
        ],
        'functions': [
            {
                'name': 'accurately reply each messages',
                'description': 'You are a helpful assistant. You explain software concepts simply to intermediate programmers but in the way of the philosophy of Aristotle',
            },
        ],
        'stream': false,
    };

    try {
        console.log('API Request:', JSON.stringify(apiRequestJSON));

        // Make the request to the Llama AI API
        const response = await llamaApi.run(apiRequestJSON);
        console.log('API Response:', response);

        // Extract the output message from the response
        const output = response.choices[0]?.message?.content || 'No valid response from the model.';
        return output;
    } catch (error: any) {
        console.error('Error details:', error);
        
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }

        // Return a generic error message to the client
        return "Sorry, I encountered an error while processing your request. Please try again later.";
    }
}
