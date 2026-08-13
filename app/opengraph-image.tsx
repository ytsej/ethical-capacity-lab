import { ImageResponse } from "next/og";

export const alt = "The Ethical Capacity Lab — build the capacity behind meaningful work";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f6f1e7",
          color: "#2a2823",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#fffdf8",
            border: "2px solid #c9c2b0",
            borderRadius: 24,
            display: "flex",
            flexDirection: "column",
            height: 510,
            justifyContent: "center",
            padding: "50px",
            position: "relative",
            width: 1080,
          }}
        >
          <div style={{ alignItems: "center", background: "#2a2823", borderRadius: 8, color: "#fffdf8", display: "flex", fontSize: 34, fontWeight: 700, height: 88, justifyContent: "center", width: 120 }}>ECL</div>
          <div style={{ color: "#a9762f", display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: 3, marginTop: 48 }}>THE ETHICAL CAPACITY LAB</div>
          <div style={{ display: "flex", fontFamily: "Georgia, serif", fontSize: 58, fontWeight: 600, lineHeight: 1.2, marginTop: 36, maxWidth: 930 }}>Build the capacity behind meaningful work.</div>
          <div style={{ bottom: 55, display: "flex", height: 8, left: 50, position: "absolute", width: 930 }}>
            <div style={{ background: "#a9762f", display: "flex", flex: 1 }} />
            <div style={{ background: "#33506b", display: "flex", flex: 1 }} />
            <div style={{ background: "#4b5d3e", display: "flex", flex: 1 }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
