import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, DialogTitle, Dialog, DialogContent, DialogActions, DialogContentText,Typography } from '@material-ui/core'

import useStyles from '../navbar/Navstyles'

const LoginRequest = (props) => {
    const classes = useStyles()
    return (
        <div>
            <DialogTitle id="alert-dialog-title">{"Proceso no Permitido"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography>
                        Actualmente no esta registrado para realizar esta accion
                    </Typography>
                    <Typography>
                        Registrese primero o Inicie sesion
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {props.history.push('/login/sign-up')}} className={classes.button} color="primary">
                    Registrarse
                 </Button>
                <Button onClick={() => {props.history.push('/login/sign-in')}} className={classes.button} color="primary">
                    Iniciar sesion
                </Button>
            </DialogActions>

        </div>
    )

}

export default withRouter(LoginRequest)