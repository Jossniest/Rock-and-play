import React, { Component } from 'react';
import './Login.css';
import { Route, withRouter, NavLink, Switch } from 'react-router-dom';
import fireIcon from '../../resources/firebase-icon.png';
import reactIcon from '../../resources/react-icon.png';
import { compose } from 'redux'
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { withFirebase } from '../../config/context'

class LoginForm extends Component {
    render() {
        return (

            <div className="Login">
                {/*Parte de la izquierda */}
                <div className="Login_Aside">
                    <h1 className="text-title blue-grey darken-4">{'Rock & Play'}</h1>
                    <h5 className="sub-title1"><em>Tu tienda preferida de instrumentos</em></h5>

                    {/* Aqui va la parte de la info*/}
                    <div className="info_box text-dark">
                        <p className="text-description">Al unirte recibes los siguientes beneficios</p>
                        <ul className="text-description">
                            <li><i className="tiny material-icons">check</i>Realizar Compras</li>
                            <li><i className="tiny material-icons">check</i>Inspeccionar Pedidos</li>
                            <li><i className="tiny material-icons">check</i>Ser participe de maravillosas ofertas</li>
                        </ul>
                        <h2 style={{ marginBottom: "70px" }} className="sub-title2">¡Comienza ya!</h2>
                    </div>
                    <div className="text-description">
                        <h6>Powered By</h6>
                        <img src={fireIcon} alt="fire-icon" className="icon"></img>
                        <img src={reactIcon} alt="react-icon" className="icon"></img>
                        <h6>Created By <cite>Jossniest</cite></h6>
                    </div>
                </div>
                <div className="Login_Form">

                    <div className="FormTitle">
                        <NavLink to="/login/sign-in" activeClassName="FormTitle_Link--Active" className="FormTitle_Link">Iniciar Sesión</NavLink> o
                    <NavLink to="/login/sign-up" activeClassName="FormTitle_Link--Active" className="FormTitle_Link">Registrarse</NavLink>
                    </div>
                    
                        <Route exact path="/login/sign-in" component={SignInForm}></Route>
                        <Route exact path="/login/sign-up" component={SignUpForm}></Route>
                    

                </div>
            </div>

        )
    }
}

const Login = compose(withFirebase, withRouter)(LoginForm)

export default Login
