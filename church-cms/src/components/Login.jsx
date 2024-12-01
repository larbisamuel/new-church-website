import React,{useState} from 'react'
import { InputAdornment, Typography, Grid, Paper, Avatar, TextField, Link } from '@material-ui/core'
import presby from '../images/presby.png'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https:presby.com/">
        PCG
      </Link>{' '}
      {new Date().getFullYear()}
            {'.'}
            {} All rights reserved.
    </Typography>
    );
}
const btnStyle={margin: '55px 0 10px'}
const paperStyle = { padding: 60, height: '85vh', width: 550, margin: "40px auto", borderRadius: "15px"  }
const avatarStyle = { width: '100px', height: '100px' }
const imageStyle = { width: '100%', height: '90%', objectFit: 'cover' }

const Login = () => {
    const navigate = useNavigate();

    const [staff_id, setStaffId] = useState('');
    const [password, setPassword] = useState ('');
  const [showStaffId, setShowStaffId] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

    
    
  const handleStaffIdChange = (e) => {
    setStaffId(e.target.value);
  };

    
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };



    const handleSignIn = async (e) => {
        e.preventDefault(); 
      
        // Validate staff_id input
        if (!staff_id.trim()) {
          alert("Please enter a staff ID.");
          return;
        }
      
        // if (!/^\d+$/.test(staff_id)) {
        //   alert("Staff ID must be a numeric value.");
        //   return;
        // }
      
        try {
          // Make a POST request to the login endpoint
          const body = { staff_id };
          const response = await axios.post('http://localhost:3000/api/login/login', body);
      
          // Store the JWT token in localstorage
          const accessToken = response.data.accessToken;
          localStorage.setItem('authToken', accessToken);
      
          // Retrieve the JWT token from localstorage
          const authToken = localStorage.getItem('authToken');
      
          // Send a GET request to check authentication
          const authenticationResponse = await axios.get('http://localhost:3000/api/login/check-auth', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
      
          // If the authentication is successful, navigate to the new page
          if (authenticationResponse.status === 200) {
            navigate('/');
            alert('Login success!');
          } else {
            // Handle other status codes if needed
            alert('Authentication failed. Please try again.');
          }
        } catch (error) {
          console.error('An error occurred during login:', error);
      
          if (error.response && error.response.status === 404) {
            alert('Incorrect staff ID. Please try again!');
          }
        }
      };


    return (
        <Container >
        <CssBaseline />
        <Grid >
            <Paper elevation={10} style={paperStyle} >
                <Grid align="center">
                    <Typography variant='h4'>Welcome To The Church Content Management System</Typography><br></br>
                        <Avatar style={avatarStyle} >
                            <img src={presby} alt="Profile" style={imageStyle} />
                        </Avatar>
                    <h1>Sign in</h1>
                </Grid>
                <form onSubmit={handleSignIn}>
                <TextField
                    label="Staff Id"
                        placeholder='Enter staff id'
                            value={staff_id}
                            type={showStaffId ? 'text' : 'password'}
                        fullWidth
                        required
                        onChange={handleStaffIdChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end" >
                              {showStaffId ? (
                                <VisibilityOff className="pointerCursor" onClick={() => setShowStaffId(false)} />
                              ) : (
                                <Visibility className="pointerCursor" onClick={() => setShowStaffId(true)} />
                              )}
                            </InputAdornment>
                           
                          ),
                          
                        }}
                        autoFocus
                />

                   

            
                <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth onClick={handleSignIn}>Sign In</Button>
                </form>
              
            </Paper>
            </Grid>
            <Copyright/>
        </Container>
        
    )
}

export default Login