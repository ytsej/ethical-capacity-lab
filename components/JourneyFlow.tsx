export type JourneyStep = { title: string; text: string; kind?: "action" | "page" | "outcome" | "optional" };

export function JourneyFlow({ title, steps }: { title: string; steps: readonly JourneyStep[] }) {
  return (
    <figure className="journey-flow" aria-labelledby={`journey-${title.replaceAll(" ", "-").toLowerCase()}`}>
      <figcaption id={`journey-${title.replaceAll(" ", "-").toLowerCase()}`}>{title}</figcaption>
      <ol>{steps.map((step, index) => <li key={step.title} className={`journey-${step.kind || "page"}`}><span>{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
    </figure>
  );
}
