"use client";

import Link from "next/link";
import {
  FormEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterPrompts = [
  "Which freight service should I use?",
  "Tell me about UK–EU road freight.",
  "How do I request a quote?",
];

export default function MinazAiAssistant() {
  const pathname = usePathname();

  const [open, setOpen] =
    useState(false);

  const [hintVisible, setHintVisible] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState<ChatMessage[]>([
      {
        role: "assistant",
        content:
          "Hello — I’m the MINAZ assistant. I can help with our freight services, website, MINAZ Intelligence and how to request a quote.",
      },
    ]);

  const [input, setInput] =
    useState("");

  const scrollRef =
    useRef<HTMLDivElement | null>(null);

  const canSend =
    input.trim().length > 0 &&
    !loading;

  const payloadMessages =
    useMemo(
      () =>
        messages
          .slice(-8),
      [messages],
    );

  if (pathname.startsWith("/admin")) {
    return null;
  }

  function scrollToBottom() {
    window.setTimeout(() => {
      scrollRef.current?.scrollTo({
        top:
          scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 30);
  }

  async function sendMessage(
    text: string,
  ) {
    const cleaned =
      text.trim();

    if (
      !cleaned ||
      loading
    ) {
      return;
    }

    const nextUserMessage:
      ChatMessage = {
      role: "user",
      content:
        cleaned.slice(0, 1200),
    };

    setMessages(
      (current) => [
        ...current,
        nextUserMessage,
      ],
    );

    setInput("");
    setLoading(true);
    scrollToBottom();

    try {
      const response =
        await fetch(
          "/api/ai",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                message:
                  nextUserMessage.content,

                history:
                  payloadMessages,
              }),
          },
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.ok
      ) {
        throw new Error(
          data.error ||
            "Unable to answer right now.",
        );
      }

      setMessages(
        (current) => [
          ...current,
          {
            role: "assistant",
            content:
              typeof data.answer ===
              "string"
                ? data.answer
                : "Please contact the MINAZ team for help with this request.",
          },
        ],
      );
    } catch {
      setMessages(
        (current) => [
          ...current,
          {
            role: "assistant",
            content:
              "I’m unable to answer right now. You can still send us a freight request or contact the MINAZ team directly.",
          },
        ],
      );
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    await sendMessage(input);
  }

  return (
    <>
      {!open && (
        <div className="minaz-ai-launch-wrap">
          {hintVisible && (
            <div className="minaz-ai-hint">
              <button
                type="button"
                aria-label="Close assistant hint"
                onClick={() =>
                  setHintVisible(false)
                }
              >
                ×
              </button>

              <strong>
                Need help with MINAZ?
              </strong>

              <span>
                Ask about freight, services,
                routes or our website.
              </span>
            </div>
          )}

          <button
            type="button"
            className="minaz-ai-launcher"
            onClick={() => {
              setOpen(true);
              setHintVisible(false);
            }}
            aria-label="Open MINAZ AI assistant"
          >
            <span aria-hidden="true">
              ✦
            </span>
          </button>
        </div>
      )}

      {open && (
        <section
          className="minaz-ai-panel"
          aria-label="MINAZ AI assistant"
        >
          <header className="minaz-ai-panel-head">
            <div className="minaz-ai-brand">
              <span>✦</span>

              <div>
                <strong>
                  MINAZ AI
                </strong>

                <small>
                  FREIGHT & LOGISTICS ASSISTANT
                </small>
              </div>
            </div>

            <button
              type="button"
              className="minaz-ai-close"
              onClick={() =>
                setOpen(false)
              }
              aria-label="Close MINAZ AI assistant"
            >
              ×
            </button>
          </header>

          <div
            className="minaz-ai-messages"
            ref={scrollRef}
          >
            {messages.map(
              (message, index) => (
                <div
                  className={`minaz-ai-message minaz-ai-message-${message.role}`}
                  key={`${message.role}-${index}`}
                >
                  <span>
                    {message.role ===
                    "assistant"
                      ? "MINAZ"
                      : "YOU"}
                  </span>

                  <p>
                    {message.content}
                  </p>
                </div>
              ),
            )}

            {loading && (
              <div className="minaz-ai-message minaz-ai-message-assistant">
                <span>MINAZ</span>

                <p className="minaz-ai-typing">
                  Thinking
                  <i>.</i>
                  <i>.</i>
                  <i>.</i>
                </p>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="minaz-ai-starters">
              {starterPrompts.map(
                (prompt) => (
                  <button
                    type="button"
                    key={prompt}
                    onClick={() =>
                      sendMessage(
                        prompt,
                      )
                    }
                  >
                    {prompt}
                    <span>→</span>
                  </button>
                ),
              )}
            </div>
          )}

          <form
            className="minaz-ai-form"
            onSubmit={
              handleSubmit
            }
          >
            <label
              htmlFor="minaz-ai-input"
            >
              ASK MINAZ
            </label>

            <div>
              <textarea
                id="minaz-ai-input"
                value={input}
                onChange={(event) =>
                  setInput(
                    event.target.value,
                  )
                }
                maxLength={1200}
                rows={2}
                placeholder="Ask about freight, services or MINAZ..."
              />

              <button
                type="submit"
                disabled={!canSend}
                aria-label="Send message"
              >
                →
              </button>
            </div>
          </form>

          <footer className="minaz-ai-panel-foot">
            <span>
              AI responses may contain errors.
            </span>

            <Link href="/quote">
              REQUEST A QUOTE ↗
            </Link>
          </footer>
        </section>
      )}
    </>
  );
}
