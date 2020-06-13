import React, { useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ProductContext } from '../../sessioncontext/ProductContext';
import { compose } from 'redux'
import {
  Grid, DialogActions, DialogContent, Card, CardHeader, CardMedia, CardContent, IconButton, Typography
  , Avatar, CardActions, Dialog, Button, Divider, ListItemText, Grow, Tooltip,
} from '@material-ui/core';
import { Close } from '@material-ui/icons'
import useStyles from './productsStyles'
import PropTypes from 'prop-types';
import onStock from '../../resources/on-sale.png'
import outStock from '../../resources/out-stock.png'
import NoDisponible from '../../resources/no_disponible.png'
import ProductSlider from './ProductSlider'
import LoginRequest from '../login/NeedLogin'
import AuthUserContext from '../../sessioncontext/context'

const ProductCastShow = (props) => {
  const classes = useStyles();
  const { uid, name, brand, category, variation } = props.product
  const [grow, setGrow] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [key, setKey] = useState(0)

  const menuId = 'View-Details'
  const handleAvatarChange = (key) => {
    setKey(key)
  }
  const OpenConfirmation = () => {
    setOpen2(true)
  }
  const HideConfirmation = () => {
    setOpen2(false)
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleGrow = () => {
    setGrow(true);
  };
  const handleGrowClose = () => {
    setGrow(false);
  };
  console.log(variation)

  const ViewDetails = () => (
    <Dialog keepMounted onClose={handleClose} open={open} className={classes.modal} style={{ overflow: 'hidden' }}>
      <DialogActions >
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogActions>
      <DialogContent>

        <Grid container spacing={2} style={{ overflow: 'hidden' }}>
          <Grid item>
            <ProductSlider Photos={variation[key].images} Width={300}></ProductSlider>
          </Grid>

          <Grid item xs={12} sm container direction='row'>
            <Grid item xs={12} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" style={{ textTransform: 'capitalize' }} >
                  {brand}{' '}{name}{' - '}{variation[key].color}
                </Typography>
                <Typography variant="subtitle2" gutterBottom style={{ textTransform: 'capitalize' }}>
                  {category}
                </Typography>
                <Divider orientation='horizontal' />
                <br />
                <Card style={{ background: 'var(--primaryWhite)', maxWidth: '275' }}>
                  <CardContent>
                    <Typography variant="body1" component="strong">
                      Precio:
                    </Typography>
                    <Typography style={{ textTransform: 'uppercase' }}>
                      DOP {' '}{variation[key].price}
                    </Typography>
                  </CardContent>
                  <ProductContext.Consumer>
                    {value =>
                      <AuthUserContext.Consumer>
                        {authUser =>
                          <CardActions>
                            <Button color='secondary' variant='contained' size="large" onClick={() => {
                              if (!authUser) {
                                OpenConfirmation()
                              } else {
                                value.addToCart(uid, 1, key, variation[key].variationUID, authUser,() => {})
                              }
                            }}
                              disabled={variation[key].inCart ? true : false
                              }>
                              {variation[key].inCart ? "En carrito" : "Agregar a carrito"}

                            </Button>
                          </CardActions>
                        }
                      </AuthUserContext.Consumer>
                    }
                  </ProductContext.Consumer>

                  {open2 &&
                    <Dialog
                      open={open2}
                      onClose={HideConfirmation}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <LoginRequest />

                    </Dialog>
                  }
                </Card>
              </Grid>
              <Grid item>
                <Divider orientation='horizontal' />
                <br />
                <Button color='secondary' onClick={() => props.history.push(`/productos/${brand}/${name}/${uid}/${key}`)}>
                  Ver Detalles
                </Button>

              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </DialogContent>
    </Dialog>

  )

  return (
    <Grid item xs>
      <Card className={classes.card} elevation={4}>
        <CardHeader
          className={classes.header}
          avatar={
            variation[key].quantity > 0 ? (<Tooltip title="Disponible"><img className='icon-sm' alt='Disponible' src={onStock}></img></Tooltip>) 
            : (<Tooltip title="Sin existencia"><img className='icon-sm' alt='No disponible' src={outStock}></img></Tooltip>)
          }
          disableTypography
        />
        <CardMedia
          className={classes.media}
          image={variation[key].profile ? variation[key].profile : NoDisponible}
          title={name}
          aria-expanded={grow}
          onClick={() => props.history.push(`/productos/${brand}/${name}/${uid}/${key}`)}
          onMouseOver={handleGrow} onMouseLeave={handleGrowClose}
          children={
            <div className={classes.container}>
              <Grow in={grow} >
                <Button variant="outlined" color="secondary" fullWidth aria-controls={menuId}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClickOpen()
                  }
                  }>
                  Ver Detalles
                </Button>
              </Grow>
            </div>
          }
        >
        </CardMedia>

        <Divider orientation='horizontal' />

        <CardContent className={classes.content}>
          <Grid container justify="center" alignItems="center">
            {variation && Object.keys(variation || {}).map((key) => {
              return (
                <Avatar key={key} onClick={() => handleAvatarChange(key)} alt={name + ` - ` + variation[key].color} src={variation[key].profile} className={classes.avatar} />
              )
            })}
          </Grid>
          <Grid container alignItems='center' spacing={2} className={classes.container}>
            <Grid item xs={10}>
              <Typography gutterBottom component={Link} to={`/productos/${brand}/${name}/${uid}/${key}`} variant="body1" color="inherit" style={{ textTransform: 'uppercase' }}>
                <ListItemText primary={brand + ` - ` + name} secondary={`- ` + variation[key].color} />
              </Typography>
            </Grid>
            <Grid item xs={2} >
              <Typography gutterBottom component={Link} to={`/productos/${brand}/${name}/${uid}/${key}`} variant="body2" color="primary" style={{ textTransform: 'uppercase' }}>
                <ListItemText primary={` $` + variation[key].price} />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>

        </CardContent>
      </Card>
      <ViewDetails></ViewDetails>
    </Grid>
  )
}

ProductCastShow.propTypes = {
  product: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    brand: PropTypes.string,
    category: PropTypes.string,
    inCart: PropTypes.bool,
    variation: PropTypes.array,
  }).isRequired
}


const ProductCast = compose(withRouter)(ProductCastShow)

export default ProductCast;