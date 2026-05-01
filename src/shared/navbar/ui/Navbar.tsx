import {AppBar, Box, Button, Link, Toolbar, Typography} from '@mui/material'
import {useNavLinks} from '../core/use-nav-links.ts'
import {useLabels} from '../../directus/core/use-labels.ts'

export default function Navbar() {
  const labels = useLabels()
  const links = useNavLinks()

  return (
      <AppBar
        position="fixed"
        elevation={0}
        color="transparent"
        sx={{
          background: 'rgba(250,250,245,0.80)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <Toolbar sx={{justifyContent: 'space-between', px: {xs: 2, md: 6}, py: 2.5}}>
          <Typography
            variant="subtitle1"
            sx={{fontFamily: 'Noto Serif, serif', color: 'text.primary'}}
          >
            {labels['nav.title']}
          </Typography>

          <Box component="nav" sx={{display: 'flex', gap: 5}}>
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                underline="none"
                color="text.primary"
                sx={{fontSize: '0.875rem', fontWeight: 500, '&:hover': {opacity: 0.72}}}
              >
                {link.label}
              </Link>
            ))}
          </Box>

          <Button
            variant="contained"
            sx={{
              px: 3,
              py: 1.1,
              color: 'primary.contrastText',
              background: 'linear-gradient(135deg, #4c644b, #405840)',
              boxShadow: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #4c644b, #405840)',
                opacity: 0.92,
                boxShadow: 'none',
              },
            }}
          >
            Book Now
          </Button>
        </Toolbar>
      </AppBar>
  )
}
