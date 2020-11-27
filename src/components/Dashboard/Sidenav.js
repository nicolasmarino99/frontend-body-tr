import React from "react";
import classNames from "classnames";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography, MuiThemeProvider } from "@material-ui/core";

const drawerWidth = 220;
const drawerClosedWidth = 57.5;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  title: {},
  growA: {
    marginLeft: 0,
    flexGrow: 1
  },
  growB: {
    marginLeft: -19,
    flexGrow: 0
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    width: drawerClosedWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    ...theme.mixins.toolbar
  }
}));

function SideNav(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <MuiThemeProvider theme={(props.themes && (props.themes[1] ? props.themes[0][1] : props.themes[0][0]) || null)}>
      <Router>
        <div className={classes.root}>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open
              })
            }}
            open={open}
          >
            <Toolbar>
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
                noWrap
              >
                Pilz
              </Typography>
              <div
                className={classNames({
                  [classes.growA]: open,
                  [classes.growB]: !open
                })}
              />
              <div className={classes.toolbar}>
                {open && (
                  <IconButton
                    onClick={() => {
                      handleDrawerClose();
                      props.navToggled();
                      }}
                  >
                    {<ChevronLeftIcon />}
                  </IconButton>
                )}
                {!open && (
                  <IconButton
                    onClick={() => {
                      handleDrawerOpen();
                      props.navToggled();
                      }}
                  >
                    {<ChevronRightIcon />}
                  </IconButton>
                )}
              </div>
            </Toolbar>
            <Divider />
            {props.entries.map((group, index) => (
              <div>
                <List>
                  {group.map(elem => (
                    <ListItem
                      button
                      key={elem[0]}
                      component={Link}
                      to={elem[2]}
                    >
                      <ListItemIcon>{elem[1]}</ListItemIcon>
                      <ListItemText primary={elem[0]} />
                    </ListItem>
                  ))}
                </List>
                {index !== props.entries.length - 1 && <Divider />}
              </div>
            ))}
          </Drawer>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default SideNav;
