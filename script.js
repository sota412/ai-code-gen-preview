:root {
  --bg: #f4f1e8;
  --panel: rgba(255, 255, 255, 0.72);
  --panel-strong: rgba(255, 255, 255, 0.9);
  --text: #16211d;
  --muted: #53615d;
  --line: rgba(20, 36, 30, 0.08);
  --accent: #2f7a5c;
  --accent-strong: #1b5b3f;
  --accent-soft: #dfeee5;
  --gold: #dcbf72;
  --shadow: 0 30px 80px rgba(18, 43, 31, 0.15);
  --radius-xl: 32px;
  --radius-lg: 22px;
  --radius-md: 16px;
  --container: min(1200px, calc(100% - 3rem));
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Inter", "Noto Sans JP", sans-serif;
  background:
    radial-gradient(circle at top, rgba(123, 173, 143, 0.18), transparent 30%),
    linear-gradient(180deg, #f7f4ee 0%, #ecf4ee 100%);
  color: var(--text);
  line-height: 1.7;
  overflow-x: hidden;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
}

.bg-noise {
  position: fixed;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 0.7px, transparent 0.7px);
  background-size: 18px 18px;
  opacity: 0.35;
  pointer-events: none;
}

.container {
  width: var(--container);
  margin: 0 auto;
}

.section {
  padding: 6rem 0;
  position: relative;
}

.alt {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-strong);
  margin-bottom: 1.1rem;
}

.eyebrow::before {
  content: "";
  width: 28px;
  height: 1px;
  background: currentColor;
}

.eyebrow.accent {
  color: #295f4b;
}

.section-heading {
  margin-bottom: 3rem;
}

.section-heading h2 {
  max-width: 720px;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.06em;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(16px);
  background: rgba(247, 244, 238, 0.58);
  border-bottom: 1px solid rgba(18, 43, 31, 0.06);
}

.nav-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 82px;
  gap: 1rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 800;
  font-size: 1.05rem;
  letter-spacing: 0.04em;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), #86b59b);
  color: white;
  box-shadow: 0 12px 24px rgba(47, 122, 92, 0.25);
}

.main-nav {
  display: inline-flex;
  align-items: center;
  gap: 2rem;
  color: var(--muted);
  font-weight: 500;
}

.main-nav a {
  transition: opacity 0.2s ease;
}

.main-nav a:hover {
  opacity: 0.7;
}

.nav-cta,
.primary-btn,
.secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.nav-cta,
.primary-btn {
  background: linear-gradient(135deg, var(--accent), #84b191);
  color: white;
  box-shadow: 0 20px 40px rgba(47, 122, 92, 0.2);
}

.nav-cta {
  padding: 0.8rem 1.15rem;
  font-size: 0.9rem;
  font-weight: 700;
}

.primary-btn,
.secondary-btn {
  padding: 1rem 1.6rem;
  font-weight: 700;
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.6);
  color: var(--text);
  border: 1px solid rgba(22, 33, 29, 0.08);
}

.nav-cta:hover,
.primary-btn:hover,
.secondary-btn:hover {
  transform: translateY(-2px);
}

.hero {
  padding-top: 5rem;
  padding-bottom: 4.5rem;
  position: relative;
  overflow: hidden;
}

.hero-visual {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(14px);
  opacity: 0.5;
  animation: float 18s ease-in-out infinite alternate;
}

.orb-one {
  width: 440px;
  height: 440px;
  background: rgba(95, 156, 116, 0.28);
  right: 12%;
  top: 6%;
}

.orb-two {
  width: 540px;
  height: 540px;
  background: rgba(159, 198, 143, 0.22);
  left: 10%;
  bottom: -10%;
  animation-delay: 1s;
}

.orb-three {
  width: 260px;
  height: 260px;
  background: rgba(214, 182, 103, 0.24);
  right: 28%;
  bottom: 10%;
  animation-delay: 2s;
}

.mist {
  position: absolute;
  width: 360px;
  height: 220px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.36);
  filter: blur(26px);
}

.mist-one {
  left: 14%;
  top: 14%;
}

