import React from 'react';
import { withFirebase } from '../../config/context';
import { Button, MenuItem, DialogTitle, Dialog, DialogContent, DialogActions, DialogContentText, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import useStyles from '../navbar/Navstyles'
import { ExitToApp } from '@material-ui/icons'


const SignOut = (props) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);

  const ShowConfirmation = () => {
    setOpen(true);
  }
  const HideConfirmation = () => {
    setOpen(false);
  }
  const Logout = () => {
    props.firebase.doSignOut().then(() => {
      HideConfirmation()
    })
  }

  return (
    <div>
      <MenuItem onClick={ShowConfirmation} >
        
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Salir" />
      
      </MenuItem>

      <Dialog
        open={open}
        onClose={HideConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"ADVERTENCIA"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Desea Cerrar Sesión?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={HideConfirmation} className={classes.button} color="primary">
            Cancelar
          </Button>
          <Button onClick={Logout} className={classes.button} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>


    </div>
  )
}


export default withFirebase(SignOut);