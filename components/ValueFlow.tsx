import { valueFlow } from "@/content/ecosystem";

export function ValueFlow() {
  return (
    <figure className="value-flow" aria-labelledby="value-flow-title">
      <figcaption id="value-flow-title" className="sr-only">Possible ecosystem value flow</figcaption>
      <ol>{valueFlow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol>
      <p className="flow-boundary">This is a possible ecosystem value flow—not a guaranteed funnel, employment path, membership ladder, or promise of financial, professional, emotional, or material benefit.</p>
    </figure>
  );
}
