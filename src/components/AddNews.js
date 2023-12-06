import React, { useState } from 'react';
import { TextField, Button, Grid, Snackbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddNews = () => {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState({
    name: '',
    img: '',
    topic: '',
    content: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsData({ ...newsData, [name]: value });
  };

  const resetForm = () => {
    setNewsData({
      name: '',
      img: '',
      topic: '',
      content: '',
    });
  };

  const handleSubmit = () => {
    if (
      Object.values(newsData).some(field => field.trim() === '') ||
      Object.keys(newsData).some(field => !newsData[field])
    ) {
      setSnackbarMessage('Add Fail');
      setSnackbarOpen(true);
      return;
    }

    fetch('https://653be1b9d5d6790f5ec7962f.mockapi.io/api/lab/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newsData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add news');
        }
        return response.json();
      })
      .then(data => {
        console.log('News added:', data);
        setSnackbarMessage('Add Success');
        setSnackbarOpen(true);
        resetForm();
        navigate('/listnews')
      })
      .catch(error => {
        console.error('Error adding news:', error);
        setSnackbarMessage('Add Fail');
        setSnackbarOpen(true);
        navigate('/listnews')
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Grid container spacing={2} sx={{ px: 15, pt: 15, pb:25, backgroundColor:'white' }}>
      <Grid item xs={12}>
        <Typography fontSize={50}>Add News</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="name"
          label="Name"
          value={newsData.name}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="img"
          label="img"
          value={newsData.img}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="topic"
          label="topic"
          value={newsData.topic}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="content"
          label="content"
          value={newsData.content}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add News
        </Button>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Grid>
  );
};

export default AddNews;
