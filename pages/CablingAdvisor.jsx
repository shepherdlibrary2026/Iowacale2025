import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Network, Send, Loader2, Bot, User, Sparkles, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

const STARTER_PROMPTS = [
  "I'm building out a new office — where do I start?",
  "What's the difference between CAT6 and CAT6A?",
  "How many Wi-Fi access points do I need for my warehouse?",
  "Should I use fiber or copper for my backbone?",
];

export default function CablingAdvisor() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [starting, setStarting] = useState(true);
  const bottomRef = useRef(null);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    initConversation();
    return () => unsubscribeRef.current?.();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const initConversation = async () => {
    setStarting(true);
    const conv = await base44.agents.createConversation({
      agent_name: "cabling_advisor",
      metadata: { name: "Cabling Planning Session" },
    });
    setConversation(conv);

    unsubscribeRef.current = base44.agents.subscribeToConversation(conv.id, (data) => {
      setMessages(data.messages || []);
    });

    // Trigger greeting
    await base44.agents.addMessage(conv, {
      role: "user",
      content: "__init__",
    });

    setStarting(false);
  };

  const sendMessage = async (text) => {
    if (!text.trim() || sending || !conversation) return;
    setInput("");
    setSending(true);
    await base44.agents.addMessage(conversation, { role: "user", content: text });
    setSending(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const visibleMessages = messages.filter((m) => {
    if (m.role === "user" && m.content === "__init__") return false;
    return m.role === "user" || m.role === "assistant";
  });

  const isThinking = messages.length > 0 && messages[messages.length - 1]?.role === "user" && messages[messages.length - 1]?.content !== "__init__";
  const hasStarted = visibleMessages.length > 0;

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col pt-20">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 sm:px-6 py-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
              <Network className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-bold text-base">Cabling Advisor</h1>
                <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                  <Sparkles className="w-3 h-3" /> AI
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Infrastructure planning & product guidance</p>
            </div>
          </div>
          <Link to="/quote" className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
            Get a Quote <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-4">
          {starting ? (
            <div className="flex items-center justify-center py-20 gap-2 text-muted-foreground text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading advisor...
            </div>
          ) : (
            <>
              {/* Starter prompts shown before conversation begins */}
              {!hasStarted && !starting && (
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-secondary mx-auto flex items-center justify-center">
                    <Network className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-lg mb-1">Cabling Infrastructure Advisor</h2>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      Get expert guidance on planning your commercial cabling infrastructure — from cable type selection to network closet design.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto text-left">
                    {STARTER_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="text-left text-sm px-4 py-3 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {visibleMessages.map((msg, i) => {
                const isUser = msg.role === "user";
                return (
                  <div key={i} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
                    {!isUser && (
                      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-4 h-4 text-secondary-foreground" />
                      </div>
                    )}
                    <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      isUser
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-card border border-border text-foreground"
                    }`}>
                      {isUser ? (
                        <p>{msg.content}</p>
                      ) : (
                        <ReactMarkdown
                          className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                          components={{
                            p: ({ children }) => <p className="my-1.5">{children}</p>,
                            ul: ({ children }) => <ul className="my-1.5 ml-4 list-disc space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="my-1.5 ml-4 list-decimal space-y-1">{children}</ol>,
                            li: ({ children }) => <li className="text-sm">{children}</li>,
                            strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                            h3: ({ children }) => <h3 className="font-heading font-semibold text-sm mt-3 mb-1">{children}</h3>,
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
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-secondary-foreground" />
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
            placeholder="Ask about cabling, infrastructure planning, products..."
            disabled={starting || sending}
            className="flex-1"
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || sending || starting}
            size="icon"
            className="shrink-0"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Expert guidance · Free consultation · <a href="tel:+15152009559" className="text-primary">(515) 200-9559</a>
        </p>
      </div>
    </div>
  );
}