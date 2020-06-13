import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom'
import { withFirebase } from '../../config/context';
import { TextInput, Button, Icon } from 'react-materialize';
import SignInWithGoogle from './SigninGoogle';
import AuthUserContext from '../../sessioncontext/context'
import { Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from '@material-ui/core'
import { Lock } from '@material-ui/icons'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  emailVerification: ''
}
const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/La cuenta existe con diferentes credenciales.';

const ERROR_MSG_ACCOUNT_EXISTS = `Una cuenta con una direccion de correo electronico correspondiente
  a esta red social ya existe. Pruebe mejor iniciar sesion desde esta cuenta.`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      open: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    this.setState({
      [name]: value
    })
  }
  handleSubmit(e) {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ error });
      });
    e.preventDefault();
  }

  onSendPasswordResetEmail = (callback) => {
    const {emailVerification} = this.state
    if(emailVerification !== ''){
      this.props.firebase.doPasswordReset(emailVerification)
    }
    
  }
  
  OpenConfirmation = () => {
    this.setState({
      open: true
    });
  }

  HideConfirmation = () => {
    this.setState({
      open: false
    });
  }
  render() {
    console.log(this.props)
    const { open } = this.state
    const { authUser } = this.props;
    if (authUser) return <Redirect to="/"></Redirect>
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <Redirect to="/"></Redirect>
          ) : (
              <div className="FormCenter">
                <form className="FormFields" onSubmit={this.handleSubmit}>

                  <TextInput placeholder="Correo Electronico" inputClassName="text-button" name="email"
                    value={this.state.email} onChange={this.handleChange}
                    email validate required="required" aria-required="true"></TextInput>

                  <TextInput placeholder="Contraseña" inputClassName="text-button" name="password"
                    value={this.state.password} onChange={this.handleChange}
                    password validate required="required" aria-required="true"></TextInput>
                  <Button type="submit" waves="red" disabled={isInvalid} className="FormField__Button deep-orange accent-3">
                    Acceder
                    <Icon right className="icons">
                      send
                    </Icon>
                  </Button>
                  <Link to='/login/sign-up' className="FormField__Link">Crearse una cuenta</Link>
                  <br />
                  <br />
                  <Button className="FormField__Button deep-orange accent-3" onClick={this.OpenConfirmation}>
                    Olvidaste tu Contraseña
                  </Button>
                  <SignInWithGoogle></SignInWithGoogle>
                  {error && <p className="text-error">{error.message}</p>}
                </form>
                {open &&
                  <Dialog
                    open={open}
                    onClose={this.HideConfirmation}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="form-dialog-title">Cambio de Contraseña</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Escriba su correo electronico para poder disponer de un restablecimiento de su contraseña
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="email verification"
                        label="Email Address"
                        type="email"
                        name="emailVerification"
                        fullWidth
                        onChange={this.handleChange}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.HideConfirmation} color="primary">
                        Cancelar
                      </Button>
                      <Button onClick={() => {this.onSendPasswordResetEmail()
                      this.HideConfirmation()
                      }} color="secondary">
                        Enviar
                      </Button>
                    </DialogActions>

                  </Dialog>
                }

              </div>
            )}
      </AuthUserContext.Consumer>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
export default SignInForm;