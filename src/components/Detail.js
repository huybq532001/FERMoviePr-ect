import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent, Grid, CardMedia, Box, Modal, Button } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import DescriptionIcon from '@mui/icons-material/Description';
import GradeIcon from '@mui/icons-material/Grade';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Youtube from './Youtube';
import CloseIcon from '@mui/icons-material/Close';
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Person4Icon from '@mui/icons-material/Person4';
import Groups3Icon from '@mui/icons-material/Groups3';

export default function Detail() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    async function fetchFilmDetails() {
      try {
        const response = await fetch(`https://653be1b9d5d6790f5ec7962f.mockapi.io/api/lab/films/${id}`);
        const data = await response.json();
        setFilm(data);
        setVideoUrl(data.clip);
      } catch (error) {
        console.error("Error fetching film details: ", error);
      }
    }

    fetchFilmDetails();
  }, [id]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  if (!film) {
    return <div>Loading...</div>;
  }

  return (

    <Card sx={{ px: 30, pt: 15, pb: 10, backgroundColor:'#988899' }}>

      <Grid><Typography fontSize={80}>DETAIL</Typography></Grid>,
      <Grid sx={{ position: 'relative' }}>
        <CardMedia component="img" image={film.poster} alt={film.name} />

        <YouTubeIcon onClick={handleOpen}
          sx={{
            color: "red",
            border: "1px solid red",
            borderRadius: '50%',
            height: "50px",
            width: '50px',
            position: "absolute",
            top: '96%',
            right: '50px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }} />
      </Grid>

      <CardContent sx={{backgroundColor: 'white'}}>
        <Box display="flex" alignItems="center">
          <BadgeIcon />
          <Grid item xs={10}>
            <Typography item xs='1' variant='h4' sx={{ px: 3 }}>Name: {film.name}</Typography>
          </Grid>
        </Box>
        <Box display="flex" alignItems="center">
          <CategoryIcon />
          <Grid item xs={10}>
            <Typography item xs='1' variant='body 2' sx={{ px: 3 }}>Category: {film.category}</Typography>
          </Grid>
        </Box>
        <Box display="flex" alignItems="center">
          <LocationOnIcon />
          <Grid item xs={10}>
            <Typography item xs='1' variant='body 2' sx={{ px: 3 }}>Nation: {film.nation}</Typography>
          </Grid>
        </Box>
        <Box display="flex" alignItems="center">
          <Person4Icon />
          <Grid item xs={10}>
            <Typography item xs='1' variant='body 2' sx={{ px: 3 }}>Director: {film.director}</Typography>
          </Grid>
        </Box>
        <Box display="flex" alignItems="center">
          <Groups3Icon />
          <Grid item xs={10}>
            <Typography item xs='1' variant='body 2' sx={{ px: 3 }}>Performer: {film.performer}</Typography>
          </Grid>
        </Box>
        <Box display="flex" alignItems="center">
          <GradeIcon />
          <Grid item xs={10}>
            <Typography item xs='1' variant='body 2' sx={{ px: 3 }}>Đánh giá: {film.IMDb}</Typography>
          </Grid>
        </Box>
        <Box display="flex" alignItems="center">
          <DescriptionIcon sx={{padding:'0 20px 0 0'}}/>
          <Grid item xs={10}>
            <Typography item xs='1' variant='body 1' sx={{ textAlign: 'justify', px: 3 }} >Intro: {film.intro}</Typography>
          </Grid>
        </Box>

      </CardContent>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
            maxWidth: '80%',
            maxHeight: '80%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Youtube  videoUrl={videoUrl}/>

          <Button
            sx={{
              position: 'absolute',
              top: '5px',
              right: '5px',
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>
        </Box>
      </Modal>


    </Card>
  );
}
