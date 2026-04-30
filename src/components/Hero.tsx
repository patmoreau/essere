import {useEffect, useState} from 'react';
import {useDirectus} from "../share/directus/core/use-directus.ts";
import type {HomePage} from "../share/directus/core/home-page.ts";

export default function Hero() {
  const [data, setData] = useState<HomePage | null>(null);
  const {getHomePage} = useDirectus();

  useEffect(() => {
    getHomePage().then(setData);
  }, [getHomePage]);

  if (!data) return null;

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: '4rem',
        padding: '10rem 3rem 6rem',
        background: 'var(--background)',
      }}
    >
      {/* Left: text */}
      <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
        <span
          style={{
            fontFamily: 'Manrope',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--secondary)',
          }}
        >
          Est. {data.est_year}
        </span>
        <h1
          style={{
            fontFamily: 'Noto Serif',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          <span
            style={{
              display: 'block',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 600,
              color: 'var(--on-background)',
            }}
          >
            {data.hero_headline_line1}
          </span>
          <span
            style={{
              display: 'block',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--primary)',
            }}
          >
            {data.hero_headline_line2}
          </span>
        </h1>
        <p
          style={{
            fontFamily: 'Manrope',
            fontSize: '1rem',
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'var(--secondary)',
            maxWidth: '38ch',
          }}
        >
          {data.hero_subheading}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            marginTop: '0.5rem',
          }}
        >
          <button
            style={{
              background:
                'linear-gradient(135deg, var(--primary), var(--primary-dim))',
              color: 'var(--on-primary)',
              border: 'none',
              cursor: 'pointer',
              padding: '0.85rem 2rem',
              borderRadius: 'var(--radius-xl)',
              fontFamily: 'Manrope',
              fontWeight: 600,
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'opacity 300ms ease-out',
            }}
          >
            {data.hero_cta_primary_label}
          </button>
          <a
            href='#studio'
            style={{
              fontFamily: 'Manrope',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--on-background)',
              textDecoration: 'none',
            }}
          >
            {data.hero_cta_secondary_label} →
          </a>
        </div>
      </div>

      {/* Right: hero image placeholder */}
      <div
        style={{
          background: 'var(--surface-container)',
          borderRadius: 'var(--radius-xl)',
          aspectRatio: '4/5',
          overflow: 'hidden',
        }}
      />
    </section>
  );
}
