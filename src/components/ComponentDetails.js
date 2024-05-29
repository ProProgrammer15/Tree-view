import React from 'react';
import { Typography, Box, Grid, Divider, Card, CardContent } from '@mui/material';
import WifiIcon from "../assets/wifi_tethering.png"
import MdOutlineRouter from "../assets/MdOutlineRouter.png"
import InboxImage from "../assets/Inbox.png"

const ComponentDetails = ({ component }) => {
    if (!component) return null;

    return (
        <Grid item xs={12} sm={8} md={8} lg={8} sx={{ border: '1px solid lightgrey', height: '81vh', overflowY: 'auto' }}>
            <Box sx={{ padding: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{component.name}</Typography>
                <Divider sx={{ borderColor: 'lightgrey', my: 2 }} />

                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={12} md={5}>
                        <Card sx={{
                            borderColor: '#1E90FF',
                            borderWidth: 2,
                            borderStyle: 'dotted',
                            backgroundColor: 'transparent',
                            height: 250
                        }}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", mt: 8 }}>
                                <img src={InboxImage} alt="Image" style={{ width: '10%', objectFit: 'cover' }} />
                                <div style={{ textAlign: 'center', color: "#1E90FF" }}>Add Asset Image.</div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ my: 3 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Sensor Type</Typography>
                            <Typography variant="body1" sx={{ color: 'grey' }}>{component.sensorType}</Typography>
                            <Divider sx={{ borderColor: 'lightgrey', my: 2 }} />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Status</Typography>
                            <Typography variant="body1" sx={{ color: 'grey' }}>{component.status}</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Divider sx={{ borderColor: 'lightgrey', m: 2 }} />
                <Box sx={{ px: 2, display: "flex" }}>
                    <Box>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Sensor</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <img src={WifiIcon} />
                            <Typography variant="body1" sx={{ color: 'grey' }}>{component.sensorId}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ px: 45 }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Gateway</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <img src={MdOutlineRouter} />
                            <Typography variant="body1" sx={{ color: 'grey' }}>{component.gatewayId}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default ComponentDetails;
