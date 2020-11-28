import React, { useState } from 'react';
import { Navbar, NavDropdown,Nav } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import MainFrame from "./main-frame";
import SideNav from "./Sidenav";
import Navbars from "./Navbars";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AnnouncementIcon from '@material-ui/icons/Announcement';
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import CancelIcon from "@material-ui/icons/Cancel";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import './Dashboard.scss'
import { Link } from 'react-router-dom';
import ProgressCircle from './ProgressCircle';
import Categories from './Categories';

const Dashboard = ({user}) => {
    const theme = createMuiTheme({
        typography: {
          useNextVariants: true
        },
        palette: {
          primary: {
            main: "#fbb900"
          },
          secondary: {
            main: "#595a5b"
          }
        }
      });
      
      const themeB = createMuiTheme({
        typography: {
          useNextVariants: true
        },
        palette: {
          primary: {
            main: "#a5a5a5"
          },
          secondary: {
            main: "#595a5b"
          }
        }
      });
      
    const [navToggled, setNavToggled] = useState(false)
    const [darkToggled, setDarkToggled] = useState(true)

    const NavToggled = e => {
        setNavToggled(prev => !prev);
      };
      const darkModeToggled = e => {
        setDarkToggled(prev => !prev);
      };

    const entries = [
        [
          ["Inbox", <InboxIcon />, "/inbox"], 
          ["Starred", <MailIcon />, "/starred"]
        ],
        [
          ["All mail", <CancelIcon />, "/all"],
          ["Trash", <AnnouncementIcon />, "/trash"]
        ],
        [["logout", <OpenInNewIcon />, "/logout"]]
      ];
       

    return (
        <>
        <ThemeProvider theme={theme}>
        <Navbars
          title="Example tool"
          themes={[[theme, themeB], darkModeToggled]}
        />
        <SideNav
          entries={entries}
          themes={[[theme, themeB], darkModeToggled]}
          navToggled={NavToggled}
        />
        
        <div className="Dashboard"> 
          <div className='Progress'>
            <ProgressCircle numbers={[user.height, 100]} strokeWidth={10}/> 
            <ProgressCircle numbers={[user.weight, 100]} strokeWidth={10}/> 
            <ProgressCircle numbers={[user.height, 100]} strokeWidth={10}/> 
          </div>
            <h1>Hello {user.name}</h1>
            <Categories />
          </div>
          
      </ThemeProvider>
       
        
        
        </>
    );
}

export default Dashboard;
