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
const inputStyle = {margin: '20px 0 0 0'}

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
        e.preventDefault(); // Prevent the default form submission
      
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

    // const handleSignIn = async (e) => {
    //   e.preventDefault(); // Prevent default form submission
    
    //   // Validate staff_id input
    //   if (!staff_id.trim()) {
    //     alert("Please enter a staff ID.");
    //     return;
    //   }
    
    //   if (!/^\d+$/.test(staff_id)) {
    //     alert("Staff ID must be a numeric value.");
    //     return;
    //   }
    
    //   // Ensure password is provided
    //   if (!password.trim()) {
    //     alert("Please enter your password.");
    //     return;
    //   }
    
    //   try {
    //     // Make a POST request to the login endpoint with both staff_id and password
    //     const body = { staff_id, password };
    //     const response = await axios.post('http://localhost:3000/api/login/login', body);
    
    //     // Store the JWT token in localStorage
    //     const accessToken = response.data.accessToken;
    //     localStorage.setItem('authToken', accessToken);
    
    //     // Retrieve the JWT token from localStorage
    //     const authToken = localStorage.getItem('authToken');
    
    //     // Send a GET request to check authentication
    //     const authenticationResponse = await axios.get('http://localhost:3000/api/login/check-auth', {
    //       headers: {
    //         Authorization: `Bearer ${authToken}`,
    //       },
    //     });
    
    //     // If authentication is successful, navigate to the dashboard
    //     if (authenticationResponse.status === 200) {
    //       navigate('/');
    //       alert('Login success!');
    //     } else {
    //       alert('Authentication failed. Please try again.');
    //     }
    //   } catch (error) {
    //     console.error('An error occurred during login:', error);
    
    //     if (error.response && error.response.status === 404) {
    //       alert('Incorrect staff ID. Please try again!');
    //     } else if (error.response && error.response.status === 401) {
    //       alert('Invalid password. Please try again!');
    //     }
    //   }
    // };
    
      

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

                    {/* <TextField
                        label="Password"
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePasswordChange}
                        fullWidth
                        type={showPassword ? 'text' : 'password' }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end" >
                              {showPassword ? (
                                <VisibilityOff className="pointerCursor" onClick={() => setShowPassword(false)} />
                              ) : (
                                <Visibility className="pointerCursor" onClick={() => setShowPassword(true)} />
                              )}
                            </InputAdornment>
                           
                          ),
                          
                        }}
                        style={inputStyle}
                        required
                      /> */}

            
                <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth onClick={handleSignIn}>Sign In</Button>
                </form>
              
            </Paper>
            </Grid>
            <Copyright/>
        </Container>
        
    )
}

export default Login