import React from 'react';
import './App.css';
import Login from './components/login/';
import HomeForm from './components/tablepages'
import Navigation from './components/navbar/navigation'
import CartPage from './components/cart/cartPage'
import ProductContainer from './components/products/productContainer'
import Default from './components/tablepages/Default'
import ProductDetails from './components/products/productdetails'
import UserProfile from './components/users/profile'
import EditUser from './components/users/edit'
import Location from './components/tablepages/location'
import NewProduct from './components/products/newProduct'
import UserLocation from './components/users/address'
import OrdersClient from './components/users/ordersClient'
import {BrowserRouter as Router, Route, Switch, NavLink, withRouter} from 'react-router-dom';
import withAuthentication from './sessioncontext/withAuthentication'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {Breadcrumbs} from 'react-breadcrumbs-dynamic'
import {compose} from 'redux'


const theme = createMuiTheme({
  typography: {
    fontFamily: ['Lato','Oswald','Hepta Slab', 'Segoe UI'].join(','),
    
  },
  palette: {
    text: {
      primary: '#212121',
      secondary: '#232528',
    },
    secondary: {
      main: '#ff5722',
      light: '#ff8a65',
      dark: '#ff3d00',
    },
  
  }
},)

function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <Router>
    <div>
      
        <Navigation></Navigation>
        <Breadcrumbs 
          hideIfEmpty
          separator={<b> >  </b>}
          item={NavLink}
          finalItem={'b'}
          container={'div'}
          containerProps={{style:{color:'white',textTransform: 'capitalize',display:'flex',justifyContent:'flex-start',padding:'1vh 2vw',background:'#232528'}}}
          finalProps={{style:{color:'#e0e0e0'}}}
        ></Breadcrumbs>
        <Switch>
          <Route exact path='/' component={HomeForm}></Route>
          <Route path="/cart" component={CartPage}></Route>
          <Route path="/profile" component={UserProfile}></Route>
          <Route path="/location" component={Location}></Route>
          <Route path="/edit/user" component={EditUser}></Route>
          <Route path="/edit/address" component={UserLocation}></Route>
          <Route path="/user/orders" component={OrdersClient}></Route>
          <Route path="/productos/new" component={NewProduct}></Route>
          <Route exact path='/productos/:category/:subcategory?' component={props => {
            const { match: { params: {category, subcategory}} } = props
            return (
              <ProductContainer key={`productos&category=${category}&subcategory=${subcategory}`} {...props}></ProductContainer>
            )
          }}></Route>
          <Route path={`/productos/:brand?/:name?/:uid?/:key?`} component={props => {
            const { match: { params: {brand, name, uid, key} }} = props
            return (
              <ProductDetails key={`productos&brand=${brand}&type=${name}&uid=${uid}&key=${key}`} {...props}></ProductDetails>
            )
          }} /> 
          
         
          <Route path="/login" component={Login}></Route>
          <Route component={Default}></Route>
        </Switch>
      
    </div>
    </Router>
    </MuiThemeProvider>
  );
}

export default withAuthentication(App);
