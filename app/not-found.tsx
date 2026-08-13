import Link from "next/link";

export default function NotFound() {
  return <section className="section"><div className="container narrow"><p className="eyebrow">404 · Page not found</p><h1>This path does not exist.</h1><p className="lede">The link may have moved, or the route may never have been part of the public ecosystem.</p><div className="button-row"><Link className="button" href="/start">Start Here</Link><Link className="button button-secondary" href="/">Return home</Link></div></div></section>;
}
