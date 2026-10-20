import { ArrowRight } from "lucide-react";
import { serviceGroups } from "@/content/capabilities";
import { IconTile, serviceIcons } from "./icons";

export function ServiceGroups({ showBring = false }: { showBring?: boolean }) {
  return (
    <div className="service-group-grid" data-service-group-count={serviceGroups.length}>
      {serviceGroups.map((service, index) => (
        <article className="service-group-card" key={service.id}>
          <div className="service-group-topline">
            <IconTile icon={serviceIcons[service.id]} tone="dogoodie" />
            <span className="service-marker">{service.marker}</span>
            <span className="service-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3>{service.title}</h3>
          <div className="service-flow" aria-hidden="true">
            <span>{service.flow[0]}</span>
            <ArrowRight className="service-flow-arrow" strokeWidth={2} />
            <strong>{service.flow[1]}</strong>
          </div>
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
