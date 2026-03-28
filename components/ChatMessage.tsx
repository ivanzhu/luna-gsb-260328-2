'use client'

import { Message } from '@/store/chatStore'
import { User, Bot } from 'lucide-react'

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className="flex gap-4 py-6 px-4 hover:bg-bg-secondary/30 transition-colors group/message">
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-accent' : 'bg-bg-tertiary'}`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm mb-1">
          {isUser ? 'You' : 'ChatGPT'}
        </p>
        <div className="text-text-secondary whitespace-pre-wrap break-words">
          {message.content}
        </div>
      </div>
    </div>
  )
}
