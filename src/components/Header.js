import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { Popover } from '@mui/material';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import HdIcon from '@mui/icons-material/Hd';

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [accountAnchor, setAccountAnchor] = useState(null);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    

    const handleClose = () => {
        setAnchorEl(null);
    };


    

    const open = Boolean(anchorEl);

    return (
        <AppBar sx={{ backgroundColor: '#33FFFF', color:"#d013d6", p:2 }}>
            <Toolbar>
                <IconButton sx={{ color: '#d013d6' }}
                    onMouseEnter={handleClick}
                    // onMouseLeave={handleClose}
                >
                    <MenuIcon sx={{color:'#d013d6'}}/>
                </IconButton>

                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    onMouseLeave={handleClose}
                    // sx={{backgroundColor:'#988899'}}

                >
                    <Button color="inherit" component={Link} to="/">Home</Button><br />
                    <Button color="inherit" component={Link} to="/news">News</Button><br />
                    <Button color="inherit" component={Link} to="/about">About</Button><br />
                    <Button color="inherit" component={Link} to="/contact">Contact</Button><br />
                    <Button color="inherit" component={Link} to="/list">FilmsList</Button><br />
                    <Button color="inherit" component={Link} to="/listnews">NewsList</Button><br />
                </Popover>
                
                <Typography  variant="h3" fontWeight='bold' fontStyle={'italic'} sx={{ flexGrow: 1, textAlign: 'center'}}>
                <HdIcon sx={{color:'#d013d6'}} fontSize='1'/> OLD FILMS
                </Typography>

                <IconButton sx={{ color: 'inherit' }}
                    onClick={(e) => setAccountAnchor(e.currentTarget)}
                >
                    <PersonIcon />
                </IconButton>

                <Popover
                    open={Boolean(accountAnchor)}
                    anchorEl={accountAnchor}
                    onClose={() => setAccountAnchor(null)}
                >
                    <Button color="inherit" component={Link} to="/login">Login</Button><br />
                    <Button color="inherit" component={Link} to="#">SignIn</Button><br />
                </Popover>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