.mist-two {
  right: 18%;
  bottom: 6%;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 3rem;
  align-items: center;
}

.hero-copy h1 {
  font-size: clamp(3rem, 6vw, 6rem);
  line-height: 0.92;
  letter-spacing: -0.08em;
  margin-bottom: 1.25rem;
  max-width: 560px;
}

.lead {
  max-width: 620px;
  font-size: 1.12rem;
  color: var(--muted);
  margin-bottom: 2rem;
}

.cta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.hero-meta {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.hero-meta li {
  min-width: 150px;
  background: rgba(255, 255, 255, 0.38);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1rem 1.1rem;
  display: grid;
  gap: 0.2rem;
  box-shadow: 0 15px 30px rgba(22, 36, 29, 0.04);
}

.hero-meta strong {
  font-size: 1.1rem;
}

.hero-meta span {
  color: var(--muted);
  font-size: 0.85rem;
}

.hero-card {
  position: relative;
  background: rgba(255, 255, 255, 0.52);
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow);
  padding: 1rem;
}

.card-photo {
  height: 620px;
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(18, 40, 31, 0.14), rgba(18, 40, 31, 0.38)),
    url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80") center/cover no-repeat;
  position: relative;
  overflow: hidden;
}

.card-photo::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.1), rgba(0,0,0,0.08));
}

.card-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1rem;
}

.card-badges span {
  background: rgba(47, 122, 92, 0.08);
  color: var(--accent-strong);
  border-radius: 999px;
  padding: 0.55rem 0.9rem;
  font-size: 0.76rem;
  font-weight: 700;
}

.mini-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.mini-stats div {
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1rem;
  display: grid;
  gap: 0.3rem;
}

.mini-stats strong {
  font-size: 1.5rem;
  letter-spacing: -0.05em;
}

.mini-stats span {
  color: var(--muted);
  font-size: 0.82rem;
}

.story-layout {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 2.5rem;
  align-items: center;
}

.story-copy {
  font-size: 1.05rem;
  color: var(--muted);
  display: grid;
  gap: 1.5rem;
}

.story-points {
  display: grid;
  gap: 1rem;
  margin-top: 0.5rem;
}

.story-points div {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 0.9rem 1rem;
  color: var(--text);
  width: fit-content;
  min-width: 290px;
}

.point-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent-strong);
  font-weight: 900;
}

.story-visual {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 1rem;
  min-height: 420px;
}

.visual-card {
  border-radius: 28px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(22, 33, 29, 0.05);
  background-size: cover;
  background-position: center;
}

.visual-card.large {
  background-image: linear-gradient(rgba(12, 23, 18, 0.12), rgba(12, 23, 18, 0.22)), url("https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80");
  min-height: 420px;
}

.visual-card.small {
  background-image: linear-gradient(rgba(12, 23, 18, 0.16), rgba(12, 23, 18, 0.24)), url("https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80");
  min-height: 320px;
  margin-top: 4rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 2rem 1.5rem;
  box-shadow: 0 20px 42px rgba(19, 37, 28, 0.04);
}

.feature-icon {
  width: 3.5rem;
  height: 3.5rem;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(47, 122, 92, 0.12), rgba(214, 182, 103, 0.16));
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-bottom: 0.7rem;
  font-size: 1.35rem;
  letter-spacing: -0.04em;
}

.feature-card p {
  color: var(--muted);
}

.season-list {
  display: grid;
  gap: 1.4rem;
}

.season-item {
  display: grid;
  grid-template-columns: 270px 1fr;
  gap: 1.3rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.46);
  border: 1px solid var(--line);
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 20px 42px rgba(19, 37, 28, 0.04);
}

.season-image {
  min-height: 220px;
  background-size: cover;
  background-position: center;
}

.season-image.spring {
  background-image: linear-gradient(rgba(15, 38, 27, 0.08), rgba(15, 38, 27, 0.18)), url("https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1000&q=80");
}

.season-image.summer {
  background-image: linear-gradient(rgba(15, 38, 27, 0.08), rgba(15, 38, 27, 0.18)), url("https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80");
}

