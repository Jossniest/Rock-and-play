import React from 'react';
import AuthUserContext from '../../sessioncontext/context'
import { ProductConsumer } from '../../sessioncontext/ProductContext'
import { withRouter, Redirect, Link } from 'react-router-dom'
import {
    Divider, Button, Typography, Grid, List, ListItem, ListItemAvatar, ListItemIcon,
    Container, CardMedia
} from '@material-ui/core'
import useStyles from './Styles'
import { useTheme } from '@material-ui/core/styles'
import CartList from './cartList'
import CartTotal from './cartTotal'

const CartPage = (props) => {
    const classes = useStyles();
    const theme = useTheme();


    const Cart = ({ value, authUser }) => {
        const { cart } = value

        return (
            <div>
                <Typography variant='h5' component='h1' gutterBottom color='textSecondary'>
                    {cart.length}{' '} Articulos
            </Typography>
                <Divider orientation='horizontal' className={classes.divider}></Divider>
                <CartList value={value} />
                <CartTotal value={value} authUser={authUser} history={props.history}> </CartTotal>
                

            </div>
        )
    }
    return (
        <AuthUserContext.Consumer>
            {authUser =>
                !authUser ?
                    (<Redirect to="/"></Redirect>)
                    :
                    (
                        <div className={classes.root}>
                            <div className={classes.TitleDisplay}>
                                <Typography color='secondary' variant='h5' >Carrito De Compras</Typography>
                            </div>
                            <div className={classes.container} >
                                <ProductConsumer>
                                    {value => {

                                        return value.cart.length > 0 ?
                                            (<div><Cart value={value} authUser={authUser} /></div>)
                                            :
                                            (
                                                <div>
                                                    <Typography variant="h6" component="h1"><b>No hay productos en su Carrito</b></Typography>
                                                    <Typography variant="subtitle1" component="h1">Continue Comprando</Typography>
                                                </div>
                                            )
                                    }
                                    }
                                </ProductConsumer>
                            </div>
                        </div>
                    )
            }

        </AuthUserContext.Consumer>

    )

}

export default withRouter(CartPage);

/*<Card className={classes.card}>
            <div className={classes.details}>
                <CardMedia
                    className={classes.cover}
                    image= ''
                    title= {product.name}
                />
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {product.name}
                    </Typography>
                </CardContent>

            </div>
        </Card> */