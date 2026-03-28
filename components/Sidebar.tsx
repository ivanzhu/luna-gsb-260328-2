import { useChatStore } from '@/store/chatStore'
import { Plus, MessageSquare, Trash2, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const {
    conversations,
    currentConversationId,
    setCurrentConversationId,
    addConversation,
    deleteConversation,
    sidebarOpen,
    setSidebarOpen,
  } = useChatStore()

  const [hoveredConversation, setHoveredConversation] = useState<string | null>(null)

  const handleNewConversation = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: '新对话',
      messages: [],
      createdAt: new Date(),
    }
    addConversation(newConversation)
  }

  return (
    <>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors lg:hidden"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r border-gray-700 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-3">
            <button
              onClick={handleNewConversation}
              className="flex items-center w-full px-3 py-3 rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <Plus size={18} className="mr-2" />
              新对话
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`group relative flex items-center w-full px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm ${
                    conversation.id === currentConversationId
                      ? 'bg-gray-800'
                      : 'hover:bg-gray-800'
                  }`}
                  onClick={() => setCurrentConversationId(conversation.id)}
                  onMouseEnter={() => setHoveredConversation(conversation.id)}
                  onMouseLeave={() => setHoveredConversation(null)}
                >
                  <MessageSquare size={16} className="mr-3 flex-shrink-0" />
                  <span className="truncate flex-1">{conversation.title}</span>
                  {hoveredConversation === conversation.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteConversation(conversation.id)
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 border-t border-gray-700">
            <div className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors text-sm">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold mr-3">
                U
              </div>
              <span className="truncate">用户</span>
            </div>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  )
}
