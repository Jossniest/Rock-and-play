import React, {Component} from 'react';
import {Button} from 'react-materialize';
import {withRouter} from 'react-router-dom'
import {compose} from 'redux';
import { withFirebase } from '../../config/context';

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/La cuenta existe con diferentes credenciales.';

const ERROR_MSG_ACCOUNT_EXISTS = `Una cuenta con una direccion de correo electronico correspondiente
  a esta red social ya existe. Pruebe mejor iniciar sesion desde esta cuenta.`;

class SignInGoogleBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = { error: null };
    }
  
    onSubmit = async (event) => {
      event.preventDefault();
      console.log("aqui")
      await this.props.firebase
        .doSignInWithGoogle()
        .then(socialAuthUser => {
          // Create a user in your Firebase Realtime Database too
          return this.props.firebase.user(socialAuthUser.user.uid).set(
            {
              name: socialAuthUser.user.displayName,
              email: socialAuthUser.user.email,
              isAdmin: false,
              roles: {},
            },
            { merge: true },
          ).then(() => {
            this.props.firebase.doCreateUserCart(socialAuthUser.user.uid)
        })
        })
        .then(() => {
          this.setState({ error: null });
        }).then(() =>{
          console.log("ya te esta redirigiendo")
          this.props.history.push('/');
        })
        .catch(error => {
          if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
            error.message = ERROR_MSG_ACCOUNT_EXISTS;
          }
  
          this.setState({ error });
        });
  
     
    };
  
    render() {
      const { error } = this.state;
  
      return (
        <form onSubmit={this.onSubmit}>
          <Button type="submit" waves="red" className="red darken-4 mt-25">
                Iniciar Con Google       
            </Button>
  
          {error && <p className="text-error">{error.message}</p>}
        </form>
      );
    }
  }

const SignInWithGoogle = compose(
    withRouter,
    withFirebase,
  )(SignInGoogleBase);
export default SignInWithGoogle;
  