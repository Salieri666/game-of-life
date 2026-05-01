import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import AboutPage from '../../../features/about/AboutPage.tsx';
import ExplanationPage from '../../../features/explanation/ExplanationPage.tsx';
import styles from './Footer.module.scss'

const Footer = () => {
  const [openModal, setOpenModal] = useState<'about' | 'explanation' | null>(null);

  return (
    <>
      <Paper
        component="footer"
        elevation={0}
        className={styles.footer}
        sx={{
          width: '100%',
          borderTop: '1px solid var(--color-border-soft)',
          background: 'var(--gradient-footer)',
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            justifyContent="center"
          >
            <Button
              variant="contained"
              startIcon={<InfoOutlinedIcon />}
              onClick={() => setOpenModal('about')}
              sx={{
                borderRadius: 999,
                px: 2.25,
                bgcolor: 'var(--color-slate-900)',
                '&:hover': {
                  bgcolor: 'var(--color-slate-800)',
                },
              }}
            >
              About
            </Button>
            <Button
              variant="contained"
              startIcon={<MenuBookOutlinedIcon />}
              onClick={() => setOpenModal('explanation')}
              sx={{
                borderRadius: 999,
                px: 2.25,
                bgcolor: 'var(--color-slate-900)',
                '&:hover': {
                  bgcolor: 'var(--color-slate-800)',
                },
              }}
            >
              Explanation
            </Button>
          </Stack>
        </Box>
      </Paper>

      <Dialog
        open={openModal === 'about'}
        onClose={() => setOpenModal(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>About</DialogTitle>
        <DialogContent dividers>
          <AboutPage />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openModal === 'explanation'}
        onClose={() => setOpenModal(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Explanation</DialogTitle>
        <DialogContent dividers>
          <ExplanationPage />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;
