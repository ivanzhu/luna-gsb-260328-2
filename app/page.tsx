'use client'

import Sidebar from '@/components/Sidebar'
import ChatArea from '@/components/ChatArea'
import { useChatStore } from '@/store/chatStore'

export default function Home() {
  const { sidebarOpen } = useChatStore()

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64 lg:ml-0' : 'ml-0'}`}>
        <ChatArea />
      </main>
    </div>
  )
}
