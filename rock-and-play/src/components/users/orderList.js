import React from 'react'
import Order from './order';

const OrderList = (props) => {

    return(
        <div>
            {props.userOrders.map((order,i) => (
                <Order order={order} key={order.uid} />
            ))}
        </div>
    )
}

export default OrderList;