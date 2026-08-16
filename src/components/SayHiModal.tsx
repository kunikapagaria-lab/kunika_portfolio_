import { useState } from "react";
import { usePortfolioData } from "../context/PortfolioDataContext";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

interface SayHiModalProps {
  buttonClassName?: string;
  label?: string;
}

type Status = "idle" | "sending" | "sent" | "error";

export default function SayHiModal({
  buttonClassName = "tag-bar tag-bar-outline text-base px-4 py-2",
  label = "write me →",
}: SayHiModalProps) {
  const { site } = usePortfolioData();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const close = () => {
    setOpen(false);
    setStatus("idle");
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      const subject = encodeURIComponent(`Message from ${name || "your portfolio"}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ""}`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New message from ${name}`,
          name,
          email,
          message,
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message || "Web3Forms request failed");

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Web3Forms send failed:", err);
      setStatus("error");
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className={buttonClassName}>
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6" onClick={close}>
          <form onSubmit={handleSend} onClick={(e) => e.stopPropagation()} className="panel w-full max-w-md p-6 relative">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-3 right-3 font-display text-2xl leading-none"
            >
              ×
            </button>
            <span className="panel-label mb-4 inline-block">say hi</span>
            <h3 className="font-display text-3xl mb-4">Write Me</h3>

            {status === "sent" ? (
              <p className="text-sm leading-relaxed">Sent — thanks for reaching out, I'll get back to you soon.</p>
            ) : (
              <>
                <label className="block text-xs uppercase tracking-widest mb-1">Your name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border-2 border-stroke bg-bg px-3 py-2 mb-4 font-body text-sm"
                  placeholder="Jane Doe"
                />

                <label className="block text-xs uppercase tracking-widest mb-1">Your email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-2 border-stroke bg-bg px-3 py-2 mb-4 font-body text-sm"
                  placeholder="jane@email.com"
                />

                <label className="block text-xs uppercase tracking-widest mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full border-2 border-stroke bg-bg px-3 py-2 mb-4 font-body text-sm resize-none"
                  placeholder="Let's talk about..."
                />

                {status === "error" && (
                  <p className="text-xs text-red-600 mb-4">Couldn't send that — please try again in a moment.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="tag-bar bg-[#111] w-full py-3 text-sm disabled:opacity-50"
                >
                  {status === "sending" ? "sending…" : "send →"}
                </button>
              </>
            )}
          </form>
        </div>
      )}
    </>
  );
}
