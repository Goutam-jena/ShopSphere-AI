import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSearchParams } from 'react-router-dom';

// Assuming you have these data files in /data/Filter/
import { colors } from '../../../data/Filter/color'; 
import { price } from '../../../data/Filter/price';
import { discount } from '../../../data/Filter/discount';

const FilterSection = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilter = (sectionId: string, value: string) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set(sectionId, value);
        setSearchParams(newParams);
    };

    return (
        <Box className='sticky top-5'>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography>Color</Typography></AccordionSummary>
                <AccordionDetails>
                    <RadioGroup onChange={(e) => handleFilter('color', e.target.value)}>
                        {colors.map((color) => (
                            <FormControlLabel key={color.name} value={color.name.toLowerCase()} control={<Radio />} label={color.name} />
                        ))}
                    </RadioGroup>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography>Price</Typography></AccordionSummary>
                <AccordionDetails>
                    <RadioGroup onChange={(e) => handleFilter('price', e.target.value)}>
                        {price.map((item) => (
                            <FormControlLabel key={item.name} value={item.value} control={<Radio />} label={item.name} />
                        ))}
                    </RadioGroup>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography>Discount</Typography></AccordionSummary>
                <AccordionDetails>
                    <RadioGroup onChange={(e) => handleFilter('discount', e.target.value)}>
                        {discount.map((item) => (
                            <FormControlLabel key={item.name} value={item.value.toString()} control={<Radio />} label={item.name} />
                        ))}
                    </RadioGroup>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default FilterSection;