.season-image.autumn {
  background-image: linear-gradient(rgba(15, 38, 27, 0.08), rgba(15, 38, 27, 0.18)), url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80");
}

.season-image.winter {
  background-image: linear-gradient(rgba(15, 38, 27, 0.08), rgba(15, 38, 27, 0.18)), url("https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1000&q=80");
}

.season-body {
  padding: 1.2rem 1.4rem 1.2rem 0.2rem;
}

.season-tag {
  color: var(--accent-strong);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.18em;
}

.season-body h3 {
  margin-top: 0.55rem;
  margin-bottom: 0.5rem;
  font-size: clamp(1.5rem, 2vw, 2.1rem);
  letter-spacing: -0.05em;
}

.season-body p {
  color: var(--muted);
  max-width: 720px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: 220px;
  gap: 1.25rem;
}

.gallery-item {
  border-radius: 24px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(18, 43, 31, 0.08);
}

.gallery-item:nth-child(1) {
  background-image: linear-gradient(rgba(15, 38, 27, 0.12), rgba(15, 38, 27, 0.18)), url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80");
  grid-column: span 1;
  grid-row: span 2;
}

.gallery-item:nth-child(2) {
  background-image: linear-gradient(rgba(15, 38, 27, 0.12), rgba(15, 38, 27, 0.18)), url("https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=80");
}

.gallery-item:nth-child(3) {
  background-image: linear-gradient(rgba(15, 38, 27, 0.12), rgba(15, 38, 27, 0.18)), url("https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=900&q=80");
}

.gallery-item:nth-child(4) {
  background-image: linear-gradient(rgba(15, 38, 27, 0.12), rgba(15, 38, 27, 0.18)), url("https://images.unsplash.com/photo-1439066615861-d1af74d1001a?auto=format&fit=crop&w=1200&q=80");
  grid-column: span 2;
}

.visit-wrap {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 2rem;
  align-items: center;
  background: linear-gradient(135deg, rgba(47, 122, 92, 0.08), rgba(214, 182, 103, 0.12));
  border: 1px solid rgba(18, 43, 31, 0.08);
  border-radius: 32px;
  padding: clamp(1.7rem, 4vw, 3rem);
  box-shadow: 0 22px 60px rgba(18, 43, 31, 0.06);
}

.visit-copy p:last-child {
  color: var(--muted);
  max-width: 620px;
}

.visit-card {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 22px;
  border: 1px solid var(--line);
  padding: 1.3rem;
  display: grid;
  gap: 1rem;
}

.info-row {
  display: grid;
  gap: 0.4rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(18, 43, 31, 0.08);
}

.info-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.label {
  color: var(--muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.site-footer {
  border-top: 1px solid rgba(18, 43, 31, 0.06);
  background: rgba(255, 255, 255, 0.5);
}

.footer-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
  color: var(--muted);
}

.reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes float {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  100% {
    transform: translate3d(18px, -24px, 0) scale(1.08);
  }
}

@media (max-width: 980px) {
  .hero-inner,
  .story-layout,
  .visit-wrap,
  .feature-grid {
    grid-template-columns: 1fr;
  }

  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .main-nav {
    display: none;
  }

  .hero-card {
    max-width: 600px;
    margin: 0 auto;
  }

  .card-photo {
    height: 480px;
  }

  .story-visual {
    min-height: 300px;
  }
}

@media (max-width: 640px) {
  .section {
    padding: 4.5rem 0;
  }

  .nav-wrap {
    min-height: 72px;
  }

  .brand {
    font-size: 0.92rem;
  }

  .nav-cta {
    display: none;
  }

  .hero-copy h1 {
    max-width: 100%;
  }

  .cta-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .primary-btn,
  .secondary-btn {
    width: 100%;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .season-item {
    grid-template-columns: 1fr;
  }

  .season-image {
    min-height: 220px;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .gallery-item:nth-child(1),
  .gallery-item:nth-child(4) {
    grid-column: auto;
    grid-row: auto;
  }

  .footer-wrap {
    flex-direction: column;
    justify-content: center;
    gap: 0.4rem;
    padding: 1rem 0;
  }
}
