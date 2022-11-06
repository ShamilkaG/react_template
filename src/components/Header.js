import {
  AppBar,
  Badge,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, Link,Routes, Route } from "react-router-dom";
import Employees from "../pages/Employees/Employees";
import Employees_Table from "../pages/Employees/Employees_Table";


const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // [theme.breakpoints.up("sm")]: {
    //     display: "flex",
    //   },
    //   [theme.breakpoints.down("sm")]: {
    //     display: "block",
    //   },
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
      [theme.breakpoints.down("md")]: {
        display: "block",
      },
      [theme.breakpoints.only("md")]: {
        marginLeft:"200px",
      },
  },
  appBar: {
    backgroundColor: "#fff", //Not working I put on Inline style(app bar)
    transform: "translateZ(0)",
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menuButton: {
    color:"#0000FF",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  content: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  searchInput: {
    opacity:'0.6',
    // padding:'0px 8px',
    padding:`0px ${theme.spacing(1)}`,
    fontSize:'0.8rem',
    '&:hover': {
        background: '#f2f2f2'
      },
    '& .MuiSvgIcon-root' : {
        // marginRight:'8px'
        marginRight: theme.spacing(1)
    }  
},
  
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [open, setOpen] = useState(false);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap>
            Responsive Drawer Example
          </Typography> */}
          <Grid container 
            alignItems='center'>
            {/* sm = {6} */}
                <Grid item  >
                    <InputBase
                    placeholder='Search topics'
                    className={classes.searchInput}
                    startAdornment = {isSmUp ? <SearchIcon fontSize='small'/> : <></>}
                    
                    ></InputBase>
                </Grid>
                <Grid item sm>

                </Grid>
                <Grid item  >
                    <IconButton>
                        <Badge overlap="rectangular" badgeContent={4} color="secondary" >
                            <NotificationsNoneIcon fontSize='small'/>
                        </Badge>
                    </IconButton>

                    <IconButton>
                        <Badge overlap="rectangular" badgeContent={4} color="primary">
                            <ChatBubbleOutlineIcon fontSize='small'/>
                        </Badge>
                    </IconButton>

                    <IconButton disableRipple={true}>
                        <PowerSettingsNewIcon fontSize='small'/>
                    </IconButton>
                    
                </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant={isMdUp ? "permanent" : "temporary"}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Routes>
            <Route path="/" element={<Employees />} />
            <Route path="/employee" element={<Employees />} />
            {/* <Route path="/" element={<Employees_Table />} /> */}
            {/* <Route path="/employee" element={<Employees_Table />} /> */}
        
        </Routes>
      </main>
    </div>
  );
}
