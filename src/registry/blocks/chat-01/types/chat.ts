// =============================================================================
// Chat Types
// =============================================================================

export type MessageStatus = "sending" | "sent" | "delivered" | "read" | "failed";

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  status?: "online" | "offline" | "away" | "busy";
  lastSeen?: string;
}

export interface ChatAttachment {
  id: string;
  type: "image" | "file" | "audio";
  name: string;
  url: string;
  size?: number;
  mimeType?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: ChatUser;
  timestamp: string;
  status: MessageStatus;
  attachments?: ChatAttachment[];
  replyTo?: {
    id: string;
    content: string;
    sender: string;
  };
  reactions?: {
    emoji: string;
    users: string[];
  }[];
  isEdited?: boolean;
}

export interface ChatConversation {
  id: string;
  type: "direct" | "group";
  name?: string;
  avatar?: string;
  participants: ChatUser[];
  lastMessage?: ChatMessage;
  unreadCount?: number;
  isPinned?: boolean;
  isMuted?: boolean;
}

export interface ChatProps {
  conversation?: ChatConversation;
  messages?: ChatMessage[];
  currentUser?: ChatUser;
  onSendMessage?: (content: string, attachments?: File[]) => Promise<void>;
  onTyping?: () => void;
  onMessageReaction?: (messageId: string, emoji: string) => void;
  isLoading?: boolean;
  className?: string;
}

export interface MessageBubbleProps {
  message: ChatMessage;
  isOwn: boolean;
  showAvatar?: boolean;
  onReaction?: (messageId: string, emoji: string) => void;
}

export interface ChatInputProps {
  onSend: (content: string, attachments?: File[]) => void;
  onTyping?: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export interface ConversationHeaderProps {
  conversation: ChatConversation;
  currentUser?: ChatUser;
}
