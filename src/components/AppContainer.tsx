// Defines the sidebar and top app bar and acts as a switch for other app components

import React from 'react';
import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    makeStyles, Theme, createStyles, LinkProps,
} from "@material-ui/core";

import { PersonOutline, House, Menu as MenuIcon } from '@material-ui/icons';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
    Route,
    Switch,
    useRouteMatch,
    useLocation
} from 'react-router-dom';
import DormList from './DormList';
import PeopleTable from './PeopleTable';
import People from './People';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        padding: theme.spacing(3),
    },
    title: {
        flexGrow: 1,
    },
}))

const listItems = [
    {
        text: '人员',
        icon: <PersonOutline />,
        relpath: 'people',
    },
    {
        text: '宿舍',
        icon: <House />,
        relpath: 'dorms',
    },
    {
        text: '车辆',
        icon: <PersonOutline />,
        relpath: 'cars',
    },
];

export default function ResponsiveDrawer() {
    const classes = useStyles();
    // const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const { url, path } = useRouteMatch();
    const location = useLocation();
    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {
                    listItems.map((item, index) => {
                        const fullpath = `${url}/${item.relpath}`;
                        return (
                            <ListItemLink
                                to={fullpath}
                                key={item.text}
                                primary={item.text}
                                icon={item.icon}
                                selected={location.pathname.startsWith(fullpath)}
                            />);
                    })
                }
            </List>
            <Divider />
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position='fixed' className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title}>
                        管理系统
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label='types'>
                <Hidden smUp implementation='css'>
                    <Drawer
                        variant='temporary'
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation='css'>
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant='permanent'
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route path={`${path}/dorms/:id?/`} component={DormList} />
                    <Route path={`${path}/people/:id?`} component={People} />
                    {/* <Route path={`${path}/`} component={PeopleTable} /> */}
                </Switch>
            </main>
        </div>
    );
}


interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
    selected?: boolean;
}

interface ListItemLinkProps extends LinkProps {
    to: string;
    open?: boolean;
}
const breadcrumbNameMap: { [key: string]: string } = {
    '/app': '管理系统',
    '/app/people': '人事',
    '/app/cars/:id': ':id',
    '/app/dorm': '宿舍',
    '/app/cars': '车辆',
};

function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink} selected={props.selected}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

// function ListItemLink2(props: Omit<ListItemLinkProps, 'ref'>) {
//     const { to, open, ...other } = props;
//     const primary = breadcrumbNameMap[to];

//     return (
//         <li>
//             <ListItem button component={RouterLink} to={to} {...other}>
//                 <ListItemText primary={primary} />
//                 {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
//             </ListItem>
//         </li>
//     );
// }