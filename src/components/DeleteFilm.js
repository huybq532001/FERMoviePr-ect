import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const DeleteFilm = () => {
  const [filmId, setFilmId] = useState('');

  const handleChange = (e) => {
    setFilmId(e.target.value);
  };

  const handleDelete = () => {
    fetch(`https://653be1b9d5d6790f5ec7962f.mockapi.io/api/lab/films/${filmId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete film');
        }
        console.log('Film deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting film:', error);
      });
  };

  return (
    <Grid container spacing={2} sx={{ px: 15, pt: 15 }}>
      <Grid item xs={12}>
        <TextField
          label="Film ID to delete"
          value={filmId}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete Film
        </Button>
      </Grid>
    </Grid>
  );
};

export default DeleteFilm;
