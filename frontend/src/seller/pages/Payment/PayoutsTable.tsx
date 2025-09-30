import React from 'react';
import { Typography, Box } from '@mui/material';

const PayoutsTable = () => {
  return (
    <Box sx={{ p: 3, border: '1px dashed grey', borderRadius: 2 }}>
      <Typography variant="h6">Payout History</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        This feature is coming soon! You will be able to see a history of all money paid out to your bank account here.
      </Typography>
    </Box>
  );
};

export default PayoutsTable;