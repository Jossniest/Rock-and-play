import React from 'react'
import CartItem from './cartItem'
import useStyles from './Styles'

const CartList = (props) => {
    const classes = useStyles()
    const { cart } = props.value

    return (   
        <div className={classes.root}>
        <React.Fragment>
            {cart.map((item, i) => {
                return <CartItem key={item.productUid} item={item} value={props.value}></CartItem>
            })}
        </React.Fragment>
        </div>
    )
}

export default CartList