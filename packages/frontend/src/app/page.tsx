import { Button, Container, Typography, Box } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Box sx={{ my: 4, height: 1000 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Tymex
        </Typography>
        <Button variant="contained" color="primary">
          Click Me
        </Button>
      </Box>
    </Container>
  );
}