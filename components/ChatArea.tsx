import { useEffect, useRef, useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { useChatStore } from '@/store/chatStore'
import MessageBubble from './MessageBubble'

export default function ChatArea() {
  const {
    conversations,
    currentConversationId,
    inputText,
    setInputText,
    addMessage,
    isLoading,
    setIsLoading,
  } = useChatStore()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const currentConversation = conversations.find(
    (c) => c.id === currentConversationId
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentConversation?.messages])

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: inputText.trim(),
      timestamp: new Date(),
    }

    addMessage(userMessage)
    setInputText('')
    setIsLoading(true)

    // 模拟AI响应
    setTimeout(() => {
      const aiResponses = [
        '这是一个很好的问题！让我为你详细解答...',
        '我理解你遇到的问题。以下是我的建议：',
        '根据我的分析，这个问题可以从以下几个方面入手：',
        '感谢你的提问！这是我的回答：',
      ]
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: randomResponse + '\n\n这是一个模拟的AI回复，展示了与ChatGPT类似的交互体验。你可以继续提问，我会尽力帮助你！',
        timestamp: new Date(),
      }
      
      addMessage(aiMessage)
      setIsLoading(false)
    }, 1000 + Math.random() * 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // 自动调整textarea高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [inputText])

  if (!currentConversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">选择或创建一个对话开始聊天</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          {currentConversation.messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Send size={32} />
              </div>
              <h2 className="text-2xl font-semibold mb-2">开始对话</h2>
              <p className="text-gray-400">在下方输入你的问题，我会尽力帮助你！</p>
            </div>
          ) : (
            currentConversation.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start mb-4 animate-fadeIn">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Loader2 size={18} className="animate-spin" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-gray-700 rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-gray-700 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-end bg-gray-800 rounded-xl border border-gray-600 focus-within:border-blue-500 transition-colors">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入你的问题..."
              className="flex-1 bg-transparent px-4 py-3 resize-none focus:outline-none text-sm max-h-[200px]"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className={`p-2 m-2 rounded-lg transition-colors ${
                inputText.trim() && !isLoading
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-700 cursor-not-allowed'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            按 Enter 发送，Shift + Enter 换行
          </p>
        </div>
      </div>
    </div>
  )
}
