import type { Metadata } from "next";
import { accessCode, safeNext } from "@/lib/access";
import "./unlock.css";

export const metadata: Metadata = {
  title: "Termite Expert Reference Guide",
  robots: { index: false, follow: false },
};

const MESSAGES: Record<string, string> = {
  wrong: "That code isn't right. Check it with whoever sent you this link.",
  wait: "Too many tries. Wait a few minutes and try again.",
  setup: "This site's access code hasn't been set up yet. Ask the site owner to add it.",
};

export default async function UnlockPage({ searchParams }: PageProps<"/unlock">) {
  const params = await searchParams;
  const next = safeNext(params.next);
  const errorKey = typeof params.error === "string" ? params.error : "";
  const error = !accessCode() ? MESSAGES.setup : MESSAGES[errorKey];

  return (
    <main className="unlock">
      <form className="card" method="post" action="/api/unlock">
        <span className="eyebrow">Termite inspection · field reference</span>
        <h1>Termite Expert Reference Guide</h1>
        <p className="lede">This reference is private. Enter the access code you were given.</p>
        <label htmlFor="code">Access code</label>
        <input
          id="code"
          name="code"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
        />
        <input type="hidden" name="next" value={next} />
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <button type="submit">Open the guide</button>
      </form>
    </main>
  );
}
