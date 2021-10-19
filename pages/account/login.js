import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import firebase from "../../firebase/firebase";
import "firebase/auth";
import Avatar from "@material-ui/core/Avatar";
import { useAuthState } from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";


const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random/featured/?nature)',
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const auth = firebase.auth();

function SignInSide() {
    const classes = useStyles();

    const [user, setUser] = useState({ email: "", password: "", robot: false });
    const [errorMessage, setErrorMessage] = useState("");

    const login = (e) => {
        e.preventDefault();
        if (user.email && user.password && user.robot) {
            const promise = auth.signInWithEmailAndPassword(
                user.email,
                user.password
            );
            promise.catch((err) => {
                switch (err.message) {
                    case "There is no user record corresponding to this identifier. The user may have been deleted.":
                        setErrorMessage("E-mail adresi veya parola hatalı!");
                        setUser({ email: "", password: "" });
                        break;

                    case "The password is invalid or the user does not have a password.":
                        setErrorMessage("E-mail adresi veya parola hatalı!");
                        setUser({ email: "", password: "" });
                        break;

                    case "The email address is badly formatted.":
                        setErrorMessage("E-mail adresi formata uygun değil!");
                        setUser({ ...user, email: "" });
                        break;

                    default:
                        break;
                }
            });
        } else {
            setErrorMessage("Lütfen tüm alanları doldurun!");
        }
    };

    return (
        <React.Fragment>
            <Head>
                <title>Giriş Yap - Ahmet Eren BOYACI</title>
            </Head>

            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h4">
                            Giriş Yap
                        </Typography>
                        <form className={classes.form} onSubmit={login}>
                            {errorMessage && (
                                <Alert style={{ marginTop: "1rem" }} severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {errorMessage}
                                </Alert>
                            )}
                            <TextField
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="email"
                                label="E-mail Adresi"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Parola"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={user.robot}
                                        onChange={(e) =>
                                            setUser({ ...user, robot: e.target.checked })
                                        }
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Robot değilim"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Giriş Yap
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/">
                                        <a>
                                            &#8592; Ana sayfa
                                        </a>
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default function Login() {
    const router = useRouter();
    const [user, loading, _] = useAuthState(auth);

    useEffect(async () => {
        if (user && !loading) {
            await router.push("/dashboard");
        }
    }, [user, loading]);

    return !user && <SignInSide />
}
