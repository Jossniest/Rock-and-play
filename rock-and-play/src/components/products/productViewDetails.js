import React, { useState } from 'react'
import useStyles, { StyledMenu, BootstrapInput, StyledCard } from './productsStyles';
import { Link, withRouter } from 'react-router-dom'
import {
    Grid, Button, NativeSelect, Typography, IconButton, FormControl,
    CardHeader, CardContent, InputLabel,
    Avatar, CardActions, ListItemText, Box, Divider, Dialog,
    List, ListItem, ListItemAvatar, ListItemSecondaryAction, Snackbar, MenuItem
} from '@material-ui/core'
import {
    ArrowDropDown
} from '@material-ui/icons'
import { grey } from '@material-ui/core/colors'
import PropTypes from 'prop-types'
import ProductSlider from './ProductSlider'
import nl2br from 'react-newline-to-break'
import { ProductContext } from '../../sessioncontext/ProductContext'
import LoginRequest from '../login/NeedLogin'
import AuthUserContext from '../../sessioncontext/context'
import { BreadcrumbsItem} from 'react-breadcrumbs-dynamic'

const ViewDetails = (props) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    const [position, setPosition] = useState(props.variation)
    const { uid, name, brand, category, variation, description, subcategory } = props.product
    const white = grey[50];
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState(false)

    const handleSnackBarOpen = () => {
        setSnackbar(true);
    };
    const handleSnackBarClose = () => {
        setSnackbar(false);
    };

    const handleChange = event => {
        setQuantity(event.target.value)
    }

    const QuantityOptions = () => {
        let options = []
        if (variation[position].quantity > 0) {
            for (let i = 1; i <= variation[position].quantity; i++) {
                options.push(i)
            }
        }
        else {
            options.push(0)
        }
        return options
    }

    const handleClickListItem = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, key) => {
        setPosition(props.variation)
        props.history.push(`/productos/${brand}/${name}/${uid}/${key}`)
        setAnchorEl(null);
    };
    const OpenConfirmation = () => {
        setOpen(true)
    }

    const HideConfirmation = () => {
        setOpen(false)
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    let myString = description.toString().replace(/-n/g, "\n")

    return (
        <div>
            <div>
                <BreadcrumbsItem to={`/`}>Home</BreadcrumbsItem>
                <BreadcrumbsItem to={`/productos/${category}`}>{category}&nbsp;</BreadcrumbsItem>
                <BreadcrumbsItem to={`/productos/${category}/${subcategory}`}>{subcategory}&nbsp;</BreadcrumbsItem>
                <BreadcrumbsItem to={`/productos/${props.match.params.brand}/${props.match.params.name}/${props.match.params.uid}/${props.match.params.key}`}>{name}&nbsp;</BreadcrumbsItem>
            </div>
            <Box className={`${classes.heading} text-layout`} style={{ backgroundColor: '#232528', color: white }}>
                <Typography variant="h4" gutterBottom color='inherit' component="h1" style={{ textTransform: 'capitalize' }}>
                    {name}{" - "}{variation[position].color}
                </Typography>
                <Typography color='secondary' className='sub-title2' style={{ textTransform: 'capitalize' }}>
                    {brand}
                </Typography>
            </Box>
            <Grid container justify='center' >
                <Grid item xs={8} >
                    <ProductSlider Photos={variation[position].images} Width={500}></ProductSlider>
                    <br />
                    <Divider orientation='horizontal' />
                    <div className={classes.heading}>
                        <Typography color='secondary' variant='h6' className='text-description' style={{ textTransform: 'capitalize' }}>
                            Acerca del Producto
                        </Typography>
                        <Typography variant='body2' color='textPrimary'>
                            {nl2br(myString)}
                        </Typography>
                    </div>
                    <br />
                    <br />
                    <Divider orientation='horizontal' variant='inset' />
                </Grid>
                <Grid item xs={4}>
                    <StyledCard elevation={5} className={classes.paper}>
                        <CardHeader
                            title={<Typography variant='h5' color='textSecondary'>
                                <sup>$DOP</sup>{' '}<b>{variation[position].price}</b><sup>{' '}00</sup>
                            </Typography>}

                        >

                            {/*Subheader= aqui el impuesto y los costo de envios*/}
                        </CardHeader>
                        <Divider orientation='horizontal' />
                        <CardContent>
                            <div className={classes.select}>
                                <List aria-label='select product type' color={grey}>
                                    <ListItem aria-haspopup='true' aria-controls='lock-menu'>
                                        <ListItemAvatar>
                                            <Avatar src={variation[position].profile}></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary='Color:' secondary={variation[position].color}></ListItemText>
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" onClick={handleClickListItem}>
                                                <ArrowDropDown />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                                <StyledMenu
                                    id="lock-menu"
                                    keepMounted
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    {variation.map(({ color, profile, price }, index) => {

                                        return (
                                            <MenuItem
                                                key={color}
                                                selected={index === position}
                                                onClick={event => handleMenuItemClick(event, index)}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar src={profile}></Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={<Typography color='textPrimary' variant='subtitle1'>{color}</Typography>} secondary={<Typography color='primary' variant='caption'>{price}</Typography>}></ListItemText>
                                            </MenuItem>
                                        )
                                    }
                                    )}

                                </StyledMenu>
                            </div>

                        </CardContent>
                        <Divider orientation='horizontal' />
                        <CardContent>
                            <div className="App">
                                <Typography variant='body2' color='textSecondary' style={{ textTransform: 'capitalize' }} component={Link} to={`/${category}`}>
                                    <span>Categoria:</span>{' '}<b>{category}</b>
                                </Typography>
                                <Typography variant='subtitle1' color='textPrimary'>
                                    {variation[position].quantity > 0 ?
                                        'Disponible' :
                                        'No Disponible'
                                    }
                                </Typography>
                                <Typography variant='caption' color='inherit'>
                                    Vendido por Rock And Play
                                </Typography>
                            </div>

                            <FormControl>
                                <InputLabel htmlFor="demo-customized-select-native">Cantidad</InputLabel>
                                <NativeSelect
                                    id="demo-customized-select-native"
                                    value={quantity}
                                    onChange={handleChange}
                                    input={<BootstrapInput />}
                                >
                                    {QuantityOptions().map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}

                                </NativeSelect>
                            </FormControl>

                        </CardContent>
                        <CardActions>
                            <ProductContext.Consumer>
                                {value =>
                                    <AuthUserContext.Consumer>
                                        {authUser =>
                                            <Button color='secondary' variant='contained' size="large" onClick={() => {
                                                if (!authUser) {
                                                    OpenConfirmation()
                                                } else {
                                                    value.addToCart(uid, quantity, position, variation[position].variationUID, authUser,() => { handleSnackBarOpen() })

                                                }
                                            }}
                                                disabled={variation[position].inCart ? true : false
                                                }>
                                                {variation[position].inCart ? "En carrito" : "Agregar a carrito"}

                                            </Button>

                                        }

                                    </AuthUserContext.Consumer>

                                }
                            </ProductContext.Consumer>

                            {open &&
                                <Dialog
                                    open={open}
                                    onClose={HideConfirmation}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <LoginRequest />

                                </Dialog>
                            }
                            <ProductContext.Consumer>
                                {value =>
                                    <Snackbar
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        open={snackbar}
                                        onClose={handleSnackBarClose}
                                        ContentProps={{
                                            'aria-describedby': 'message-id',
                                        }}
                                        autoHideDuration={2000}
                                        message={<span id='message-id'>Producto añadido al carrito</span>}
                                    />
                                }
                            </ProductContext.Consumer>
                        </CardActions>
                    </StyledCard>
                </Grid>
            </Grid>
        </div>

    )
}

ViewDetails.propTypes = {
    product: PropTypes.shape({
        uid: PropTypes.string,
        name: PropTypes.string,
        brand: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number,
        avatar: PropTypes.object,
        category: PropTypes.string,
        description: PropTypes.string,
        inCart: PropTypes.bool,
    }).isRequired
}
export default withRouter(ViewDetails);