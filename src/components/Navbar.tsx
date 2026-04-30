import {useEffect, useState} from 'react';
import {useDirectus} from "../share/directus/core/use-directus.ts";
import type {NavLink} from "../share/directus/core/nav-link.ts";

export default function Navbar() {
  const [links, setLinks] = useState<NavLink[]>([]);
  const {getNavLinks} = useDirectus();


  useEffect(() => {
    getNavLinks().then(setLinks);
  }, [getNavLinks]);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 3rem',
        background: 'rgba(250,250,245,0.80)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <span
        style={{
          fontFamily: 'Noto Serif',
          fontSize: '0.95rem',
          color: 'var(--on-background)',
        }}
      >
        The Elevated Sanctuary
      </span>
      <ul style={{display: 'flex', gap: '2.5rem', listStyle: 'none'}}>
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              style={{
                fontFamily: 'Manrope',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--on-background)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <button
        style={{
          background:
            'linear-gradient(135deg, var(--primary), var(--primary-dim))',
          color: 'var(--on-primary)',
          border: 'none',
          cursor: 'pointer',
          padding: '0.65rem 1.5rem',
          borderRadius: 'var(--radius-xl)',
          fontFamily: 'Manrope',
          fontWeight: 600,
          fontSize: '0.875rem',
          transition: 'opacity 300ms ease-out',
        }}
      >
        Book Now
      </button>
    </nav>
  );
}
