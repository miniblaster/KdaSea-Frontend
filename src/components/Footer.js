import { Typography } from '@mui/material';
import { Container, Stack, Box } from '@mui/system';
import React from 'react';

const Footer = () => {

    return (
        <Stack sx={{ backgroundColor: 'rgb(24, 104, 183)' }} >
            <Container>
                <Stack sx={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }} >
                    <Box sx={{ width: '45%' }}>
                        <Typography
                            sx={{ fontSize: 22, fontWeight: 700, color: 'white', pt: 5 }}
                        > 
                            Stay in the loop 
                        </Typography>
                        <Typography
                            sx={{ color: 'white', py: 2, fontSize: 18 }}
                        >
                            Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating Kadena.
                        </Typography>
                    </Box>
                    <Box sx={{ width: '45%' }} >
                        <Typography
                            sx={{ fontSize: 22, fontWeight: 700, color: 'white' }}
                        > 
                            Join the community 
                        </Typography>
                    </Box>
                </Stack>
            </Container>
        </Stack>
    );
}

export default Footer;
