import React from "react";
import { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, Pagination } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useNavigate } from 'react-router-dom';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import TopicIcon from '@mui/icons-material/Topic';

export default function FilmsPresentation() {
    const navigate = useNavigate();
    const [films, setFilms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const filmsPerPage = 9;

    const indexOfLastFilm = currentPage * filmsPerPage;
    const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
    const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleRedirect = (id) => {
        navigate(`/detail/${id}`);
    }

    useEffect(() => {
        async function fetchFilms() {
            const response = await fetch('https://653be1b9d5d6790f5ec7962f.mockapi.io/api/lab/films');
            const data = await response.json();
            setFilms(data);
        }

        fetchFilms();
    }, []);

    return (
        <>
            <Grid container spacing={5} sx={{ px: 15, pt: 15}}>
                {currentFilms.map(film => (
                    <Grid item xs={12} sm={6} md={4} key={film.id}>
                        <Card sx={{ height: '420px', color:'white', backgroundColor:'#949494' }}>
                            <CardMedia
                                component='img'
                                image={film.poster}
                                height='300'
                            />
                            <CardContent>
                                <Box display="flex" alignItems="center">
                                    <CallMissedOutgoingIcon xs={2} sx={{ margin: "0 20px" }} />
                                    <Grid xs='8'> 
                                        <Typography item xs='10'>{film.name}</Typography>
                                    </Grid>
                                    <DragHandleIcon 
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => handleRedirect(film.id)}
                                        xs={2}
                                    />
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <TopicIcon xs={2} sx={{margin: '20px'}}/>
                                    <Grid item xs={10}>
                                    <Typography item xs='10'>{film.category}</Typography>
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, pb:4 }}>
                <Pagination 
                    count={Math.ceil(films.length / filmsPerPage)}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="primary" 
                />
            </Box>
        </>
    );
}
