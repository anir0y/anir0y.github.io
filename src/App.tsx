import { lazy, Suspense, useEffect, useState } from "react";
import Background from "./components/Background";
import Footer from "./components/Footer";
import { Boot, Nav, ScrollProgress, TelemetryStream, CommandPalette } from "./components/Chrome";
import { Hero, About, Arsenal, Services, Training, Research, Projects, Contact, ThreadsDivider } from "./components/Sections";
import { registerWebMcpTools } from "./lib/webmcp";

// Standalone product showcase at /pentestreport — code-split so it never weighs
// down the portfolio bundle. Path is fixed at load (full-page nav, no client router).
const PentestReport = lazy(() => import("./components/PentestReport"));
const IS_PENTESTREPORT =
  typeof window !== "undefined" && /^\/pentestreport\/?$/.test(window.location.pathname);

export default function App() {
  const [cmdk, setCmdk] = useState(false);

  useEffect(() => registerWebMcpTools(), []);

  // Global ⌘K / Ctrl+K (and "/" when not typing) opens the command palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setCmdk((o) => !o); }
      else if (e.key === "/" && !typing && !cmdk) { e.preventDefault(); setCmdk(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cmdk]);

  if (IS_PENTESTREPORT) {
    return (
      <Suspense fallback={null}>
        <PentestReport />
      </Suspense>
    );
  }

  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <Background />
      <div className="fx grain" />
      <div className="fx scanlines" />
      <div className="fx vignette" />
      <TelemetryStream />
      <Boot />
      <ScrollProgress />
      <Nav onCmdk={() => setCmdk(true)} />
      <CommandPalette open={cmdk} onClose={() => setCmdk(false)} />

      <main className="content">
        <Hero />
        <About />
        <Arsenal />
        <Services />
        <ThreadsDivider />
        <Training />
        <ThreadsDivider />
        <Research />
        <ThreadsDivider />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
