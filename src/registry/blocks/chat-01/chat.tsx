"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MessageBubble, ChatInput, TypingIndicator } from "./components";
import type { ChatMessage, ChatUser, ChatProps } from "./types/chat";

// =============================================================================
// Demo Data
// =============================================================================

const currentUser: ChatUser = {
  id: "user_1",
  name: "You",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=you",
  status: "online",
};

const assistant: ChatUser = {
  id: "assistant",
  name: "Assistant",
  avatar: "",
  status: "online",
};

const demoMessages: ChatMessage[] = [
  {
    id: "msg_1",
    content: "Hello! How can I help you today?",
    sender: assistant,
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    status: "read",
  },
  {
    id: "msg_2",
    content: "I'm working on a React project and need help with state management. What are the best practices for managing complex state in a large application?",
    sender: currentUser,
    timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
    status: "read",
  },
  {
    id: "msg_3",
    content: `Great question! Here are some best practices for managing complex state in React applications:

**1. Choose the right tool for the job**
- **Local state (useState)**: For component-specific UI state
- **Context API**: For app-wide state that doesn't change frequently
- **State libraries (Redux, Zustand, Jotai)**: For complex, frequently changing state

**2. Normalize your state**
- Avoid deeply nested structures
- Use flat, normalized data with IDs as references
- This makes updates more predictable and efficient

**3. Separate server and client state**
- Use React Query or SWR for server state
- Keep UI state separate from data fetched from APIs

**4. Colocate state when possible**
- Keep state close to where it's used
- Lift state up only when necessary

Would you like me to elaborate on any of these points?`,
    sender: assistant,
    timestamp: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    status: "read",
  },
  {
    id: "msg_4",
    content: "Can you show me an example of using Zustand for global state?",
    sender: currentUser,
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    status: "read",
  },
  {
    id: "msg_5",
    content: `Here's a practical Zustand example:

\`\`\`typescript
import { create } from 'zustand'

interface UserStore {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))

// Usage in components
function Profile() {
  const { user, logout } = useUserStore()
  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
\`\`\`

Zustand is lightweight, has no boilerplate, and works great with TypeScript!`,
    sender: assistant,
    timestamp: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    status: "read",
  },
];

// =============================================================================
// Chat Component
// =============================================================================

export default function Chat({
  messages: externalMessages,
  currentUser: externalCurrentUser,
  onSendMessage,
  onTyping,
  isLoading,
  className,
}: ChatProps) {
  const [internalMessages, setInternalMessages] = useState<ChatMessage[]>(demoMessages);
  const [typingUsers, setTypingUsers] = useState<ChatUser[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use external data if provided
  const messages = externalMessages ?? internalMessages;
  const user = externalCurrentUser ?? currentUser;

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = async (content: string, attachments?: File[]) => {
    if (onSendMessage) {
      await onSendMessage(content, attachments);
    } else {
      // Demo: add message to internal state
      const newMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        content,
        sender: user,
        timestamp: new Date().toISOString(),
        status: "sending",
        attachments: attachments?.map((file, idx) => ({
          id: `att_${Date.now()}_${idx}`,
          type: file.type.startsWith("image/") ? "image" : "file",
          name: file.name,
          url: URL.createObjectURL(file),
          size: file.size,
          mimeType: file.type,
        })),
      };

      setInternalMessages((prev) => [...prev, newMessage]);

      // Simulate status updates
      setTimeout(() => {
        setInternalMessages((prev) =>
          prev.map((m) =>
            m.id === newMessage.id ? { ...m, status: "sent" } : m
          )
        );
      }, 500);

      setTimeout(() => {
        setInternalMessages((prev) =>
          prev.map((m) =>
            m.id === newMessage.id ? { ...m, status: "delivered" } : m
          )
        );
      }, 1000);

      // Simulate auto-reply
      setTimeout(() => {
        setTypingUsers([assistant]);
        setTimeout(() => {
          setTypingUsers([]);
          const replies = [
            "That's a great point! Let me help you with that.",
            "I understand. Here's what I would suggest...",
            "Interesting question! There are several approaches to consider.",
            "Good thinking! Let me elaborate on that.",
            "Absolutely! Here's how you can approach this problem.",
          ];
          const reply: ChatMessage = {
            id: `msg_reply_${Date.now()}`,
            content: replies[Math.floor(Math.random() * replies.length)],
            sender: assistant,
            timestamp: new Date().toISOString(),
            status: "read",
          };
          setInternalMessages((prev) => [...prev, reply]);
        }, 2000);
      }, 1500);
    }
  };

  return (
    <div className={cn("flex h-[700px] w-full bg-background border rounded-lg", className)}>
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Minimal */}
        <div className="flex items-center justify-center h-14 px-4 border-b">
          <h1 className="text-sm font-medium">New Chat</h1>
        </div>

        {/* Messages Area - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="min-h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={message.sender.id === user.id}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Typing indicator */}
        {typingUsers.length > 0 && (
          <div className="max-w-3xl mx-auto w-full px-4">
            <TypingIndicator users={typingUsers} />
          </div>
        )}

        {/* Input - Centered at bottom */}
        <div className="border-t bg-background">
          <div className="max-w-3xl mx-auto">
            <ChatInput
              onSend={handleSendMessage}
              onTyping={onTyping}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
