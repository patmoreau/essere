import React from 'react';

import type { FooterLink } from '../directus/core/footer-link-schema.ts';
import { useDirectus } from '../directus/core/use-directus';

const Footer = () => {
  const { getLabels, getFooterLinks } = useDirectus();
  const [labels, setLabels] = React.useState<Record<string, string>>({});
  const [links, setLinks] = React.useState<FooterLink[]>([]);

  React.useEffect(() => {
    Promise.all([getLabels(), getFooterLinks()]).then(([l, lnks]) => {
      setLabels(l);
      setLinks(lnks);
    });
  }, [getLabels, getFooterLinks]);

  const categories = Array.from(new Set(links.map(l => l.category)));

  return (
    <footer
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--on-background)',
        padding: '4rem 2rem 2rem 2rem',
        fontFamily: 'var(--font-functional)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: '1.5rem',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            {labels['footer_brand_title'] || 'The Elevated Sanctuary'}
          </h3>
          <p
            style={{
              color: 'var(--on-surface-variant)',
              lineHeight: '1.6',
              marginBottom: '2rem',
            }}
          >
            {labels['footer_tagline'] || 'A mindful space for grounding and growth.'}
          </p>
        </div>

        {categories.map(category => (
          <div key={category}>
            <h4
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '1.1rem',
                marginBottom: '1.5rem',
                color: 'var(--on-background)',
              }}
            >
              {labels[`footer_cat_${category.toLowerCase()}`] || category}
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {links
                .filter(l => l.category === category)
                .map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      style={{
                        color: 'var(--on-surface-variant)',
                        textDecoration: 'none',
                        transition: 'all 300ms ease-out',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                      onMouseLeave={e =>
                        (e.currentTarget.style.color = 'var(--on-surface-variant)')
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--outline-variant)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.875rem',
          color: 'var(--on-surface-variant)',
        }}
      >
        <span>
          © {new Date().getFullYear()} {labels['footer_copyright'] || 'The Elevated Sanctuary'}
        </span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
            {labels['footer_privacy'] || 'Privacy'}
          </a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
            {labels['footer_terms'] || 'Terms'}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
