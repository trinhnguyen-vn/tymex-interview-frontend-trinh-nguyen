import React from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Avatar,
    IconButton,
    Chip,
    Badge,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import { ONLINE_STATUSES, PRODUCT_CATEGORIES_COLORS, STATUS_COLORS } from '@/constants/products';
import Image from 'next/image';

type Author = {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    avatar: string;
    onlineStatus: string;
};

type ProductCardProps = {
    title: string;
    category: string;
    price: number;
    isFavorite: boolean;
    createdAt: number;
    theme: string;
    tier: string;
    imageId: number;
    author: Author;
};

const SmallStatusIcon = styled('div')(({ status }: { status: typeof ONLINE_STATUSES[number] }) => ({
    width: 12,
    height: 12,
    borderRadius: '50%',
    background: STATUS_COLORS[status],
}));

export default function ProductCard({
    title,
    category,
    price,
    isFavorite,
    imageId,
    author,
}: ProductCardProps) {
    return (
        <Card
            data-testid="product-card"
            sx={{
                borderRadius: 4,
                background: '#232336',
                color: '#fff',
                boxShadow: '0 4px 32px rgba(0,0,0,0.3)',
                maxWidth: 320,
                p: 0,
                overflow: 'visible',
            }}
        >
            <Box sx={{ position: 'relative', p: 1, pb: 0 }}>
                <Chip
                    label={category}
                    sx={{
                        position: 'absolute',
                        top: 20,
                        left: 20,
                        color: '#fff',
                        borderRadius: 2,
                        fontWeight: 600,
                        background: '#313B4580',
                        px: 0.25,
                    }}
                />
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 15,
                        right: 15,
                        color: '#fff',
                        '&:hover': { background: 'rgba(0,0,0,0.25)' },
                    }}
                >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <CardMedia
                    component="img"
                    image={`https://robohash.org/${imageId}.png?size=400x400&set=set1`}
                    alt={title}
                    sx={{
                        borderRadius: 2,
                        background: PRODUCT_CATEGORIES_COLORS[category],
                        objectFit: 'cover',
                        height: 220,
                        width: 220,
                    }}
                    loading='lazy'
                ></CardMedia>
            </Box>
            <CardContent sx={{ pt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, minHeight: 50 }}>
                    <Typography variant='body2'>
                        {title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Image src="/assets/icons/logosEthereum.png" alt="Ethereum" width='6' height='12' loading='lazy' />
                        <Typography variant='body2'>
                            {price.toFixed(2)} ETH
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <SmallStatusIcon status={author.onlineStatus} />
                        }
                    >
                        <Avatar src={author.avatar} alt={author.firstName} sx={{ width: 36, height: 36, border: '0.5px solid white', background: '#fff' }} />
                    </Badge>
                    <Box>
                        <Typography variant='body2' sx={{ fontWeight: 400 }}>
                            {author.firstName}_{author.lastName}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}