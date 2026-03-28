'use client'

import { useChatStore } from '@/store/chatStore'
import { Plus, MessageSquare, Trash2, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const { 
    conversations, 
    currentConversationId, 
    createConversation, 
    selectConversation, 
    deleteConversation,
    sidebarOpen,
    toggleSidebar
  } = useChatStore()

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={cn(
          "fixed top-4 left-4 z-50 p-2 rounded-lg hover:bg-bg-hover transition-colors lg:hidden",
          sidebarOpen && "hidden"
        )}
      >
        <Menu className="w-5 h-5 text-text-secondary" />
      </button>

      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-bg-secondary transform transition-transform duration-300 ease-in-out lg:relative lg:transform-none",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-3 border-b border-border-color">
            <button
              onClick={createConversation}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-bg-hover transition-colors flex-1"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">New Chat</span>
            </button>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-bg-hover transition-colors lg:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-1">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={cn(
                  "group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors",
                  currentConversationId === conv.id
                    ? "bg-bg-tertiary"
                    : "hover:bg-bg-hover"
                )}
                onClick={() => selectConversation(conv.id)}
              >
                <MessageSquare className="w-4 h-4 text-text-muted flex-shrink-0" />
                <span className="flex-1 truncate text-sm">{conv.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteConversation(conv.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-bg-tertiary transition-opacity"
                >
                  <Trash2 className="w-3 h-3 text-text-muted" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-border-color">
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <span className="text-sm font-medium">U</span>
              </div>
              <span className="text-sm">User</span>
            </div>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  )
}
