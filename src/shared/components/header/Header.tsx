import GamepadRoundedIcon from '@mui/icons-material/GamepadRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from './Header.module.scss'

type HeaderProps = {
  isSimulationRunning: boolean
}

const Header = ({ isSimulationRunning }: HeaderProps) => {

  return (
    <AppBar
      position="static"
      elevation={0}
      className={styles.header}
      sx={{
        background: 'var(--color-cyan-900)',
        borderBottom: '1px solid var(--color-border-muted)',
      }}
    >
      <Toolbar
        sx={{
          minHeight: 88,
          px: { xs: 2, md: 4 },
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 3,
              display: 'grid',
              placeItems: 'center',
              background: 'var(--color-green-500)',
              color: 'var(--color-white)',
            }}
          >
            <GamepadRoundedIcon />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={800} letterSpacing={0.2}>
              Conway's Game of Life
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--color-text-on-dark)' }}>
              Cellular automata playground
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <Chip
            label='Simulation'
            size="small"
            sx={{
              color: 'var(--color-slate-200)',
              bgcolor: isSimulationRunning ? 'var(--color-green-500)' : 'var(--color-surface-muted)',
              border: isSimulationRunning
                ? '1px solid var(--color-green-500)'
                : '1px solid var(--color-border-muted)'
            }}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
