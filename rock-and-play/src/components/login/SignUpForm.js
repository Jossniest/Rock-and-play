import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import { compose } from 'redux';
import {Redirect} from 'react-router-dom'
import { withFirebase } from '../../config/context';
import {TextInput, Button,Icon} from 'react-materialize';
import AuthUserContext from '../../sessioncontext/context'



const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email ya siendo usado';

const ERROR_MSG_ACCOUNT_EXISTS = `
  Una Cuenta con este email ya existe.
  Pruebe iniciar sesion con este email.
  Si cree que la cuenta esta siendo usada por algun otro usuario, 
  pruebe introduciendo otro email diferente`;

const init_state = {
    
        name: '',
        lastname: '',
        email: '',
        password: '',
        repassword: '',
        error: null,
        isAdmin: false,
}


class SignUpFormBase extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...init_state       
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        e.preventDefault();
        const { name, value} = e.target;     
        this.setState({[name]: value})
    }
    handleSubmit(e){      
        const {name, lastname, email, password, isAdmin} = this.state
        const roles = {}
        
        this.props.firebase.doCreateUserWithEmailAndPassword(email, password).then(authUser => {
          return this.props.firebase.user(authUser.user.uid).set({
              name,
              lastname,
              email,
              isAdmin,
              roles,
            },
            {merge: true},
          ).then(() => {
            this.props.firebase.doCreateUserCart(authUser.user.uid)
        })
        })
        .then(() =>{
            return this.props.firebase.doSendEmailVerification();
        })
        .then(()=>{
            this.setState({...init_state});
            this.props.history.push('/')
        }).catch(error =>{
            if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                error.message = ERROR_MSG_ACCOUNT_EXISTS;
              }     
              this.setState({ error });
        })
        e.preventDefault();     
    }  

    
    render(){
        const { name, lastname, password, repassword, email, error} = this.state
             
        const isInvalid = 
        password !== repassword ||
        password === '' ||
        email === '' ||
        name === '' ||
        lastname === '';

        return(
        <AuthUserContext.Consumer>
            {authUser => 
            authUser ? (
                <Redirect to="/"></Redirect>    
            ) : 
            (
            <div className="FormCenter">
                
                <form className="FormFields" onSubmit={this.handleSubmit}>
                    
                    <TextInput placeholder="Nombre (Obligatorio)" inputClassName="text-button" name="name"  
                    value={this.state.name}  onChange={this.handleChange}
                    validate required="required" aria-required="true"></TextInput>

                    <TextInput placeholder="Apellido (Obligatorio)" inputClassName="text-button" name="lastname" 
                    value={this.state.lastname}  onChange={this.handleChange}
                    validate required="required" aria-required="true"></TextInput>

                    <TextInput placeholder="Correo Electronico (Obligatorio)" inputClassName="text-button" name="email" 
                    value={this.state.email}  onChange={this.handleChange}
                    email validate  required="required" aria-required="true"></TextInput>

                    <TextInput placeholder="Contraseña (Obligatorio)" inputClassName="text-button" name="password" 
                    value={this.state.password}  onChange={this.handleChange}
                    password validate required="required" aria-required="true"></TextInput>

                    <TextInput placeholder="Verificar Contraseña (Obligatorio)" inputClassName="text-button" name="repassword" 
                    value={this.state.repassword}  onChange={this.handleChange}
                    password validate required="required" aria-required="true"></TextInput>
                    <Button type="submit" waves="red" disabled={isInvalid} className="FormField__Button deep-orange accent-3">
                        Resgistrarse
                        <Icon right className="icons">
                        send
                        </Icon>
                    </Button>
                    <Link to='/login/sign-in' className="FormField__Link">Ya me he registrado</Link>
                    {error && <p className="text-error">{error.message}</p>}                  
                </form>
            </div>
            )
            }
        </AuthUserContext.Consumer>
        )
    }
}


const SignUpForm = compose(withRouter,withFirebase)(SignUpFormBase);

export default SignUpForm;