import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type ChatMessage = { role: "user" | "assistant"; content: string };

const FALLBACK_MESSAGE =
  "I couldn't reach the assistant right now. Try again in a moment, or reach us on WhatsApp (+254 758 445 536) or hello@rentsync.co.ke.";

// Floating chat widget mounted once in __root.tsx so it appears on every
// route. Answers RentSync questions via the /api/assistant/chat branch in
// src/server.ts — see src/lib/assistantKnowledge.ts for what it knows.
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hi! I'm the RentSync Assistant. Ask me anything about RentSync's features, plans, or vacant listings.",
        },
      ]);
    }
  }

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const response = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: nextMessages.slice(0, -1).slice(-6) }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Assistant request failed");
      setMessages((prev) => [...prev, { role: "assistant", content: body.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: FALLBACK_MESSAGE }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => handleOpenChange(true)}
          className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg transition hover:bg-brand-600"
          aria-label="Open RentSync Assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-sm">
          <SheetHeader className="border-b border-slate-100 px-4 py-3 text-left">
            <SheetTitle>RentSync Assistant</SheetTitle>
          </SheetHeader>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    "max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm " +
                    (m.role === "user" ? "bg-brand-500 text-white" : "bg-slate-100 text-slate-800")
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl bg-slate-100 px-3.5 py-2 text-sm text-slate-400">
                  Thinking…
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-slate-100 p-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about RentSync..."
              disabled={sending}
            />
            <Button
              type="submit"
              disabled={sending || !input.trim()}
              className="shrink-0 bg-brand-500 hover:bg-brand-600"
              size="icon"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
