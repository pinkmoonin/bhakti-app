import { Alert, Avatar, Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm, SubmitHandler } from "react-hook-form"
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useUserContext } from "../../util/Auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSnackbar } from "notistack";

type LoginInputs = {
    email: string,
    password: string
}

function LoginPage() {
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>();

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, data.email, data.password);
            console.log(result);
            //enqueueSnackbar("Logged in successfully!", { variant: "success" });
        } catch (error) {
            let message = "Login failed.Please try again!"
            if (error instanceof FirebaseError) {
                message = error.code;

            }
            enqueueSnackbar(message, { variant: "error" });;
        } finally {
            setLoading(false);
        }
    };

    const currentUser = useUserContext();
    if (currentUser?.user) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h5" variant="h5">Admin Log in</Typography>

                <Box component="form" method="post" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>

                    <TextField
                        disabled={loading}
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Admin ID"
                        autoComplete="email"
                        autoFocus
                        helperText={errors.email ? errors.email.message : ''}
                        error={errors.email && true}
                        {...register("email", { required: "Please enter admin id." })}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        disabled={loading}
                        label="Password"
                        type="password"
                        id="password"
                        helperText={errors.password ? errors.password.message : ''}
                        error={errors.password && true}
                        {...register("password", {
                            required: "Please enter admin password.",
                            minLength: {
                                value: 8,
                                message: "Password length must be in the range [8 - 12].",
                            },
                            maxLength: {
                                value: 12,
                                message: "Password length must be less than [8 - 12].",
                            }
                        })}
                    />

                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Button
                            type="submit"
                            fullWidth
                            disabled={loading}
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}>
                            Log In
                        </Button>

                        {loading && (
                            <CircularProgress
                                color="secondary"
                                size={24}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-10px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginPage;