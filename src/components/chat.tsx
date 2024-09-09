'use client'

import { useState } from 'react'
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

 /*  const [messagess, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
    }

    setMessages((prevMessages) => [...prevMessages, newMessage])
    setInputMessage('')

    // Here you would typically call your backend API
    // For now, we'll just simulate a bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now(),
        text: "I'm a bot response. You can implement your own backend logic here.",
        sender: 'bot',
      }
      setMessages((prevMessages) => [...prevMessages, botResponse])
    }, 1000)
  }
 */
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
}