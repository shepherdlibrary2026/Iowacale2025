import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { MessageCircle, X, Send, Loader2, Bot, User, Minimize2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [starting, setStarting] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const bottomRef = useRef(null);
  const unsubscribeRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && !initialized) {
      initConversation();
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    return () => unsubscribeRef.current?.();
  }, []);

  const initConversation = async () => {
    setStarting(true);
    setInitialized(true);
    const conv = await base44.agents.createConversation({
      agent_name: "cabling_advisor",
      metadata: { name: "Website Chat" },
    });
    setConversation(conv);

    unsubscribeRef.current = base44.agents.subscribeToConversation(conv.id, (data) => {
      setMessages(data.messages || []);
    });

    await base44.agents.addMessage(conv, {
      role: "user",
      content: "__widget_init__",
    });

    setStarting(false);
  };

  const sendMessage = async (text) => {
    if (!text.trim() || sending || !conversation) return;
    setInput("");
    setSending(true);
    await base44.agents.addMessage(conversation, { role: "user", content: text });
    setSending(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const visibleMessages = messages.filter((m) => {
    if (m.content === "__widget_init__") return false;
    return m.role === "user" || m.role === "assistant";
  });

  const isThinking = messages.length > 0 &&
    messages[messages.length - 1]?.role === "user" &&
    messages[messages.length - 1]?.content !== "__widget_init__";

  const QUICK_QUESTIONS = [
    "What services do you offer?",
    "How much does cabling cost?",
    "How long does installation take?",
    "Do you serve my area?",
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Chat Window */}
      <div
        className={`fixed z-50 bg-card border border-border shadow-2xl flex flex-col transition-all duration-300 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }
        bottom-0 right-0 left-0 rounded-t-2xl sm:bottom-24 sm:right-5 sm:left-auto sm:rounded-2xl sm:w-[360px]`}
        style={{ height: "75dvh", maxHeight: "520px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-secondary rounded-t-2xl shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-white font-heading font-semibold text-sm leading-tight">Iowa Cabling Assistant</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span className="text-white/60 text-xs">Online · Replies instantly</span>
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {starting ? (
            <div className="flex items-center justify-center h-full gap-2 text-muted-foreground text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Connecting...</span>
            </div>
          ) : (
            <>
              {visibleMessages.length === 0 && !starting && (
                <div className="space-y-3 pt-2">
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-secondary-foreground" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-2.5 text-sm max-w-[85%]">
                      <p>👋 Hi! I'm Iowa Cabling Solution's AI assistant. I can answer questions about our services, pricing, timelines, and more.</p>
                      <p className="mt-2">What can I help you with?</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pl-9">
                    {QUICK_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-xs px-2.5 py-1.5 rounded-full border border-border bg-background hover:border-primary/40 hover:bg-primary/5 transition-colors text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {visibleMessages.map((msg, i) => {
                const isUser = msg.role === "user";
                return (
                  <div key={i} className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
                    {!isUser && (
                      <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-secondary-foreground" />
                      </div>
                    )}
                    <div className={`max-w-[85%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed ${
                      isUser
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-muted text-foreground rounded-tl-sm"
                    }`}>
                      {isUser ? (
                        <p>{msg.content}</p>
                      ) : (
                        <ReactMarkdown
                          className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                          components={{
                            p: ({ children }) => <p className="my-1">{children}</p>,
                            ul: ({ children }) => <ul className="my-1 ml-3 list-disc space-y-0.5">{children}</ul>,
                            li: ({ children }) => <li className="text-sm">{children}</li>,
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                            a: ({ children, href }) => <a href={href} className="text-primary underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      )}
                    </div>
                    {isUser && (
                      <div className="w-7 h-7 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isThinking && (
                <div className="flex gap-2 justify-start">
                  <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-secondary-foreground" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-3">
                    <div className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div className="shrink-0 px-3 py-3 border-t border-border">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              disabled={starting || sending}
              className="flex-1 h-9 rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || sending || starting}
              className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-1.5">Iowa Structure Cabling Solution LLC</p>
        </div>
      </div>

      {/* FAB Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 sm:w-14 sm:h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center"
        aria-label="Open chat"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
          </>
        )}
      </button>
    </>
  );
}