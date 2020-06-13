import React from 'react';
import { IconButton, Badge, Tooltip, MenuItem } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { ProductConsumer } from '../../sessioncontext/ProductContext'



export const ToolTipCart = () => {
  return (
    <ProductConsumer>
      {value => {
        let itemsCount = value.cart.length;
        return (
          <Link to="/cart" style={{ color: '#ffffff' }}>
            <Tooltip title="Carrito" >
              <IconButton size="medium"
                edge="end"
                aria-label="Ver contenido del carrito"
                color="inherit"

              >
                <Badge badgeContent={itemsCount} color="secondary">
                  <ShoppingCart></ShoppingCart>
                </Badge>
              </IconButton >
            </Tooltip>
          </Link>
        )
      }

      }
    </ProductConsumer>
  )
}

export const CartButton = () => {
  return (
    <ProductConsumer>
      {value => {
        let itemsCount = value.cart.length;
        return (
          <MenuItem component={Link} to="/cart">
            <IconButton
              aria-label="Iniciar sesion de usuario"
              aria-controls="Menu-Desktop"
              aria-haspopup="true"
              color="inherit"
            >
              <Badge badgeContent={itemsCount} color="secondary">
                <ShoppingCart></ShoppingCart>
              </Badge>
            </IconButton>
            <p>Carrito</p>
          </MenuItem>
        )
      }

      }
    </ProductConsumer>
  )
}




