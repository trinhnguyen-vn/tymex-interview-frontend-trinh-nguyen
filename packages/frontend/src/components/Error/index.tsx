import { Alert, AlertTitle, Box, Button } from "@mui/material";
import { JSX } from "react";

type TypeErrorProps = {
    errorMessage?: string;
    retryAction?: () => void;
    reTryText?: string;
}

const Error = ({ errorMessage = "Something went wrong, please retry", retryAction, reTryText = "Retry" }: TypeErrorProps): JSX.Element => {

    return (
        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Alert severity="error" sx={{ mb: 2, fontSize: '1.5rem', padding: 2 }}>
                <AlertTitle sx={{ fontSize: '1.5rem' }}>Error</AlertTitle>
                {errorMessage}
                <Box sx={{ display: 'block', textAlign: 'center', my: 2 }}>
                    {retryAction && <Button variant="contained" sx={{ px: 3, py: 1 }} onClick={() => retryAction()}>
                        {reTryText}
                    </Button>}</Box>
            </Alert>

        </Box>
    );
}

export default Error