'use client'


//without pdf upload
/* import { useState } from 'react'
import { useChat} from 'ai/react'



interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
}

export default function Chat() {

const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
  keepLastMessageOnError: true,
})

//  const [messagess, setMessages] = useState<Message[]>([])
//   const [inputMessage, setInputMessage] = useState('')

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!inputMessage.trim()) return

//     const newMessage: Message = {
//       id: Date.now(),
//       text: inputMessage,
//       sender: 'user',
//     }

//     setMessages((prevMessages) => [...prevMessages, newMessage])
//     setInputMessage('')

//     // Here you would typically call your backend API
//     // For now, we'll just simulate a bot response
//     setTimeout(() => {
//       const botResponse: Message = {
//         id: Date.now(),
//         text: "I'm a bot response. You can implement your own backend logic here.",
//         sender: 'bot',
//       }
//       setMessages((prevMessages) => [...prevMessages, botResponse])
//     }, 1000)
//   }

  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-xs mx-2 p-3 rounded-lg ${
              message.role === 'user'
                ? 'bg-teal-950 text-white ml-auto'
                : 'bg-gray-300 text-black'
            }`}
          >
          
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-black">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-950"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-teal-950 text-white px-4 py-2 rounded-lg hover:bg-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-950"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
} */





  //with pdf upload
  import { useState, useRef } from 'react'
  import { useChat } from 'ai/react'
  import { nanoid } from 'nanoid';
  import { v4 as uuidv4 } from 'uuid';

  
  export default function Chat() {
    const [pdfContent, setPdfContent] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
      api: '/api/chat',
      body: { pdfContent },
      initialMessages: pdfContent ? [
        { id: uuidv4(), role: 'system', content: 'PDF uploaded successfully. You can now ask questions about its content.' }
      ] : [],
    });
  
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.type === 'application/pdf') {
        const formData = new FormData();
        formData.append('pdf', file);
    
        try {
          const response = await fetch('/api/upload-pdf', {
            method: 'POST',
            body: formData,
          });
    
          if (response.ok) {
            const { text } = await response.json();
            setPdfContent(text);
            alert('PDF uploaded and processed successfully');
          } else {
            alert('Error uploading PDF');
          }
        } catch (error) {
          console.error('Error uploading PDF:', error);
          alert('Error uploading PDF');
        }
      }
    };
    return (
      <div className="flex flex-col h-screen bg-black">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-xs mx-2 p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-teal-950 text-white ml-auto'
                  : 'bg-gray-300 text-black'
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="p-4 bg-black">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="mb-4"
            title='Upload a pdf file'
          />
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-950"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="bg-teal-950 text-white px-4 py-2 rounded-lg hover:bg-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-950"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    )
  }