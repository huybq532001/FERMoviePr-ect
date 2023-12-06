import React from "react";
import { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function FilmsList() {
    const [films, setFilms] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchFilms() {
            const response = await fetch('https://653be1b9d5d6790f5ec7962f.mockapi.io/api/lab/films');
            const data = await response.json();
            setFilms(data);
        }

        fetchFilms();
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);

    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://653be1b9d5d6790f5ec7962f.mockapi.io/api/lab/films/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Delete success');
            
                setFilms(prevFilms => prevFilms.filter(film => film.id !== id));
            } else {
                console.log('Failed to delete film');
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <Grid container spacing={5} sx={{ px: 15, pt: 17 }}>
            <Grid><Typography sx={{ fontSize: '50px' }}>FILMS</Typography></Grid>
            <Table>
                <TableHead sx={{ backgroundColor: '#0dc7db' }}>
                    <TableRow >
                        <TableCell align="center" sx={{ color: 'white' }}>ID</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Name</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ background: '#eacaed' }}>
                    {films.map(film => (
                        <TableRow key={film.id}>
                            <TableCell>{film.id}</TableCell>
                            <TableCell>{film.name}</TableCell>

                            <TableCell align="right">
                                <Button onClick={() => handleEdit(film.id)}>Edit</Button>
                                <Button onClick={() => handleDelete(film.id)}>Delete</Button>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Grid item xs={12} container justifyContent="center" sx={{ pb: 5 }}>
                <Button sx={{ backgroundColor: '#0dc7db' }} variant="contained" onClick={() => navigate('/add')}>
                    Add New Film
                </Button>
            </Grid>
        </Grid>
    )
}
export default FilmsList;