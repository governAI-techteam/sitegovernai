"use client";

import "./linkdin-carousel.css";


import { useState, useRef, useCallback, useEffect } from "react";


// ─── Sample Data ────────────────────────────────────────────────────────────
const POSTS = [
  {
    id: 1,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7414398372716969984?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 2,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7403652069284638720?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 3,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7442782394014851072?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 4,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7440253272525004801?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 5,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7440426213749469185?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 6,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7426120099142500352?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 7,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7422852587751727104?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 8,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7421868573825957888?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 9,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7419239794649636864?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 10,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7398466614096125953?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 11,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7397576249109512192?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 12,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7394589556630745088?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 13,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7392263030690131968?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 14,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7391930212604760064?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 15,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7391697024754245632?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 16,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7389956816538988544?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 17,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7389352805565652992?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 18,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7389192774987718657?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 19,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7387344623888871424?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 20,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7377560126163050496?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 21,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7375753795965919233?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 22,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7374346629887410176?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 23,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7371499263966687233?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 24,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7366912348827049984?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 25,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7366401606403174401?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 26,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7349873356818587648?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 27,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7342285710625841153?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
  {
    id: 28,
    embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7352790910608314368?collapsed=1" height="603" width="504" frameborder="0" allowfullscreen title="Embedded post"></iframe>`,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getVisibleCount() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 600) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function LinkedInCard({ embed }) {
  return (
    <article className="li-card">
      <div
        className="li-card__embed"
        dangerouslySetInnerHTML={{ __html: embed }}
      />
    </article>
  );
}

function NavButton({ direction, onClick, disabled }) {
  return (
    <button
      className={`li-nav-btn li-nav-btn--${direction}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous posts" : "Next posts"}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {direction === "prev" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
}

function DotIndicators({ total, current, onDotClick }) {
  return (
    <div className="li-dots" role="tablist" aria-label="Carousel navigation">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === current}
          aria-label={`Go to slide ${i + 1}`}
          className={`li-dot${i === current ? " li-dot--active" : ""}`}
          onClick={() => onDotClick(i)}
        />
      ))}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function LinkedInEmbedCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const trackRef = useRef(null);

  // Recalculate visible cards on resize
  useEffect(() => {
    function handleResize() {
      setVisibleCount(getVisibleCount());
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, POSTS.length - visibleCount);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const goTo = useCallback(
    (index) => {
      setCurrentIndex(Math.min(Math.max(index, 0), maxIndex));
    },
    [maxIndex]
  );

  // Clamp index when visibleCount changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  // Translate percentage based on card slot width
  const translateX = `calc(-${currentIndex} * (var(--li-card-width) + var(--li-card-gap)))`;

  return (
    <section className="li-section" aria-label="LinkedIn posts carousel">
      {/* Header */}
      <header className="li-section__header">
        <span className="li-section__eyebrow">Our Thoughts</span>
        <h2 className="li-section__title">Latest on {" "}
            <span className="li-accent">Linkedin</span></h2>
        <p className="li-section__subtitle">
          Stay connected with our latest updates, insights, and conversations.
        </p>
      </header>

      {/* Carousel */}
      <div className="li-carousel">
        {/* Edge fade overlays */}
        <div className="li-fade li-fade--left" aria-hidden="true" />
        <div className="li-fade li-fade--right" aria-hidden="true" />

        {/* Navigation */}
        <NavButton direction="prev" onClick={goPrev} disabled={currentIndex === 0} />
        <NavButton direction="next" onClick={goNext} disabled={currentIndex >= maxIndex} />

        {/* Viewport */}
        <div className="li-viewport" role="region" aria-live="polite">
          <div
            ref={trackRef}
            className="li-track"
            style={{ transform: `translateX(${translateX})` }}
          >
            {POSTS.map((post) => (
              <LinkedInCard key={post.id} embed={post.embed} />
            ))}
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <DotIndicators
        total={maxIndex + 1}
        current={currentIndex}
        onDotClick={goTo}
      />
    </section>
  );
}