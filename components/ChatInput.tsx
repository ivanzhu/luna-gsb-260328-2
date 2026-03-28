'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { useChatStore } from '@/store/chatStore'
import { cn } from '@/lib/utils'

export function ChatInput() {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { addMessage, setLoading, isLoading } = useChatStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const message = input.trim()
    setInput('')
    
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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-end max-w-3xl mx-auto">
        <div className="relative flex-1 bg-bg-tertiary rounded-2xl border border-border-color focus-within:border-accent/50 transition-colors">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message ChatGPT..."
            className="w-full bg-transparent resize-none outline-none text-text-primary placeholder-text-muted px-4 py-3 pr-12 max-h-48 overflow-y-auto scrollbar-thin"
            rows={1}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={cn(
            "absolute right-2 bottom-2 p-2 rounded-lg transition-colors",
            input.trim() && !isLoading
              ? "bg-accent hover:bg-accent-hover text-white"
              : "bg-bg-hover text-text-muted cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>
    </form>
  )
}
