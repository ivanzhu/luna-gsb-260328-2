'use client'

import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { useChatStore } from '@/store/chatStore'
import { Sparkles } from 'lucide-react'

export function ChatContainer() {
  const currentConversation = useChatStore(state => 
    state.conversations.find(c => c.id === state.currentConversationId)
  )
  const addMessage = useChatStore(state => state.addMessage)
  const setLoading = useChatStore(state => state.setLoading)
  const isLoading = useChatStore(state => state.isLoading)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentConversation?.messages])

  const hasMessages = currentConversation?.messages && currentConversation.messages.length > 0

  const handleExampleMessage = async (message: string) => {
    if (isLoading) return
    
    addMessage('user', message)
    setLoading(true)

    setTimeout(() => {
      const responses = [
        "这是一个演示回复。在实际应用中，这里会连接到真实的AI服务。",
        "感谢你的消息！这是一个模拟的AI回复，用于展示界面效果。",
        "我收到了你的问题。在生产环境中，这里会有真实的AI响应。",
        "这是一个ChatGPT风格的演示应用。所有功能都已就绪。"
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      addMessage('assistant', randomResponse)
      setLoading(false)
    }, 1000 + Math.random() * 1000)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {!hasMessages ? (
          <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">ChatGPT</h1>
            <p className="text-text-muted text-center max-w-md mb-8">
              这是一个基于 Next.js 15、TypeScript、Tailwind CSS、Zustand 和 Lucide React 构建的 ChatGPT 风格演示应用。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full px-4">
              {[
                "如何开始使用这个应用？",
                "这个应用有哪些功能？",
                "告诉我关于 Next.js 15 的新特性",
                "帮我写一个简单的 React 组件"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleExampleMessage(suggestion)
                  }}
                  className="p-4 bg-bg-secondary rounded-xl hover:bg-bg-hover transition-colors text-left"
                >
                  <p className="text-sm text-text-secondary">{suggestion}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {currentConversation?.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-border-color">
        <ChatInput />
        <p className="text-xs text-text-muted text-center mt-2">
          这是一个演示版本，AI 回复是模拟的。
        </p>
      </div>
    </div>
  )
}
