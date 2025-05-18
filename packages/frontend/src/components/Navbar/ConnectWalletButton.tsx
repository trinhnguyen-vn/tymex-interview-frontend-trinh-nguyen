'use client';
import React, { FC } from 'react';
import {
    Button,
} from '@mui/material';

const ConnectWalletButton: FC<{ handleConnectWallet: () => void }> = ({ handleConnectWallet }) => {
    return <Button
        variant="contained"
        onClick={handleConnectWallet}
    >
        Connect Wallet
    </Button>
}

export default ConnectWalletButton;
