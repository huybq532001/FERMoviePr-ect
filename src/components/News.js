import React from "react";
import { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TopicIcon from '@mui/icons-material/Topic';
import BubbleChartIcon from '@mui/icons-material/BubbleChart'; 


export default function News() {
    const navigate = useNavigate();

    const handleRedirect = (id) => {
        navigate(`/detailnews/${id}`);
    }

    const [films, setFilms] = useState([]);
    useEffect(() => {
        async function fetchFilms() {
            const response = await fetch('https://653be1b9d5d6790f5ec7962f.mockapi.io/api/lab/news');
            const data = await response.json();
            setFilms(data);
        }
        fetchFilms();
    }, []);
    return (

        <Grid container spacing={5} sx={{ px: 15, pt: 15, pb:15 }}>
            {
                films.map(film => (
                    <Grid item xs={12} sm={6} md={4} key={film.id}>

                        <Card sx={{ height: '460px',color:'white', backgroundColor:'#949494' }}>
                            <CardMedia
                                component='img'
                                image={film.img}
                                height='300'
                            />

                            <CardContent>
                                <Box display="flex" alignItems="center">
                                    <Grid item xs={12}>
                                        <Box display="flex" alignItems="center">
                                            <TopicIcon xs={2} sx={{ margin: "10px 20px" }} />
                                            <Typography item xs='10'>{film.topic}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <BubbleChartIcon xs={2} sx={{ margin: "10px 20px" }} />
                                            <Typography item xs='10'>{film.name}</Typography>
                                        </Box>
                                    </Grid>

                                </Box>
                                <Grid item xs={12} align="right" >
                                    <Button sx={{color:'white', backgroundColor:'black'}} onClick={() => handleRedirect(film.id)}>Detail</Button>
                                </Grid>
                            </CardContent>
                        </Card>

                    </Grid>
                ))
            }
        </Grid>


    )
}

