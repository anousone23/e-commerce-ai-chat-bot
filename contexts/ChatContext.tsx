import { IMessage } from "@/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ChatContextType = {
  messages: IMessage[];
  setMessages: Dispatch<SetStateAction<IMessage[]>>;
};

const ChatContext = createContext<ChatContextType>({
  messages: [],
  setMessages: () => {},
});

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: Date.now().toString(),
      text: `สวัสดีลูกค้า
ลูกค้าอยากได้ไม้แบบไหน
- ไม้บุก
- ไม้รับ
- ทั้งบุกทั้งรับ

คุณลักษณะ
- ก้านแขง
- ก้านกลาง
- ก้านอ่อน 

ยี่ห้อ
- Yonex
- Victor
- Lining`,
      sender: "ai",
    },
  ]);

  return (
    <ChatContext.Provider value={{ messages, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) throw new Error("useChat must be used in ChatProvider");

  return context;
}
