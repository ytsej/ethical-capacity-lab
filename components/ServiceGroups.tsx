import { serviceGroups } from "@/content/capabilities";

export function ServiceGroups({ showBring = false }: { showBring?: boolean }) {
  return (
    <div className="service-group-grid" data-service-group-count={serviceGroups.length}>
      {serviceGroups.map((service, index) => (
        <article className="service-group-card" key={service.id}>
          <div className="service-group-topline">
            <span className="service-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span>{service.marker}</span>
          </div>
          <div className="service-flow" aria-hidden="true">
            <span>{service.flow[0]}</span>
            <span className="service-flow-arrow">→</span>
            <strong>{service.flow[1]}</strong>
          </div>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          {showBring && <p className="service-bring"><strong>Bring:</strong> {service.bring}</p>}
          <div className="service-outputs">
            <p>Possible outputs</p>
            <ul>
              {service.outputs.map((output) => <li key={output}>{output}</li>)}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
