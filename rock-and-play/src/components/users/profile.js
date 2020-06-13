import React, { useState } from 'react';
import AuthUserContext from '../../sessioncontext/context'
import {
    Card, CardActions, CardHeader, CardContent, Avatar, Typography, ListSubheader, MenuItem,
    Menu, Tooltip, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, ListItemIcon,
    IconButton,
} from '@material-ui/core'
import { Create, Check, Settings, AddLocation } from '@material-ui/icons'
import useStyles from '../tablepages/Styles'
import { Redirect, withRouter } from 'react-router-dom'
import FaceIcon from '../../resources/face-icon.png'

const UserProfile = (props) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)

    const isMenuOpen = Boolean(anchorEl);

    const menuId = 'Menu-Desktop';
    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            open={isMenuOpen}
            onClose={handleMenuClose}>

            <MenuItem onClick={() => {
                props.history.push('/edit/user')
            }}>
               
                    <ListItemIcon>
                        <Create />
                    </ListItemIcon>
                    <ListItemText primary="Editar" />
                
            </MenuItem>
            <MenuItem onClick={() => {
                props.history.push('/edit/address')
            }} >
                
                    <ListItemIcon>
                        <AddLocation />
                    </ListItemIcon>
                    <ListItemText primary="Ubicacion" />
                
            </MenuItem>
        </Menu>
    );

    return (
        <AuthUserContext.Consumer>
            {authUser => !authUser ?
                (<Redirect to="/"></Redirect>) : (
                    <div className={classes.root}>
                        <div className={classes.container}>
                            <Card >
                                <CardHeader
                                    avatar={
                                        <Avatar className={classes.avatar}>
                                            {authUser.name.charAt(0)}
                                        </Avatar>
                                    }
                                    action={
                                        <Tooltip title='Configuración'>
                                            <IconButton
                                                aria-controls={menuId}
                                                aria-haspopup="true"
                                                onClick={handleProfileMenuOpen}
                                            >
                                                <Settings />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                    title='Configuración de usuario'
                                />
                                <div className={classes.card}>
                                    <img src={FaceIcon} alt='Generic-Profile-Image' style={{ maxHeight: '300px' }}></img>

                                    <div className={classes.details}>
                                        <CardContent className={classes.content}>
                                            <List >
                                                <Typography variant='h5' color='textSecondary' className={classes.title} >
                                                    {authUser.name} {` `}
                                                    {authUser.lastname && (
                                                        `${authUser.lastname}`
                                                    )}
                                                </Typography>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={`Correo: ${authUser.email}`}
                                                    />
                                                </ListItem>
                                                {authUser.isAdmin && (
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            <Check></Check>
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary="administrador"
                                                        />
                                                    </ListItem>
                                                )}
                                                {!authUser.address ? (
                                                    <ListItem>
                                                        <ListItemText primary="Aún no tienes una dirección colocada"
                                                            secondary="Accede a nuestras entregas colocando tu ubicación en el boton de configuración"
                                                        ></ListItemText>
                                                    </ListItem>
                                                ) :
                                                    (
                                                        <React.Fragment>
                                                            <ListItem>
                                                                <ListItemText
                                                                    primary={`Dirección: ${authUser.address}`}
                                                                />
                                                            </ListItem>
                                                            <ListItem>
                                                       
                                                                <ListItemText
                                                                    primary={`Codigo Postal: ${authUser.postalcode}`}
                                                                />
                                                            </ListItem>
                                                            <ListItem>
                                                                
                                                                <ListItemText
                                                                    primary={`Provincia/Estado: ${authUser.province}`}
                                                                />
                                                            </ListItem>
                                                            <ListItem>
                                                            
                                                                <ListItemText
                                                                    primary={`Ciudad: ${authUser.city}`}
                                                                />
                                                            </ListItem>
                                                            <ListItem>
                                                            
                                                                <ListItemText
                                                                    primary={`Pais: ${authUser.country}`}
                                                                />
                                                            </ListItem>
                                                        </React.Fragment>
                                                    )}

                                            </List>
                                        </CardContent>
                                        <CardActions>

                                        </CardActions>


                                    </div>
                                </div>
                                {renderMenu}
                            </Card>
                        </div>
                    </div>
                )
            }
        </AuthUserContext.Consumer>
    )
}

export default withRouter(UserProfile);