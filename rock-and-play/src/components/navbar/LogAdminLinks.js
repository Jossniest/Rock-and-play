import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import useStyles from './Navstyles'
import { compose } from 'redux';
import { withFirebase } from '../../config/context'
import { IconButton, MenuItem, Menu, Tooltip, Typography, Divider,  ListItemText, ListItemIcon } from '@material-ui/core'
import { AccountCircle, More, AccountBoxOutlined, LocalShippingOutlined, Room } from '@material-ui/icons'
import SignOut from '../login/SignOut';
import { CartButton, ToolTipCart } from '../cart/cart';

const LogAdminLinks = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'Menu-Desktop';
  const mobileMenuId = 'Menu-Mobile';

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
      <Typography className={`text-description ${classes.menuTitle}`} component='span' variant='inherit' >
        Hola, {props.authUser.name}
      </Typography>
      <Divider orientation="horizontal"></Divider>
      <MenuItem onClick={() => {
        props.history.push('/profile')
        handleMenuClose()
      }}  >
        
          <ListItemIcon>
            <AccountBoxOutlined />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        
      </MenuItem>

      <MenuItem onClick={() => {
        props.history.push('/user/orders')
        handleMenuClose()
      }} >
        
          <ListItemIcon>
            <LocalShippingOutlined />
          </ListItemIcon>
          <ListItemText primary="Ordenes y Pedidos" />
        
      </MenuItem>

      <SignOut />

    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="Ver ubicacion de la tienda"
          color="inherit"
          onClick={() => { props.history.push('/location') }}
        >
          <Room />
        </IconButton>
        <p>Ubicacion</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="Iniciar sesion de usuario"
          aria-controls="Menu-Desktop"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Cuenta</p>
      </MenuItem>
      <CartButton />
    </Menu>
  );

  return (
    <div>
      {/*Iconos*/}
      <div className={classes.sectionDesktop}>
        <Tooltip title="Ubicación">
          <IconButton size="medium"
            aria-label="Ver ubicacion de la tienda"
            onClick={() => { props.history.push('/location') }}
            color="inherit"
          >
            <Room />
          </IconButton >
        </Tooltip>
        <Tooltip title="Usuario">
          <IconButton size="medium"
            aria-label="Datos de Usuario"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit">
            <AccountCircle />
          </IconButton >
        </Tooltip>

        {/*Controlar como algo aparte luego que apliquemos el api carrito */}
        <ToolTipCart />
      </div>
      {/*Mobile handle de icons*/}
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <More />
        </IconButton>
      </div>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}

export default withRouter(LogAdminLinks);