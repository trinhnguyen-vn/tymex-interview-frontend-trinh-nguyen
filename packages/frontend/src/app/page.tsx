import { Box, Container } from '@mui/material';
import { getAllProducts } from '@/api/products';
import ListProducts from '@/components/Products';
import '@/styles/global.css';

export default async function Home() {

  const initialProductsData = await getAllProducts({ page: 1, limit: 20 })

  return (
    <>
      <Box sx={{ background: 'url(/assets/images/banner.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: { xs: '200px', md: '600px' }, mt: 10 }}></Box>
      <Container maxWidth="xl">
        <ListProducts initialProductsData={initialProductsData} />
      </Container>
    </>
  );
};
