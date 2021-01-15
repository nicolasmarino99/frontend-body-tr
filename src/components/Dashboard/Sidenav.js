/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography, MuiThemeProvider } from '@material-ui/core';

const drawerWidth = 220;
const drawerClosedWidth = 57.5;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {},
  growA: {
    marginLeft: 0,
    flexGrow: 1,
  },
  growB: {
    marginLeft: -19,
    flexGrow: 0,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    width: drawerClosedWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    ...theme.mixins.toolbar,
  },
}));

function SideNav({ themes, navToggled, entries }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <MuiThemeProvider theme={(
      themes && (
        themes[1]
          ? themes[0][1]
          : themes[0][0])
          || null)}
    >

      <div className={classes.root}>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
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
              Menu
            </Typography>
            <div
              className={classNames({
                [classes.growA]: open,
                [classes.growB]: !open,
              })}
            />
            <div className={classes.toolbar}>
              {open && (
              <IconButton
                onClick={() => {
                  handleDrawerClose();
                  navToggled();
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              )}
              {!open && (
              <IconButton
                onClick={() => {
                  handleDrawerOpen();
                  navToggled();
                }}
              >
                <ChevronRightIcon />
              </IconButton>
              )}
            </div>
          </Toolbar>
          <Divider />
          {entries.map((group, index) => (
            <div>
              <List>
                {group.map((elem) => (
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
              {index !== entries.length - 1 && <Divider />}
            </div>

          ))}
          <Divider />

        </Drawer>
      </div>

    </MuiThemeProvider>
  );
}

export default SideNav;
