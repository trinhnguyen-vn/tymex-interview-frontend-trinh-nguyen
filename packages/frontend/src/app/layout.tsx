import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { Box, Skeleton } from '@mui/material';
import { Suspense } from 'react';

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
              <Suspense fallback={<Skeleton />}>
                {children}
              </Suspense>
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}