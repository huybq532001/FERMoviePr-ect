import React from "react";
import { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NewsList() {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchNews() {
            const response = await fetch('https://653be1b9d5d6790f5ec7962f.mockapi.io/api/lab/news');
            const data = await response.json();
            setNews(data);
        }

        fetchNews();
    }, []);

    const handleEdit = (id) => {
        navigate(`/editnews/${id}`);

    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://653be1b9d5d6790f5ec7962f.mockapi.io/api/lab/news/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setNews(prevNews => prevNews.filter(news => news.id !== id));
            } else {
                console.log('Failed to delete film');
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <Grid container spacing={5} sx={{ px: 15, pt: 17 }}>
            <Grid><Typography sx={{ fontSize: '50px' }}>News</Typography></Grid>
            <Table>
                <TableHead sx={{ backgroundColor: '#0dc7db' }}>
                    <TableRow >
                        <TableCell align="center" sx={{ color: 'white' }}>ID</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Name</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{background:'#eacaed'}}>
                    {news.map( news=> (
                        <TableRow key={news.id}>
                            <TableCell>{news.id}</TableCell>
                            <TableCell>{news.name}</TableCell>

                            <TableCell align="right">
                                <Button onClick={() => handleEdit(news.id)}>Edit</Button>
                                <Button onClick={() => handleDelete(news.id)}>Delete</Button>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Grid item xs={12} container justifyContent="center" sx={{pb:5}}>
                <Button sx={{backgroundColor:'#0dc7db'}} variant="contained"  onClick={() => navigate('/addnews')}>
                    Add News
                </Button>
            </Grid>
        </Grid>
    )
}
export default NewsList;