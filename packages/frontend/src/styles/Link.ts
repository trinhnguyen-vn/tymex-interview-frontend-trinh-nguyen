import { styled } from "@mui/material";
import Link from "next/link";
import { Theme } from "@mui/material/styles";

export const StyledLink = styled(Link)(({ theme }: { theme: Theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
        fontWeight: 'bold',
    },
}));
