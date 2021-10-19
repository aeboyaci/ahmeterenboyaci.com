import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {Typography} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PostAddIcon from "@material-ui/icons/PostAdd";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {useAuthState} from "react-firebase-hooks/auth";
import DashboardEditor from "../components/Dashboard/DashboardEditor";
import DashboardList from "../components/Dashboard/DashboardList";
import {useRouter} from "next/router";
import firebase from "../firebase/firebase";
import "firebase/auth";
import Head from "next/head";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

const auth = firebase.auth();

export default function Dashboard({children}) {
    const router = useRouter();

    const [user, loading, _] = useAuthState(auth);

    const [page, setPage] = useState("create");
    const [editPostID, setEditPostID] = useState("");

    const changePage = (childPage, id) => {
        setPage(childPage);
        setEditPostID(id);
    };

    useEffect(async () => {
        if (!user && !loading) {
            await router.push("/account/login");
        }
    }, [user, loading]);

    const AuthorizedView = () => {
        const classes = useStyles();
        const theme = useTheme();
        const [open, setOpen] = React.useState(true);

        const handleDrawerOpen = () => {
            setOpen(true);
        };

        const handleDrawerClose = () => {
            setOpen(false);
        };

        return (
            <React.Fragment>
                <Head>
                    <title>Dashboard - Ahmet Eren BOYACI</title>
                </Head>

                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="body1">
                                {user && user.displayName && `Hoşgeldin, ${user.displayName}`}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>
            <span style={{marginRight: "2.1rem", fontSize: "1.3rem"}}>
              Ahmet Eren BOYACI
            </span>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === "ltr" ? (
                                    <ChevronLeftIcon/>
                                ) : (
                                    <ChevronRightIcon/>
                                )}
                            </IconButton>
                        </div>
                        <Divider/>
                        <List>
                            <ListItem
                                button
                                key="Add Post"
                                onClick={() => setPage("create")}
                            >
                                <ListItemIcon>
                                    <PostAddIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Gönderi ekle"/>
                            </ListItem>
                            <ListItem
                                button
                                key="All Posts"
                                onClick={() => setPage("list")}
                            >
                                <ListItemIcon>
                                    <FormatListBulletedIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Gönderilerim"/>
                            </ListItem>
                        </List>
                        <Divider/>
                        <List>
                            <ListItem
                                button
                                key="logout"
                                onClick={() => {
                                    auth.signOut();
                                }}
                            >
                                <ListItemIcon>
                                    <ExitToAppIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Çıkış yap"/>
                            </ListItem>
                        </List>
                    </Drawer>
                    <main
                        className={clsx(classes.content, {
                            [classes.contentShift]: open,
                        })}
                    >
                        <div className={classes.drawerHeader}/>
                        {page === "create" && <DashboardEditor mode={"create"} />}
                        {page === "edit" && <DashboardEditor mode={"edit"} id={editPostID} />}
                        {page === "list" && <DashboardList changePage={changePage} />}
                    </main>
                </div>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            {user && !loading && <AuthorizedView/>}
        </React.Fragment>
    );
}
