import { useState } from "react";

const DS = {
  colors: {
    primary: {
      forest: { 50: "#f2f5f0", 100: "#dbe3d5", 200: "#b8c9ab", 300: "#8faa78", 400: "#6b8c52", 500: "#4a6b35", 600: "#3a5529", 700: "#2c4120", 800: "#1e2d16", 900: "#111a0d" },
    },
    accent: {
      gold: { 50: "#faf6ed", 100: "#f0e4c3", 200: "#e5d199", 300: "#d9bc6b", 400: "#cda63d", 500: "#b8912e", 600: "#947424", 700: "#70571b", 800: "#4d3c12", 900: "#2a2009" },
    },
    warm: {
      cream: { 50: "#fefdfb", 100: "#faf7f0", 200: "#f5efe1", 300: "#ede3cc", 400: "#e2d4b1", 500: "#d4c296", 600: "#b8a472", 700: "#97834e", 800: "#70612f", 900: "#4a4018" },
    },
    wood: {
      walnut: { 50: "#f8f5f2", 100: "#ede6dd", 200: "#ddd0c0", 300: "#c9b49c", 400: "#b5977a", 500: "#9e7c5c", 600: "#7e6148", 700: "#604937", 800: "#443327", 900: "#2b2019" },
    },
    neutral: {
      stone: { 50: "#fafaf8", 100: "#f0eeea", 200: "#e3e0da", 300: "#d0ccc3", 400: "#b8b3a8", 500: "#9b9588", 600: "#7c766a", 700: "#5e594f", 800: "#403d36", 900: "#24221e" },
    },
    sky: {
      alpine: { 50: "#f0f6fa", 100: "#d6e7f2", 200: "#b0d1e8", 300: "#7eb5d9", 400: "#4e97c6", 500: "#3079a8", 600: "#255f85", 700: "#1b4663", 800: "#122f43", 900: "#0a1a25" },
    },
    semantic: {
      success: "#4a6b35",
      warning: "#b8912e",
      error: "#a63d3d",
      info: "#3079a8",
    },
  },
  fonts: {
    display: "'Playfair Display', Georgia, 'Times New Roman', serif",
    body: "'DM Sans', 'Helvetica Neue', Helvetica, sans-serif",
    accent: "'Cormorant Garamond', Georgia, serif",
  },
  spacing: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 160],
  radii: { none: 0, sm: 2, md: 4, lg: 8, xl: 12, "2xl": 16, pill: 999 },
};

const Swatch = ({ color, label, hex }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
    <div style={{ width: 48, height: 48, borderRadius: 6, background: hex, border: "1px solid rgba(0,0,0,0.08)" }} />
    <span style={{ fontSize: 10, color: "#6b6b60", fontFamily: DS.fonts.body }}>{label}</span>
    <span style={{ fontSize: 9, color: "#9b9588", fontFamily: "'DM Mono', monospace", letterSpacing: "0.02em" }}>{hex}</span>
  </div>
);

const ColorRow = ({ name, ramp }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ fontSize: 13, fontWeight: 600, fontFamily: DS.fonts.body, color: "#403d36", marginBottom: 8, textTransform: "capitalize" }}>{name}</div>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {Object.entries(ramp).map(([k, v]) => <Swatch key={k} label={k} hex={v} />)}
    </div>
  </div>
);

