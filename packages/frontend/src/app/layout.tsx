import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/theme/ThemeProvider';
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
              display: 'flex',
              flexDirection: 'column',
              background: 'url(assets/images/mainBackground.svg) no-repeat center center fixed',
            }}
          >
            <Box sx={{ minHeight: "70vh" }}>
              {children}
            </Box>
            <Footer />

          </Box>

        </ThemeProvider>
      </body>
    </html>
  );
}