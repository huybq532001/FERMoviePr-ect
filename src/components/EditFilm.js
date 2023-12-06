import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Grid, Snackbar,Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditFilm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [filmData, setFilmData] = useState({
        name: '',
        poster: '',
        IMDb: '',
        category: '',
        nation: '',
        director: '',
        performer: '',
        intro: '',
        clip: '',
    });

    useEffect(() => {
        fetch(`https://653be1b9d5d6790f5ec7962f.mockapi.io/api/lab/films/${id}`)
            .then(response => response.json())
            .then(data => setFilmData(data))
            .catch(error => console.error('Error fetching film:', error));
    }, [id]);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilmData({ ...filmData, [name]: value });
    };

    const handleEdit = () => {
        if (
          Object.values(filmData).some(field => field.trim() === '') ||
          Object.keys(filmData).some(field => !filmData[field])
        ) {
          alert('Please fill in all fields.'); // Using window.alert here
          return;
        }
      
        fetch(`https://653be1b9d5d6790f5ec7962f.mockapi.io/api/lab/films/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(filmData),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to edit film');
            }
            return response.json();
          })
          .then(() => {
            alert('Film edited successfully.'); 
            navigate('/list'); 
          })
          .catch(error => {
            alert('Failed to edit the film.'); 
          });
      };
      

    return (
        <Grid container spacing={2} sx={{ px: 15, pt: 15,pb:10, backgroundColor:'white' }}>
            <Grid><Typography fontSize={50}>DeleteFilm</Typography></Grid>
            <Grid item xs={12} >
                <TextField
                    
                    name="name"
                    label="Name"
                    value={filmData.name}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="poster"
                    label="Poster"
                    value={filmData.poster}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="IMDb"
                    label="IMDb"
                    value={filmData.IMDb}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="category"
                    label="category"
                    value={filmData.category}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="nation"
                    label="nation"
                    value={filmData.nation}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="director"
                    label="director"
                    value={filmData.director}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="performer"
                    label="performer"
                    value={filmData.performer}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="intro"
                    label="intro"
                    value={filmData.intro}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="clip"
                    label="clip"
                    value={filmData.clip}
                    onChange={handleChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} >
                <Button variant="contained" color="primary" onClick={handleEdit}>
                    Edit Film
                </Button>
            </Grid>
            <Snackbar
                open={snackbarOpen}
                message={snackbarMessage}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
            />
        </Grid>
    );
};

export default EditFilm;