const TypeSample = ({ font, name, desc, size, weight, sample, style: extraStyle }) => (
  <div style={{ marginBottom: 20, borderLeft: `3px solid ${DS.colors.accent.gold[300]}`, paddingLeft: 16 }}>
    <div style={{ fontSize: 11, fontFamily: DS.fonts.body, color: DS.colors.accent.gold[600], fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>{name}</div>
    <div style={{ fontFamily: font, fontSize: size, fontWeight: weight, color: "#24221e", lineHeight: 1.3, marginBottom: 4, ...extraStyle }}>{sample}</div>
    <div style={{ fontSize: 11, fontFamily: DS.fonts.body, color: "#9b9588" }}>{desc}</div>
  </div>
);

const ComponentCard = ({ title, children }) => (
  <div style={{ background: "#fefdfb", border: "1px solid #e3e0da", borderRadius: 8, padding: "20px 24px", marginBottom: 16 }}>
    <div style={{ fontSize: 12, fontFamily: DS.fonts.body, color: DS.colors.accent.gold[600], fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>{title}</div>
    {children}
  </div>
);

const tabs = ["Übersicht", "Farben", "Typografie", "Komponenten", "Layout", "Patterns"];

export default function DesignSystem() {
  const [active, setActive] = useState(0);

  return (
    <div style={{ fontFamily: DS.fonts.body, color: "#24221e", maxWidth: 800, margin: "0 auto", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Mono:wght@400&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "linear-gradient(168deg, #1e2d16 0%, #2c4120 40%, #3a5529 100%)", padding: "48px 32px 40px", borderRadius: "0 0 12px 12px", marginBottom: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <svg width="28" height="28" viewBox="0 0 28 28"><path d="M14 2L17 10L26 10L19 15.5L21.5 24L14 18.5L6.5 24L9 15.5L2 10L11 10Z" fill="#cda63d" opacity="0.9"/></svg>
          <span style={{ fontFamily: DS.fonts.body, fontSize: 11, fontWeight: 600, color: "#b8c9ab", textTransform: "uppercase", letterSpacing: "0.2em" }}>Design System</span>
        </div>
        <h1 style={{ fontFamily: DS.fonts.display, fontSize: 36, fontWeight: 500, color: "#faf7f0", margin: "0 0 8px", lineHeight: 1.15, fontStyle: "italic" }}>Alpine Hospitality</h1>
        <p style={{ fontFamily: DS.fonts.body, fontSize: 14, color: "#b8c9ab", margin: 0, maxWidth: 500, lineHeight: 1.6 }}>
          Inspiriert von josalzburg.com & hotel-alpendorf.at — warme Naturtöne, alpine Eleganz, österreichische Gastlichkeit.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #e3e0da", background: "#faf7f0", padding: "0 16px", overflowX: "auto" }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActive(i)} style={{
            fontFamily: DS.fonts.body, fontSize: 13, fontWeight: active === i ? 600 : 400,
            color: active === i ? "#3a5529" : "#7c766a", background: "transparent", border: "none",
            padding: "14px 18px", cursor: "pointer", borderBottom: active === i ? "2px solid #4a6b35" : "2px solid transparent",
            transition: "all 0.2s", whiteSpace: "nowrap"
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "32px 24px" }}>

        {/* OVERVIEW */}
        {active === 0 && (
          <div>
            <h2 style={{ fontFamily: DS.fonts.display, fontSize: 26, fontWeight: 500, margin: "0 0 8px", color: "#1e2d16" }}>Design-Philosophie</h2>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "#5e594f", marginBottom: 32 }}>
              Dieses Design System verbindet die Natur-nahe Ästhetik der Salzburger Alpenwelt mit modernem, conversion-orientiertem Webdesign. Die zentrale Idee: Wärme und Vertrauen durch natürliche Materialien und Farben — Holz, Stein, Almwiese — gepaart mit der Klarheit und Präzision eines Premium-Hotelangebots.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
              {[
                { title: "Naturverbunden", desc: "Farbpalette aus Wald, Wiese, Holz & Stein", icon: "🌲" },
                { title: "Warm & Einladend", desc: "Cremige Hintergründe, goldene Akzente", icon: "✦" },
                { title: "Premium & Klar", desc: "Großzügiger Weißraum, elegante Typografie", icon: "◇" },
                { title: "Vertrauenswürdig", desc: "Strukturierte Layouts, konsistente Muster", icon: "◈" },
              ].map(p => (
                <div key={p.title} style={{ background: "#f5efe1", borderRadius: 8, padding: "20px 24px", border: "1px solid #e2d4b1" }}>
                  <div style={{ fontSize: 20, marginBottom: 8 }}>{p.icon}</div>
                  <div style={{ fontFamily: DS.fonts.display, fontSize: 16, fontWeight: 600, color: "#2c4120", marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontSize: 13, color: "#70612f", lineHeight: 1.5 }}>{p.desc}</div>
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: DS.fonts.display, fontSize: 20, fontWeight: 500, margin: "0 0 12px", color: "#1e2d16" }}>Quellen-Analyse</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "#fefdfb", border: "1px solid #e3e0da", borderRadius: 8, padding: "20px 24px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#947424", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>josalzburg.com</div>
                <div style={{ fontFamily: DS.fonts.display, fontSize: 15, fontWeight: 500, color: "#2c4120", marginBottom: 8 }}>Tourismusverband</div>
                <div style={{ fontSize: 12, lineHeight: 1.6, color: "#5e594f" }}>
                  Bildstarke Hero-Sections, große Slider, Grid-basierte Teaser-Cards, runde Bildformate, warme Tonalität, Community-Feel. Navigation mit Mega-Menü.
                </div>
              </div>
              <div style={{ background: "#fefdfb", border: "1px solid #e3e0da", borderRadius: 8, padding: "20px 24px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#947424", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>hotel-alpendorf.at</div>
                <div style={{ fontFamily: DS.fonts.display, fontSize: 15, fontWeight: 500, color: "#2c4120", marginBottom: 8 }}>4**** Aktivhotel</div>
                <div style={{ fontSize: 12, lineHeight: 1.6, color: "#5e594f" }}>
                  Fullscreen-Bilder, emotionale Headlines, Serif + Sans-Pairing, CTA-Buttons mit Gold-Akzent, Buchungs-Integration, strukturierte Unterseiten mit Zimmerkarten.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COLORS */}
        {active === 1 && (
          <div>
            <h2 style={{ fontFamily: DS.fonts.display, fontSize: 26, fontWeight: 500, margin: "0 0 8px", color: "#1e2d16" }}>Farbsystem</h2>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "#5e594f", marginBottom: 28 }}>
              Die Palette leitet sich aus den natürlichen Materialien und Landschaften des Salzburger Lands ab: Nadelwald-Grün als Primärfarbe, Gold als luxuriöser Akzent, warme Creme- und Holztöne für Hintergründe, Stein-Grau für Neutrales.
            </p>

            <div style={{ background: "#f5efe1", borderRadius: 10, padding: 24, marginBottom: 28, border: "1px solid #e2d4b1" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#70571b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Primär & Akzent</div>
              <ColorRow name="Forest Green — Primärfarbe" ramp={DS.colors.primary.forest} />
              <ColorRow name="Alpine Gold — Akzentfarbe" ramp={DS.colors.accent.gold} />
            </div>

            <div style={{ background: "#fefdfb", borderRadius: 10, padding: 24, marginBottom: 28, border: "1px solid #e3e0da" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#70571b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Hintergründe & Neutrales</div>
              <ColorRow name="Cream — Hintergründe" ramp={DS.colors.warm.cream} />
              <ColorRow name="Walnut — Holzakzente" ramp={DS.colors.wood.walnut} />
              <ColorRow name="Stone — Neutrales" ramp={DS.colors.neutral.stone} />
              <ColorRow name="Alpine Sky — Informativ" ramp={DS.colors.sky.alpine} />
            </div>

            <ComponentCard title="Semantische Farben">
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {Object.entries(DS.colors.semantic).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 6, background: v }} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#403d36", textTransform: "capitalize" }}>{k}</div>
                      <div style={{ fontSize: 10, color: "#9b9588", fontFamily: "'DM Mono', monospace" }}>{v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ComponentCard>

            <ComponentCard title="Anwendungsregeln">
              <div style={{ fontSize: 13, lineHeight: 1.8, color: "#5e594f" }}>
                <div style={{ marginBottom: 8 }}><strong style={{ color: "#2c4120" }}>Hintergrund:</strong> Cream 50–100 für Seiten, Cream 200 für Abschnittswechsel, Weiß für Cards</div>
                <div style={{ marginBottom: 8 }}><strong style={{ color: "#2c4120" }}>Text:</strong> Stone 900 für Headlines, Stone 700 für Body, Stone 500 für sekundären Text</div>
                <div style={{ marginBottom: 8 }}><strong style={{ color: "#2c4120" }}>CTAs:</strong> Forest 500 als Hintergrund + Cream 50 als Text, oder Gold 400 für sekundäre Actions</div>
                <div><strong style={{ color: "#2c4120" }}>Hover:</strong> Forest 600 / Gold 500 — immer eine Stufe dunkler</div>
              </div>
            </ComponentCard>
          </div>
        )}

        {/* TYPOGRAPHY */}
        {active === 2 && (
          <div>
            <h2 style={{ fontFamily: DS.fonts.display, fontSize: 26, fontWeight: 500, margin: "0 0 8px", color: "#1e2d16" }}>Typografie</h2>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "#5e594f", marginBottom: 28 }}>
              Drei Schriftfamilien in klarer Hierarchie: Playfair Display für emotionale Headlines, DM Sans für klare Body-Texte, Cormorant Garamond für elegante Zitate und dekorative Elemente.
            </p>

            <div style={{ background: "#f5efe1", borderRadius: 10, padding: 24, marginBottom: 28, border: "1px solid #e2d4b1" }}>
              <TypeSample font={DS.fonts.display} name="Display — Playfair Display" desc="Headlines, Hero-Sections, Seitentitel. Kursiv für emotionale Momente." size={32} weight={500} sample="Willkommen im Herzen der Alpen" style={{ fontStyle: "italic" }} />
              <TypeSample font={DS.fonts.body} name="Body — DM Sans" desc="Fließtext, Navigation, Buttons, UI-Elemente. Gewichte: 300–700." size={16} weight={400} sample="Erleben Sie unvergessliche Urlaubsmomente inmitten der Salzburger Bergwelt. Unser familiengeführtes Haus vereint alpine Tradition mit modernem Komfort." />
              <TypeSample font={DS.fonts.accent} name="Akzent — Cormorant Garamond" desc="Zitate, Bildunterschriften, dekorative Labels. Kursiv bevorzugt." size={20} weight={400} sample="„Wo die Berge den Himmel berühren"" style={{ fontStyle: "italic" }} />
            </div>

            <ComponentCard title="Typografische Skala">
              <div style={{ display: "grid", gap: 1 }}>
                {[
                  { label: "Hero", size: "42–56px", font: "Playfair Display", weight: "500 italic", lh: "1.1" },
                  { label: "H1", size: "32–36px", font: "Playfair Display", weight: "500", lh: "1.2" },
                  { label: "H2", size: "24–28px", font: "Playfair Display", weight: "500", lh: "1.25" },
                  { label: "H3", size: "18–20px", font: "DM Sans", weight: "600", lh: "1.3" },
                  { label: "Body", size: "15–16px", font: "DM Sans", weight: "400", lh: "1.7" },
                  { label: "Small", size: "13–14px", font: "DM Sans", weight: "400", lh: "1.6" },
                  { label: "Caption", size: "11–12px", font: "DM Sans", weight: "500", lh: "1.5" },
                  { label: "Label", size: "11px", font: "DM Sans", weight: "600", lh: "1.4" },
                ].map(r => (
                  <div key={r.label} style={{ display: "grid", gridTemplateColumns: "70px 100px 1fr 60px 50px", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f0eeea", fontSize: 12 }}>
                    <span style={{ fontWeight: 600, color: "#3a5529" }}>{r.label}</span>
                    <span style={{ color: "#7c766a" }}>{r.size}</span>
                    <span style={{ color: "#9b9588" }}>{r.font}</span>
                    <span style={{ color: "#9b9588" }}>{r.weight}</span>
                    <span style={{ color: "#b8b3a8" }}>{r.lh}</span>
                  </div>
                ))}
              </div>
            </ComponentCard>

            <ComponentCard title="Schriftpaarung in der Praxis">
              <div style={{ background: "#2c4120", borderRadius: 8, padding: "32px 28px", color: "#faf7f0" }}>
                <div style={{ fontFamily: DS.fonts.body, fontSize: 11, fontWeight: 600, color: "#b8c9ab", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>Aktivhotel Alpendorf ****</div>
                <div style={{ fontFamily: DS.fonts.display, fontSize: 28, fontWeight: 500, fontStyle: "italic", marginBottom: 12, lineHeight: 1.2 }}>Ihr Wintertraum im Salzburger Land</div>
                <div style={{ fontFamily: DS.fonts.body, fontSize: 14, color: "#b8c9ab", lineHeight: 1.7, marginBottom: 20 }}>Nur 150m zur Gondelbahn — Ski-in & Ski-out im Snow Space Salzburg. Genießen Sie unsere Halbpension mit regionaler Küche.</div>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ background: "#cda63d", color: "#1e2d16", fontFamily: DS.fonts.body, fontSize: 13, fontWeight: 600, padding: "10px 24px", borderRadius: 4, cursor: "pointer" }}>Jetzt anfragen</div>
                  <div style={{ border: "1px solid #6b8c52", color: "#b8c9ab", fontFamily: DS.fonts.body, fontSize: 13, fontWeight: 500, padding: "10px 24px", borderRadius: 4, cursor: "pointer" }}>Zimmer ansehen</div>
                </div>
              </div>
            </ComponentCard>
          </div>
        )}

        {/* COMPONENTS */}
        {active === 3 && (
          <div>
            <h2 style={{ fontFamily: DS.fonts.display, fontSize: 26, fontWeight: 500, margin: "0 0 8px", color: "#1e2d16" }}>Komponenten</h2>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "#5e594f", marginBottom: 28 }}>UI-Bausteine für Hotel- und Tourismus-Websites im alpinen Stil.</p>

            {/* Buttons */}
            <ComponentCard title="Buttons">
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                <button style={{ background: "#4a6b35", color: "#faf7f0", fontFamily: DS.fonts.body, fontSize: 14, fontWeight: 600, padding: "12px 28px", borderRadius: 4, border: "none", cursor: "pointer", letterSpacing: "0.02em" }}>Jetzt buchen</button>
                <button style={{ background: "#cda63d", color: "#1e2d16", fontFamily: DS.fonts.body, fontSize: 14, fontWeight: 600, padding: "12px 28px", borderRadius: 4, border: "none", cursor: "pointer" }}>Anfrage senden</button>
                <button style={{ background: "transparent", color: "#4a6b35", fontFamily: DS.fonts.body, fontSize: 14, fontWeight: 600, padding: "12px 28px", borderRadius: 4, border: "2px solid #4a6b35", cursor: "pointer" }}>Mehr erfahren</button>
                <button style={{ background: "transparent", color: "#7c766a", fontFamily: DS.fonts.body, fontSize: 13, fontWeight: 500, padding: "10px 20px", borderRadius: 4, border: "1px solid #d0ccc3", cursor: "pointer" }}>Abbrechen</button>
              </div>
              <div style={{ fontSize: 12, color: "#9b9588", marginTop: 12, lineHeight: 1.6 }}>
                Primär (Forest), Akzent (Gold), Outline, Ghost. Border-radius: 4px. Padding: 12px 28px.
              </div>
            </ComponentCard>

            {/* Room Card */}
            <ComponentCard title="Zimmerkarte">
              <div style={{ background: "#fff", borderRadius: 8, overflow: "hidden", border: "1px solid #e3e0da", maxWidth: 360 }}>
                <div style={{ height: 180, background: "linear-gradient(135deg, #8faa78 0%, #3a5529 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: DS.fonts.display, fontSize: 18, color: "#faf7f0", fontStyle: "italic", opacity: 0.7 }}>Zimmerbild</span>
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <div style={{ fontFamily: DS.fonts.body, fontSize: 11, fontWeight: 600, color: "#947424", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>Suite</div>
                  <div style={{ fontFamily: DS.fonts.display, fontSize: 20, fontWeight: 500, color: "#1e2d16", marginBottom: 8 }}>Panoramasuite Deluxe</div>
                  <div style={{ fontSize: 13, color: "#7c766a", lineHeight: 1.6, marginBottom: 16 }}>45m² mit Balkon und Bergblick. Kuschelige Zirbenholz-Einrichtung.</div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                    {["Balkon", "Bergblick", "45m²", "Zirbenholz"].map(t => (
                      <span key={t} style={{ fontSize: 11, color: "#4a6b35", background: "#f2f5f0", padding: "4px 10px", borderRadius: 999, fontWeight: 500 }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f0eeea", paddingTop: 16 }}>
                    <div>
                      <span style={{ fontSize: 12, color: "#9b9588" }}>ab </span>
                      <span style={{ fontFamily: DS.fonts.display, fontSize: 24, fontWeight: 600, color: "#1e2d16" }}>€ 189</span>
                      <span style={{ fontSize: 12, color: "#9b9588" }}> / Nacht</span>
                    </div>
                    <button style={{ background: "#4a6b35", color: "#faf7f0", fontSize: 13, fontWeight: 600, padding: "10px 20px", borderRadius: 4, border: "none", cursor: "pointer", fontFamily: DS.fonts.body }}>Details →</button>
                  </div>
                </div>
              </div>
            </ComponentCard>

            {/* Badge / Tag */}
            <ComponentCard title="Badges & Tags">
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { bg: "#f2f5f0", color: "#3a5529", text: "Inklusiv" },
                  { bg: "#faf6ed", color: "#70571b", text: "NEU" },
                  { bg: "#f0f6fa", color: "#1b4663", text: "Tipp" },
                  { bg: "#2c4120", color: "#dbe3d5", text: "Bestseller" },
                  { bg: "#cda63d", color: "#1e2d16", text: "★ 4.8" },
                ].map(b => (
                  <span key={b.text} style={{ fontSize: 11, fontWeight: 600, background: b.bg, color: b.color, padding: "5px 12px", borderRadius: 999, letterSpacing: "0.04em" }}>{b.text}</span>
                ))}
              </div>
            </ComponentCard>

            {/* Navigation Item */}
            <ComponentCard title="Navigation">
              <div style={{ background: "#2c4120", borderRadius: 8, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontFamily: DS.fonts.display, fontSize: 18, fontWeight: 500, color: "#faf7f0" }}>Alpendorf</div>
                <div style={{ display: "flex", gap: 24 }}>
                  {["Hotel", "Zimmer", "Preise", "Winter", "Sommer"].map(n => (
                    <span key={n} style={{ fontFamily: DS.fonts.body, fontSize: 13, fontWeight: 500, color: "#b8c9ab", cursor: "pointer" }}>{n}</span>
                  ))}
                </div>
                <button style={{ background: "#cda63d", color: "#1e2d16", fontSize: 12, fontWeight: 600, padding: "8px 18px", borderRadius: 4, border: "none", cursor: "pointer", fontFamily: DS.fonts.body }}>Buchen</button>
              </div>
            </ComponentCard>

            {/* Testimonial */}
            <ComponentCard title="Gästebewertung">
              <div style={{ background: "#f5efe1", borderRadius: 8, padding: "24px 28px", border: "1px solid #e2d4b1" }}>
                <div style={{ fontFamily: DS.fonts.accent, fontSize: 18, fontStyle: "italic", color: "#403d36", lineHeight: 1.6, marginBottom: 16 }}>
                  „Ein wunderschöner Aufenthalt mit herzlicher Gastfreundschaft und einem atemberaubenden Panoramablick auf die Berge."
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#b8c9ab", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: DS.fonts.body, fontWeight: 600, fontSize: 13, color: "#2c4120" }}>MK</div>
                  <div>
                    <div style={{ fontFamily: DS.fonts.body, fontSize: 13, fontWeight: 600, color: "#403d36" }}>Maria K.</div>
                    <div style={{ fontFamily: DS.fonts.body, fontSize: 11, color: "#9b9588" }}>Familienurlaub, Februar 2026</div>
                  </div>
                  <div style={{ marginLeft: "auto", color: "#cda63d", fontSize: 14, letterSpacing: 2 }}>★★★★★</div>
                </div>
              </div>
            </ComponentCard>
          </div>
        )}

        {/* LAYOUT */}
        {active === 4 && (
          <div>
            <h2 style={{ fontFamily: DS.fonts.display, fontSize: 26, fontWeight: 500, margin: "0 0 8px", color: "#1e2d16" }}>Layout-System</h2>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "#5e594f", marginBottom: 28 }}>Spacing, Grid und Sektions-Strukturen.</p>

            <ComponentCard title="Spacing-Skala (px)">
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-end" }}>
                {DS.spacing.filter(s => s > 0).map(s => (
                  <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ width: Math.min(s, 48), height: Math.min(s, 48), borderRadius: 3, background: "#b8c9ab", border: "1px solid #8faa78" }} />
                    <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "#7c766a" }}>{s}</span>
                  </div>
                ))}
              </div>
            </ComponentCard>

            <ComponentCard title="Border-Radius">
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                {Object.entries(DS.radii).filter(([k]) => k !== "none").map(([k, v]) => (
                  <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 48, height: 48, borderRadius: v, background: "#dbe3d5", border: "2px solid #8faa78" }} />
                    <span style={{ fontSize: 11, fontWeight: 500, color: "#5e594f" }}>{k}</span>
                    <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "#9b9588" }}>{v}px</span>
                  </div>
                ))}
              </div>
            </ComponentCard>

            <ComponentCard title="Sektions-Muster">
              <div style={{ fontSize: 13, lineHeight: 1.8, color: "#5e594f" }}>
                <div style={{ marginBottom: 12 }}>
                  <strong style={{ color: "#2c4120" }}>Hero-Section:</strong> Fullscreen-Bild, zentrierter Text-Overlay mit Playfair Display italic, CTA-Button in Gold. Höhe: 80–100vh. Dunkler Gradient-Overlay (rgba(0,0,0,0.3)).
                </div>
                <div style={{ marginBottom: 12 }}>
                  <strong style={{ color: "#2c4120" }}>Content-Section:</strong> Max-Width 1200px zentriert. Padding: 80px vertikal, 24px horizontal. Abwechselnde Hintergründe: Weiß → Cream 100 → Weiß.
                </div>
                <div style={{ marginBottom: 12 }}>
                  <strong style={{ color: "#2c4120" }}>Feature-Grid:</strong> 3-Spalten auf Desktop (1fr 1fr 1fr), 2-Spalten auf Tablet, 1-Spalte mobil. Gap: 24px. Cards mit 1px Border.
                </div>
                <div style={{ marginBottom: 12 }}>
                  <strong style={{ color: "#2c4120" }}>Galerie:</strong> Masonry-Layout oder 2:1-Grid (großes Bild links, zwei kleine rechts). Border-Radius: 8px. Hover: leichter Zoom (scale 1.03).
                </div>
                <div>
                  <strong style={{ color: "#2c4120" }}>Footer:</strong> Forest 800–900 Hintergrund. Drei Spalten: Kontakt, Navigation, Social. Gold-Akzent für Links.
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Grid-Beispiel">
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12 }}>
                <div style={{ background: "#dbe3d5", borderRadius: 6, padding: 24, gridRow: "1 / 3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: DS.fonts.display, fontSize: 16, color: "#3a5529", fontStyle: "italic" }}>Hero-Bild</span>
                </div>
                <div style={{ background: "#f0e4c3", borderRadius: 6, padding: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 12, color: "#70571b" }}>Detail 1</span>
                </div>
                <div style={{ background: "#f0e4c3", borderRadius: 6, padding: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 12, color: "#70571b" }}>Detail 2</span>
                </div>
                <div style={{ background: "#ede6dd", borderRadius: 6, padding: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 12, color: "#604937" }}>Detail 3</span>
                </div>
                <div style={{ background: "#ede6dd", borderRadius: 6, padding: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 12, color: "#604937" }}>Detail 4</span>
                </div>
              </div>
            </ComponentCard>
          </div>
        )}

        {/* PATTERNS */}
        {active === 5 && (
          <div>
            <h2 style={{ fontFamily: DS.fonts.display, fontSize: 26, fontWeight: 500, margin: "0 0 8px", color: "#1e2d16" }}>Design-Patterns</h2>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "#5e594f", marginBottom: 28 }}>Wiederkehrende Muster und Best Practices.</p>

            <ComponentCard title="Bildbehandlung">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div>
                  <div style={{ height: 100, borderRadius: 8, background: "linear-gradient(135deg, #6b8c52, #2c4120)", marginBottom: 8 }} />
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#403d36" }}>Standard</div>
                  <div style={{ fontSize: 10, color: "#9b9588" }}>border-radius: 8px</div>
                </div>
                <div>
                  <div style={{ height: 100, borderRadius: "50%", width: 100, background: "linear-gradient(135deg, #cda63d, #70571b)" }} />
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#403d36", marginTop: 8 }}>Rund (à la JO)</div>
                  <div style={{ fontSize: 10, color: "#9b9588" }}>border-radius: 50%</div>
                </div>
                <div>
                  <div style={{ height: 100, borderRadius: 8, background: "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(30,45,22,0.7) 100%), linear-gradient(135deg, #8faa78, #3a5529)", marginBottom: 8 }} />
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#403d36" }}>Mit Text-Overlay</div>
                  <div style={{ fontSize: 10, color: "#9b9588" }}>Gradient von unten</div>
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Schatten & Elevation">
              <div style={{ display: "flex", gap: 24 }}>
                {[
                  { label: "Flat", shadow: "none", border: "1px solid #e3e0da" },
                  { label: "Subtle", shadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #e3e0da" },
                  { label: "Card", shadow: "0 4px 12px rgba(0,0,0,0.08)", border: "none" },
                  { label: "Elevated", shadow: "0 8px 24px rgba(0,0,0,0.1)", border: "none" },
                ].map(s => (
                  <div key={s.label} style={{ width: 80, height: 80, borderRadius: 8, background: "#fff", boxShadow: s.shadow, border: s.border, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#403d36" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </ComponentCard>

            <ComponentCard title="CTA-Muster">
              <div style={{ fontSize: 13, lineHeight: 1.8, color: "#5e594f" }}>
                <div style={{ marginBottom: 8 }}><strong style={{ color: "#2c4120" }}>Primärer CTA:</strong> Forest-Hintergrund + helle Schrift. Für Buchung, Anfrage.</div>
                <div style={{ marginBottom: 8 }}><strong style={{ color: "#2c4120" }}>Sekundärer CTA:</strong> Gold-Hintergrund + dunkle Schrift. Für „Mehr erfahren", „Details".</div>
                <div style={{ marginBottom: 8 }}><strong style={{ color: "#2c4120" }}>Ghost CTA:</strong> Transparenter Hintergrund + Forest-Border. Für weniger prominente Aktionen.</div>
                <div><strong style={{ color: "#2c4120" }}>Sticky Booking-Bar:</strong> Fixiert am unteren Rand auf Mobilgeräten. Forest-Hintergrund, Gold-CTA-Button, Preis links.</div>
              </div>
            </ComponentCard>

            <ComponentCard title="CSS-Variablen (Export)">
              <div style={{ background: "#24221e", borderRadius: 6, padding: "16px 20px", fontFamily: "'DM Mono', monospace", fontSize: 11, lineHeight: 2, color: "#b8c9ab", overflowX: "auto" }}>
                <div style={{ color: "#7c766a" }}>/* Alpine Hospitality Design System */</div>
                <div><span style={{ color: "#cda63d" }}>--color-primary:</span> #4a6b35;</div>
                <div><span style={{ color: "#cda63d" }}>--color-primary-dark:</span> #2c4120;</div>
                <div><span style={{ color: "#cda63d" }}>--color-accent:</span> #cda63d;</div>
                <div><span style={{ color: "#cda63d" }}>--color-accent-dark:</span> #947424;</div>
                <div><span style={{ color: "#cda63d" }}>--color-bg:</span> #faf7f0;</div>
                <div><span style={{ color: "#cda63d" }}>--color-bg-alt:</span> #f5efe1;</div>
                <div><span style={{ color: "#cda63d" }}>--color-surface:</span> #fefdfb;</div>
                <div><span style={{ color: "#cda63d" }}>--color-text:</span> #24221e;</div>
                <div><span style={{ color: "#cda63d" }}>--color-text-muted:</span> #7c766a;</div>
                <div><span style={{ color: "#cda63d" }}>--color-border:</span> #e3e0da;</div>
                <div><span style={{ color: "#cda63d" }}>--font-display:</span> 'Playfair Display', serif;</div>
                <div><span style={{ color: "#cda63d" }}>--font-body:</span> 'DM Sans', sans-serif;</div>
                <div><span style={{ color: "#cda63d" }}>--font-accent:</span> 'Cormorant Garamond', serif;</div>
                <div><span style={{ color: "#cda63d" }}>--radius-sm:</span> 4px;</div>
                <div><span style={{ color: "#cda63d" }}>--radius-md:</span> 8px;</div>
                <div><span style={{ color: "#cda63d" }}>--radius-lg:</span> 12px;</div>
              </div>
            </ComponentCard>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: "#1e2d16", padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "12px 12px 0 0", marginTop: 24 }}>
        <span style={{ fontFamily: DS.fonts.body, fontSize: 12, color: "#6b8c52" }}>Alpine Hospitality Design System v1.0</span>
        <span style={{ fontFamily: DS.fonts.body, fontSize: 12, color: "#6b8c52" }}>Basierend auf josalzburg.com & hotel-alpendorf.at</span>
      </div>
    </div>
  );
}
