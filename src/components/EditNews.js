import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Grid, Snackbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditNews = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [newsData, setNewsData] = useState({
        name: '',
        img: '',
        topic: '',
        content: '',
    });

    useEffect(() => {
        fetch(`https://653be1b9d5d6790f5ec7962f.mockapi.io/api/lab/news/${id}`)
            .then(response => response.json())
            .then(data => setNewsData(data))
            .catch(error => console.error('Error fetching news:', error));
    }, [id]);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewsData({ ...newsData, [name]: value });
    };

    const handleEdit = () => {
        if (
            Object.values(newsData).some(field => field.trim() === '') ||
            Object.keys(newsData).some(field => !newsData[field])
          ) {
            setSnackbarMessage('Edit Fail');
            setSnackbarOpen(true);
            return;
          }

        fetch(`https://653be1b9d5d6790f5ec7962f.mockapi.io/api/lab/news/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newsData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to edit news');
                }
                return response.json();
            })
            .then(updatedNewsData => {
                setSnackbarMessage('Edit Success');
                setSnackbarOpen(true);
                navigate('/listnews')
            })
            .catch(error => {
                setSnackbarMessage('Edit Failed');
                setSnackbarOpen(true);
                navigate('/listnews')
            });
    };

    return (
        <Grid container spacing={2} sx={{ px: 15, pt: 15, pb:26, backgroundColor:'white'}}>
            <Grid><Typography fontSize={50}>Edit News</Typography></Grid>
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
            <Grid item xs={12} >
                <Button variant="contained" color="primary" onClick={handleEdit}>
                    Edit News
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

export default EditNews;
