import { useState } from "react";
import { usePortfolioData } from "../context/PortfolioDataContext";

interface SayHiModalProps {
  buttonClassName?: string;
  label?: string;
}

export default function SayHiModal({
  buttonClassName = "tag-bar tag-bar-outline text-base px-4 py-2",
  label = "write me →",
}: SayHiModalProps) {
  const { site } = usePortfolioData();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name || "your portfolio"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ""}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className={buttonClassName}>
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6"
          onClick={() => setOpen(false)}
        >
          <form onSubmit={handleSend} onClick={(e) => e.stopPropagation()} className="panel w-full max-w-md p-6 relative">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 font-display text-2xl leading-none"
            >
              ×
            </button>
            <span className="panel-label mb-4 inline-block">say hi</span>
            <h3 className="font-display text-3xl mb-4">Write Me</h3>

            <label className="block text-xs uppercase tracking-widest mb-1">Your name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              className="w-full border-2 border-stroke bg-bg px-3 py-2 mb-6 font-body text-sm resize-none"
              placeholder="Let's talk about..."
            />

            <button type="submit" className="tag-bar bg-[#111] w-full py-3 text-sm">
              send via email →
            </button>
          </form>
        </div>
      )}
    </>
  );
}
