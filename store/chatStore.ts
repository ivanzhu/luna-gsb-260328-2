import { create } from 'zustand'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
}

interface ChatState {
  conversations: Conversation[]
  currentConversationId: string | null
  inputText: string
  isLoading: boolean
  sidebarOpen: boolean
  currentMessage: string
  setCurrentMessage: (message: string) => void
  addConversation: (conversation: Conversation) => void
  setCurrentConversationId: (id: string | null) => void
  setInputText: (text: string) => void
  setIsLoading: (loading: boolean) => void
  setSidebarOpen: (open: boolean) => void
  addMessage: (message: Message) => void
  clearCurrentConversation: () => void
  deleteConversation: (id: string) => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [
    {
      id: '1',
      title: '新对话',
      messages: [
        {
          id: '1',
          role: 'assistant',
          content: '你好！我是AI助手，有什么可以帮助你的吗？',
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
    },
  ],
  currentConversationId: '1',
  inputText: '',
  isLoading: false,
  sidebarOpen: true,
  currentMessage: '',
  setCurrentMessage: (message) => set({ currentMessage: message }),
  addConversation: (conversation) =>
    set((state) => ({
      conversations: [...state.conversations, conversation],
      currentConversationId: conversation.id,
    })),
  setCurrentConversationId: (id) => set({ currentConversationId: id }),
  setInputText: (text) => set({ inputText: text }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  addMessage: (message) =>
    set((state) => {
      const currentConversation = state.conversations.find(
        (c) => c.id === state.currentConversationId
      )
      if (!currentConversation) return state

      const updatedConversations = state.conversations.map((c) =>
        c.id === state.currentConversationId
          ? { ...c, messages: [...c.messages, message] }
          : c
      )

      return { conversations: updatedConversations }
    }),
  clearCurrentConversation: () =>
    set((state) => {
      const updatedConversations = state.conversations.map((c) =>
        c.id === state.currentConversationId ? { ...c, messages: [] } : c
      )
      return { conversations: updatedConversations }
    }),
  deleteConversation: (id) =>
    set((state) => ({
      conversations: state.conversations.filter((c) => c.id !== id),
      currentConversationId:
        state.currentConversationId === id
          ? state.conversations.length > 1
            ? state.conversations.filter((c) => c.id !== id)[0]?.id
            : null
          : state.currentConversationId,
    })),
}))
