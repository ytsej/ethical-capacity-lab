import QRCode from "qrcode";
import { siteUrl } from "@/content/site";

export async function QRCodeCard() {
  const target = siteUrl("/start");
  const source = await QRCode.toDataURL(target, { width: 232, margin: 2, color: { dark: "#2A2823", light: "#FFFDF8" }, errorCorrectionLevel: "M" });
  return (
    <aside className="qr-card">
      {/* A generated data URL keeps visitor data on this site. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={source} width="232" height="232" alt="QR code linking to the Start Here page" />
      <div><h2>Share the clear front door</h2><p>Print or share this code to route people directly to the audience-choice page.</p><a href={target}>{target}</a></div>
    </aside>
  );
}
