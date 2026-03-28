'use client'

import { Sidebar } from '@/components/Sidebar'
import { ChatContainer } from '@/components/ChatContainer'
import { useChatStore } from '@/store/chatStore'

export default function Home() {
  const { sidebarOpen } = useChatStore()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className={`flex-1 overflow-hidden transition-all duration-300 ${!sidebarOpen ? 'lg:ml-0' : ''}`}>
        <ChatContainer />
      </main>
    </div>
  )
}
