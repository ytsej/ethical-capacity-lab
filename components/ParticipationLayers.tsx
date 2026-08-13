import { participationLayers } from "@/content/liberation";

export function ParticipationLayers() {
  return <ol className="layer-list">{participationLayers.map((layer, index) => <li key={layer.title}><span>{index + 1}</span><div><h3>{layer.title}</h3><p>{layer.text}</p></div></li>)}</ol>;
}
