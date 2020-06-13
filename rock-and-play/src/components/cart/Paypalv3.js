import React, { useState, useRef, useEffect } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'

const Paypalv3 = ({ createOrder, total, tax, eraseCart, history, authUser, subtotal }) => {
    return (
        <PayPalButton
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            currency_code: "USD",
                            value: 1,
                        }
                    }],
                    // application_context: {
                    //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
                    // }
                });
            }}
            onApprove={async (data, actions) => {
                // Capture the funds from the transaction
                const order = await actions.order.capture();
                createOrder(order, authUser, total, tax, subtotal, () => {
                    eraseCart();
                    history.push('/')
                })

                console.log(order);
                /*return actions.order.capture().then(function(details) {
                  // Show a success message to your buyer
                  alert("Transaction completed by " + details.payer.name.given_name);
       
                  // OPTIONAL: Call your server to save the transaction
                  console.log(data);
            });*/
            }}
            options={{
                clientId: "ARGHEfTmUbXtaNXUKo9odbn6n3KuLOxunCdm064Oy_XHf6gTIhEOgUlhoyi-5N_AKyUxL48QyheEJI6X",
                commit: true,
            }}
        ></PayPalButton >


    )
}

export default Paypalv3