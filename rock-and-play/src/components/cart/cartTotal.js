import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Grid, Button, Typography, } from '@material-ui/core'
import useStyles from './Styles'
import Paypalv3 from './Paypalv3'

const CartTotal = ({value, authUser, history}) => {
    const {cartSubTotal, cartTax, cartTotal, clearCart, createOrder, eraseCart} = value; 
    const classes = useStyles()
    return(
        <Container className={classes.root}>
            <Grid container spacing={2} justify="flex-end" style={{textAlign: 'end'}} >
                <Grid item className={classes.underCard}>
                    <Button variant='outlined' color='secondary'
                    onClick={() => { clearCart() }}
                    >Limpiar Carrito</Button>
                    <Typography color='textSecondary' variant='h6'>SubTotal :<strong>$ {cartSubTotal}</strong></Typography>
                    <Typography color='textSecondary' variant='h6'>Impuestos :<strong>$ {cartTax}</strong></Typography>
                    <Typography color='textSecondary' variant='h6'>Total :<strong>$ {cartTotal}</strong></Typography>
                    <Paypalv3 createOrder={createOrder} total={cartTotal} tax={cartTax} eraseCart={eraseCart}
                    subtotal={cartSubTotal} history={history} authUser={authUser} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default CartTotal