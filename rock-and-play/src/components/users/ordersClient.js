import React from 'react'
import AuthUserContext from '../../sessioncontext/context'
import {Redirect} from 'react-router-dom'
import {ProductContext} from '../../sessioncontext/ProductContext'
import { Typography} from '@material-ui/core'
import useStyles from '../tablepages/Styles'
import OrderList from './orderList';

const OrdersClient = () => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <div className={classes.container}>
            <AuthUserContext.Consumer>
                {authUser => 
                    !authUser ? (<Redirect to="/"/>) : 
                    (
                        <ProductContext.Consumer>
                            {value =>
                                value.userOrders.length > 0 ? 
                                (
                                    <OrderList userOrders={value.userOrders}></OrderList>
                                ) : (
                                    <div>
                                        <Typography variant="h6" component="h1"><b>Aun no ha hecho ninguna compra en la tienda</b></Typography>
                                        <Typography variant="subtitle1" component="h1">Pruebe Comprar en nuestra seccion de departamentos</Typography>
                                    </div>
                                )
                            }
                        </ProductContext.Consumer>
                    )
                }
            </AuthUserContext.Consumer>
            </div>
        </div>
    )
}

export default OrdersClient