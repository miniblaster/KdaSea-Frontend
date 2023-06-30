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

const TopNFTsData = [
    {
        avatar: 'https://i.seadn.io/gcs/files/d2625a77b485bad7b6fffcd65af3c461.png?auto=format&dpr=1&h=500',
        collectionName: 'BoringPunks',
        floorPrice: '0.06',
        volumn: '47'
    },
    {
        avatar: 'https://i.seadn.io/gcs/files/50182b51b061766036ee3912a6117873.png?auto=format&dpr=1&h=500',
        collectionName: 'Momoguro: Holoself',
        floorPrice: '0.02',
        volumn: '1'
    },{
        avatar: 'https://i.seadn.io/s/production/dad50fcb-455d-42d9-af33-94b41cf21c7a.png?w=500&auto=format',
        collectionName: 'I Live Here Now',
        floorPrice: '1.75',
        volumn: '78'
    },{
        avatar: 'https://i.seadn.io/s/production/dba15a19-5a3b-4c7e-b93c-3b4f21d348b6.png?w=500&auto=format',
        collectionName: 'Shakti Gomez Editions',
        floorPrice: '0.05',
        volumn: '0.03'
    },{
        avatar: 'https://i.seadn.io/s/production/6693ad5c-3880-4e87-987a-ac3d62fa1e39.png?w=500&auto=format',
        collectionName: 'ClownVamp Editions',
        floorPrice: '0.05',
        volumn: '15'
    },
]

export default function Top() {
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
                            {TopNFTsData.map((row, index) => (
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