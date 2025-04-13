import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import Snackbar from '@mui/material/Snackbar';

const defaultTheme = createTheme();

export default function Authentication() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState();
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    // Clear all fields when component mounts and when form state changes
    React.useEffect(() => {
        setUsername('');
        setPassword('');
        setName('');
        setError('');
    }, [formState]);

    // Additional effect to clear fields on initial load
    React.useEffect(() => {
        setUsername('');
        setPassword('');
        setName('');
    }, []);

    // Using Picsum Photos for random images
    const imageUrl = `https://picsum.photos/1600/900?random=${Date.now()}`;

    const handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            }
            if (formState === 1) {
                const result = await handleRegister(name, username, password);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("");
                setFormState(0);
                setPassword("");
            }
        } catch (err) {
            console.log(err);
            const message = err.response?.data?.message || "An error occurred";
            setError(message);
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container sx={{ height: '100vh' }} component="main">
                <CssBaseline />
                <Grid
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        position: 'relative',
                        backgroundImage: `url(${imageUrl})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        flex: 1,
                    }}
                />
                <Grid
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        maxWidth: { sm: '400px', md: '500px' },
                        width: '100%',
                        p: 3,
                    }}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {formState === 0 ? 'Sign In' : 'Sign Up'}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                            <Button 
                                variant={formState === 0 ? "contained" : "outlined"} 
                                onClick={() => setFormState(0)}
                                sx={{ minWidth: 100 }}
                            >
                                Sign In
                            </Button>
                            <Button 
                                variant={formState === 1 ? "contained" : "outlined"} 
                                onClick={() => setFormState(1)}
                                sx={{ minWidth: 100 }}
                            >
                                Sign Up
                            </Button>
                        </Box>
                        <Box 
                            component="form" 
                            noValidate 
                            sx={{ mt: 3, width: '100%' }}
                            autoComplete="off"
                        >
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full name"
                                    name="name"
                                    value={name}
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="new-name"
                                />
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus={formState === 0}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="new-username"
                                inputProps={{
                                    autoComplete: "new-username",
                                    form: {
                                        autoComplete: "off",
                                    },
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                autoComplete="new-password"
                                inputProps={{
                                    autoComplete: "new-password",
                                    form: {
                                        autoComplete: "off",
                                    },
                                }}
                            />
                            {error && (
                                <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                                    {error}
                                </Typography>
                            )}
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? "Sign In" : "Sign Up"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message={message}
            />
        </ThemeProvider>
    );
}