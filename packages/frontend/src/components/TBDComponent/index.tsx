import { Typography } from "@mui/material";
import { FC } from "react";

const TBDComponent: FC = () => {
    return (
        <>
            <Typography variant="h1" sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'center', marginTop: '100px' }}>
                Hello there, this page is under construction!!
            </Typography>
            <Typography variant="h2" sx={{ color: 'primary.main', textAlign: 'center', marginTop: '20px' }}>
                Please check back later.
            </Typography>
        </>
    )
};

export default TBDComponent;