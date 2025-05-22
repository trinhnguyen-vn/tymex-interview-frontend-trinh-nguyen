import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Box } from '@mui/material';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navbar />
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              pb: 10,
              background: 'url(assets/images/mainBackground.svg) no-repeat center center fixed',
            }}
          >
            {children}
          </Box>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}