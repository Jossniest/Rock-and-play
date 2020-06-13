import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthUserContext from '../../sessioncontext/context'
import useStyles from './Navstyles'
import {
  AppBar, Toolbar,Typography, 
} from '@material-ui/core'
import LogOutLinks from './LogOutLinks'
import LogInLinks from './LogInLinks'
import LogAdminLinks from './LogAdminLinks'
import MenuCategory from './Menu'
import SearchBar from './Search'


const Navigation = (props) => {
  const classes = useStyles();

  const NavigationAuth = ({ authUser }) => (
    <div className={classes.grow}>
      <AppBar position="static" >
        <Toolbar className={classes.appbar}>
          
          {/*Titulo */}
          <Typography component={Link} to="/" className={classes.title} variant="h6" noWrap>
            {'ROCK & PLAY'}
          </Typography>
          {/* Manejar aparte searching box*/}
          <div className={classes.grow}/>
          <SearchBar></SearchBar>
          {/*Iconos*/}

          {authUser.isAdmin ? 
            (<LogAdminLinks authUser={authUser}></LogAdminLinks>) :
            (<LogInLinks authUser={authUser}></LogInLinks>)
          }
        </Toolbar>
        <MenuCategory />
      </AppBar>
     
    </div>
  )

  const NavigationNonAuth = () => (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.appbar}>
         
          {/*Titulo */}
          <Typography component={Link} to="/" className={classes.title} variant="h6" noWrap>
            {'ROCK & PLAY'}
          </Typography>
          <div className={classes.grow}/>
          {/* Manejar aparte searching box*/}
          <SearchBar></SearchBar>
          {/*Iconos*/}
          <LogOutLinks></LogOutLinks>

        </Toolbar>
        <MenuCategory />
      </AppBar>

    </div>
  )


  /*Lo que yo manejo */
  return (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />

        ) : (
            <NavigationNonAuth />
          )
      }
    </AuthUserContext.Consumer>
  )

}

export default withRouter(Navigation);

