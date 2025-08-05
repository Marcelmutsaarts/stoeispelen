# UI Styleguide voor *AI voor Docenten* – Referentie

Dit document legt de belangrijkste **technische specificaties** vast om in Cursor (of een ander front‑end framework) dezelfde look‑and‑feel als de getoonde website te bouwen.

---

## 1 Kleurenpalet

| Rol | Hex | Opmerking |
|---|---|---|
| **Primair paars** | `#9C6BFF` | Basiskleur voor accenten en logo‑details |
| **Primair paars donker** | `#6B4BFF` | Start van gradients, hover‑states |
| **Primair paars licht** | `#B34BFF` | Eind van gradients |
| **Lavendel achtergrond** | `#F6F1FF` | Sectie‑achtergrond (hero, cards) |
| **Card‑rand** | `#E4D8FF` | 1 px borders |
| **Tekst zwart** | `#000000` | Koppen |
| **Tekst grijs** | `#444444` | Lichaamstekst |
| **Schaduw** | `rgba(0,0,0,0.08)` | Component‑shadow |

> **Gradient**  
> `linear-gradient(135deg, #6B4BFF 0%, #B34BFF 100%)`

---

## 2 Typografie

| Element | Font-family | Size | Weight | Line-height |
|---|---|---|---|---|
| Logo / Branding | "Poppins", sans-serif | 1.25 rem | 600 | 1.2 |
| **H1** hero | "Poppins", sans-serif | 3 rem (48 px) | 700 | 1.2 |
| H2 | "Poppins" | 2 rem (32 px) | 700 | 1.3 |
| H3 | "Poppins" | 1.5 rem (24 px) | 600 | 1.35 |
| Body | "Poppins" | 1 rem (16 px) | 400 | 1.6 |
| Buttons / Badge | "Poppins" | 0.875 rem (14 px) | 600 | 1.2 |

---

## 3 Lay‑out & Rasters

| Eigenschap | Waarde |
|---|---|
| **Max‑container‑breedte** | 1200 px |
| **Section padding Y** | 4 rem (64 px) |
| **Grid gap** | 2 rem (32 px) |
| **Hero‑grid** | 2 kolommen (40% / 60%) |
| **Card‑layout** | Flex row, gap 2 rem; auto‑wrap |

---

## 4 Componenten

### 4.1 Primary Button
```css
button.primary {
  background: linear-gradient(135deg,#6B4BFF 0%,#B34BFF 100%);
  color:#fff;
  padding:0.75rem 2rem;
  border-radius:8px;
  font-weight:600;
  display:inline-flex;align-items:center;gap:0.5rem;
  box-shadow:0 2px 4px rgba(0,0,0,0.10);
  transition:transform .2s ease, box-shadow .2s ease;
}
button.primary:hover {
  transform:translateY(-2px);
  box-shadow:0 4px 8px rgba(0,0,0,0.12);
}
```

### 4.2 Pill Badge ("OVER ONS")
```css
.badge {
  border:2px solid #C9B3FF;
  padding:0.25rem 1rem;
  border-radius:9999px;
  color:#734BFF;
  font-weight:600;
  background:#ffffff;
}
```

### 4.3 Card
```css
.card {
  width:220px;
  border:1px solid #E4D8FF;
  border-radius:16px;
  padding:1.5rem 1rem;
  text-align:center;
  background:#ffffff;
  box-shadow:0 4px 6px rgba(0,0,0,0.05);
}
.card img {
  width:80px;height:80px;object-fit:cover;border-radius:50%;
  margin-bottom:1rem;
}
.card h3 {
  font-size:1.125rem;
  font-weight:600;
  margin-bottom:0.25rem;
}
.card p {
  font-size:0.9rem;
  opacity:0.8;
}
```

### 4.4 Navigatiebalk
```css
nav {
  height:72px;
  display:flex;align-items:center;
  justify-content:space-between;
  max-width:1200px;margin:0 auto;
  padding:0 1.5rem;
}
nav ul {
  display:flex;gap:2rem;
}
nav a {
  color:#000;
  font-weight:500;
  transition:color .2s ease;
}
nav a.active,
nav a:hover {
  color:#734BFF;
}
```

---

## 5 Radius & Shadow‑tokens

| Token | CSS |
|---|---|
| `--radius-sm` | 8 px |
| `--radius-md` | 12 px |
| `--radius-lg` | 16 px |
| `--shadow-sm` | 0 2px 4px rgba(0,0,0,0.08) |
| `--shadow-md` | 0 4px 6px rgba(0,0,0,0.10) |

---

## 6 Animaties

- **Hover‑lift** van knoppen en cards: `transform: translateY(-2px)` + shadow‑upgrade.
- **Logo fade‑in** bij load: 400 ms ease, `opacity` van 0→1.

---

## 7 Responsiveness

| Breakpoint | Width | Aanpassingen |
|---|---|---|
| `md` | 768 px | Hero‑grid wordt verticale stack; text centraal uitlijnen |
| `sm` | 480 px | Card grid → 1 kolom; navbar items in hamburger‑menu |

---

## 8 Assets

- **Logo**: SVG met tekst "AI" in `#9C6BFF` en script‑font "voor docenten" in zwart.
- **Portretfoto's**: JPG, 300×300 px, object‑fit cover, cirkelmasker.

---

> Bewaar dit bestand als `uiterlijkapp.md` en importeer het in Cursor zodat je direct een consistente UI‑basis hebt.
