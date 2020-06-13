import React from 'react';
import {withRouter} from 'react-router-dom';
import useStyles from './Navstyles'
import { IconButton, MenuItem, Menu, Tooltip, Button, Divider, Grid, Typography} from '@material-ui/core'
import { AccountCircle, Room} from '@material-ui/icons'

const LogOutLinks = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    
    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    
    const redirect = () => {
      props.history.push('/login/sign-in')
    }

    const menuId = 'Menu-Desktop';

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            open={isMenuOpen}
            onClose={handleMenuClose}>

              {/*Aqui va lo de usuario */}
            <Typography component="h6" variant='h6' style={{marginLeft:'1vh'}}> 
                Nuevo en la tienda?
            </Typography>
            <Grid container alignItems='center' className={classes.root}>
            <MenuItem onClick={() => {
              props.history.push('/login/sign-up')
              handleMenuClose()
            }}  
            className={classes.menuItem}> 
              Crearse una cuenta
            </MenuItem>
            <Divider orientation='vertical'/>
                      
            <Button onClick={redirect} className={classes.button}>Iniciar sesion</Button>
            
            </Grid>
        </Menu>
    );
    return(
        <div>
              {/*Iconos*/}
              <div className={classes.sectionDesktop}>     
              <Tooltip title="Ubicación">   
                <IconButton size="medium"
                  aria-label="Ver ubicacion de la tienda"
                  onClick={() => {props.history.push('/location')}}
                  color="inherit"
                >
                  <Room />
                </IconButton >
              </Tooltip>  
              <Tooltip title="Iniciar Sesion">   
                <IconButton size="medium"
                  aria-label="Iniciar sesion de usuario"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton >
              </Tooltip> 
              {/*Controlar como algo aparte luego que apliquemos el api carrito */}
                
              </div>
    
              {/*Mobile handle de icons*/}
              <div className={classes.sectionMobile}>
              <Tooltip title="Ubicación">   
                <IconButton size="medium"
                  aria-label="Ver ubicacion de la tienda"
                  onClick={() => {props.history.push('/location')}}
                  color="inherit"
                >
                  <Room />
                </IconButton >
              </Tooltip>  
                <IconButton
                  aria-label="show more"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  
                >
                  <AccountCircle />
                </IconButton>
              </div>
          
          {renderMenu}
        </div> 
    )    
    
}

export default withRouter(LogOutLinks);