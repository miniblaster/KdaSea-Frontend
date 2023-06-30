import React from 'react'
import { 
    Avatar, 
    Button, 
    Card, 
    Divider, 
    CardHeader, 
    Stack, 
    Box, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Typography 
} from '@mui/material';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import { Icon } from '@iconify/react';

const TrendingNFTsData = [
    {
        avatar: 'https://i.seadn.io/gae/s4Td3KYsUlCblO6lQKAGAWdKwsCuumcxYpebM_YL-Pex-BP886JYAWjKBLeB5StNopAAD6kVx3QHqWm9AmudXyCaCZszHbt8SdteEQ?auto=format&dpr=1&w=256',
        collectionName: 'Lil Pudgys',
        floorPrice: '0.38',
        volumn: '1.5'
    },
    {
        avatar: 'https://i.seadn.io/gae/a_frplnavZA9g4vN3SexO5rrtaBX_cBTaJYcgrPtwQIqPhzgzUendQxiwUdr51CGPE2QyPEa1DHnkW1wLrHAv5DgfC3BP-CWpFq6BA?auto=format&dpr=1&w=256',
        collectionName: 'Milady Maker',
        floorPrice: '3.40',
        volumn: '7.5'
    },{
        avatar: 'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&dpr=1&w=256',
        collectionName: 'Azuki',
        floorPrice: '15.45',
        volumn: '14.9'
    },{
        avatar: 'https://i.seadn.io/gae/_R4fuC4QGYd14-KwX2bD1wf-AWjDF2VMabfqWFJhIgiN2FnAUpnD5PLdJORrhQ8gly7KcjhQZZpuzYVPF7CDSzsqmDh97z84j2On?auto=format&dpr=1&w=256',
        collectionName: 'BEANZ Official',
        floorPrice: '1.28',
        volumn: '45.5'
    },{
        avatar: 'https://i.seadn.io/gcs/files/68d93e599578e31eb8eb433bfa1b0fbd.png?auto=format&dpr=1&w=256',
        collectionName: 'BoringPunks',
        floorPrice: '0.06',
        volumn: '1.9'
    },
]

export default function Trending() {
    return (
        <>
            <Card>
                <TableContainer sx={{ minWidth: 720 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f4f6f8' }} >
                                <TableCell sx={{ minWidth: 100, fontWeight: 700, fontSize: 18 }}>Rank</TableCell>
                                <TableCell sx={{ minWidth: 300, fontWeight: 700, fontSize: 18 }}>Collection</TableCell>
                                <TableCell sx={{ minWidth: 160, fontWeight: 700, fontSize: 18 }}>Floor Price</TableCell>
                                <TableCell sx={{ minWidth: 160, fontWeight: 700, fontSize: 18 }}>Volumn</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {TrendingNFTsData.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <Typography sx={{ fontWeight: 700 }} >{index+1}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Avatar alt={row.collectionName} src={row.avatar} />
                                            <Typography variant='subtitle2' sx={{ fontWeight: 600 }} >{row.collectionName}</Typography>
                                        </Stack>
                                    </TableCell>

                                    <TableCell>
                                        <Typography sx={{ fontWeight: 700 }} >{row.floorPrice} ETH</Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography sx={{ fontWeight: 700 }} >{row.volumn} ETH</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Divider />

                <Box sx={{ p: 2, textAlign: 'right' }}>
                <Button
                    to="#"
                    size="small"
                    color="inherit"
                    endIcon={<Icon icon={arrowIosForwardFill} />}
                    sx={{ fontSize: 14, fontWeight: 700 }}
                >
                    View All
                </Button>
                </Box>
            </Card>
        </>
    )
}