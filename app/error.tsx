"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(`[page-error] ${error.digest || error.name}`); }, [error]);
  return <section className="section"><div className="container narrow"><p className="eyebrow">Recoverable error</p><h1>This page could not be shown.</h1><p className="lede">No form submission should be assumed received because of this error. You can try again or return to the public front door.</p><div className="button-row"><button className="button" type="button" onClick={reset}>Try again</button><a className="button button-secondary" href="/start">Start Here</a></div></div></section>;
}
