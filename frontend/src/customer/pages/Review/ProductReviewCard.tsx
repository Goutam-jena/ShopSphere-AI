import { Avatar, Box, Grid, Rating } from '@mui/material';
import React from 'react';
import { Review } from '../../../types/reviewTypes';

const ProductReviewCard = ({ item }: { item: Review }) => {
    return (
        <div>
            <Grid container spacing={2} gap={3}>
                <Grid item xs={1}>
                    <Box>
                        <Avatar className='text-white' sx={{ width: 56, height: 56, bgcolor: "#9155fd" }}>
                            {item.user.fullName[0].toUpperCase()}
                        </Avatar>
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <div className='space-y-2'>
                        <div>
                            <p className='font-semibold text-lg'>{item.user.fullName}</p>
                            <p className='opacity-70'>{new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <Rating value={item.rating} name='half-rating' readOnly precision={0.5} />
                    <p>{item.reviewText}</p>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProductReviewCard;