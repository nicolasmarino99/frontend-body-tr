/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CancelIcon from '@material-ui/icons/Cancel';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './Dashboard.scss';
import Gravatar from 'react-gravatar';
import Categories from './Categories';
import { UserContext } from './ContextProviders/UserProvider';
import Navbars from './Navbars';
import SideNav from './Sidenav';

const Dashboard = () => {
  const [user, setUser] = useContext(UserContext);
  const [navToggled, setNavToggled] = useState(false);

  const NavToggled = (e) => {
    setNavToggled((prev) => !prev);
  };

  const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
        main: '#fbb900',
      },
      secondary: {
        main: '#595a5b',
      },
    },
  });

  const entries = [
    [
      // eslint-disable-next-line react/jsx-filename-extension
      ['Inbox', <InboxIcon />, '/categories'],
      ['Starred', <MailIcon />, '/starred'],
    ],
    [
      ['All mail', <CancelIcon />, '/all'],
      ['Trash', <AnnouncementIcon />, '/trash'],
    ],
    [
      ['logout', <OpenInNewIcon />, '/logout'],
    ],
  ];

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbars
          title="Example tool"
          themes={[[theme]]}
        />
        <SideNav
          entries={entries}
          themes={[[theme]]}
          navToggled={NavToggled}
        />

        <div className="Dashboard">
          <Gravatar email={user.user.email} />
          <h1>
            Hello
            {user.user.name}
          </h1>
          <Categories />
        </div>

      </ThemeProvider>

    </>
  );
};

export default Dashboard;
