import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cable, Send, Loader2, Bot, User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function QuoteAssistant() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [starting, setStarting] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    initConversation();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const initConversation = async () => {
    setStarting(true);
    const conv = await base44.agents.createConversation({
      agent_name: "quote_assistant",
      metadata: { name: "Quote Request" },
    });
    setConversation(conv);

    const unsubscribe = base44.agents.subscribeToConversation(conv.id, (data) => {
      setMessages(data.messages || []);
    });

    // Send initial greeting trigger
    await base44.agents.addMessage(conv, {
      role: "user",
      content: "Hello, I'd like to get a quote for a cabling project.",
    });

    setStarting(false);
    return () => unsubscribe();
  };

  useEffect(() => {
    if (!conversation) return;
    const unsubscribe = base44.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages || []);
    });
    return () => unsubscribe();
  }, [conversation]);

  const handleSend = async () => {
    if (!input.trim() || sending || !conversation) return;
    const text = input.trim();
    setInput("");
    setSending(true);
    await base44.agents.addMessage(conversation, { role: "user", content: text });
    setSending(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const visibleMessages = messages.filter(
    (m) => m.role === "user" || m.role === "assistant"
  );

  const isThinking = messages.length > 0 && messages[messages.length - 1]?.role === "user";

  return (
    <div className="min-h-screen bg-muted/30 pt-20 pb-0 flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 sm:px-6 py-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <Cable className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-bold text-base">Quote Assistant</h1>
              <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                <Sparkles className="w-3 h-3" /> AI
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Iowa Structure Cabling Solution LLC · Responds instantly</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-4">
          {starting ? (
            <div className="flex items-center justify-center py-20 gap-2 text-muted-foreground text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Starting conversation...
            </div>
          ) : (
            <>
              {visibleMessages.map((msg, i) => {
                const isUser = msg.role === "user";
                // Skip the initial trigger message
                if (isUser && i === 0 && msg.content === "Hello, I'd like to get a quote for a cabling project.") return null;
                return (
                  <div key={i} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
                    {!isUser && (
                      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-foreground"
                    }`}>
                      {isUser ? (
                        <p>{msg.content}</p>
                      ) : (
                        <ReactMarkdown
                          className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                          components={{
                            p: ({ children }) => <p className="my-1">{children}</p>,
                            ul: ({ children }) => <ul className="my-1 ml-4 list-disc">{children}</ul>,
                            li: ({ children }) => <li className="my-0.5">{children}</li>,
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      )}
                    </div>
                    {isUser && (
                      <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isThinking && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl px-4 py-3">
                    <div className="flex gap-1 items-center h-4">
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
      </div>

      {/* Input */}
      <div className="bg-card border-t border-border px-4 sm:px-6 py-4 sticky bottom-0">
        <div className="max-w-3xl mx-auto flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={starting || sending}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || sending || starting}
            size="icon"
            className="shrink-0"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Our team reviews all quote requests and responds within 24 hours · <a href="tel:+15152009559" className="text-primary">(515) 200-9559</a>
        </p>
      </div>
    </div>
  );
}