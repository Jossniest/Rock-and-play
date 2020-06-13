import React, { useState, useContext, useEffect } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { withFirebase } from '../../config/context'
import AuthUserContext from '../../sessioncontext/context'
import {
    Card, CardContent, CardHeader, CardActions, List, ListItem, ListItemSecondaryAction,
    Button, TextField, IconButton, Snackbar, ListItemText,
} from '@material-ui/core'
import { Create, Lock } from '@material-ui/icons'
import useStyles from '../tablepages/Styles'
import { compose } from 'redux'

const paises = [
    {
        value: 'Republica Dominicana',
        label: 'Rep. Dom.'
    },
    {
        value: 'Otro',
        label: 'Otro'
    }
]

const EditUserForm = (props) => {
    const classes = useStyles()
    const userContext = useContext(AuthUserContext)
    const [snackbar, setSnackbar] = useState(false)
    const [load, setLoad] = useState(false)
    const [enable, setEnable] = useState({
        name: false,
        lastname: false,
        email: false,
        address: false,
        postalcode: false,
        province: false,
        city: false,
        country: false,
    })
    const [name, setName] = useState(userContext.name)
    const [lastname, setLastname] = useState(userContext.lastname ? userContext.lastname : '')
    const [email, setEmail] = useState(userContext.email)
    const [address, setAddress] = useState(userContext.address ? userContext.address : '')
    const [postalcode, setPostalcode] = useState(userContext.postalcode ? userContext.postalcode : '')
    const [province, setProvince] = useState(userContext.province ? userContext.province : '')
    const [city, setCity] = useState(userContext.city ? userContext.city : '')
    const [country, setCountry] = useState(userContext.country ? userContext.country : '')


    const handleSnackBarOpen = () => {
        setSnackbar(true);
    };
    const handleSnackBarClose = () => {
        setSnackbar(false);
    };
    const handleEnableInput = name => event => {
        setEnable({ ...enable, [name]: [!name] })
    }
    const handleSubmit = (e, uid) => {
        e.preventDefault()
        setLoad(true)
        let userData = {}
        const currentUser = props.firebase.user(uid)
        currentUser.get()
        .then((doc) => Object.assign(userData,doc.data()))
        
        if(!userData.address){
            props.firebase.user(uid).update({
                ...userData,
                name,
                lastname,
                email,
                editedAt: props.firebase.fieldValue.serverTimestamp(),
            }).then(() => props.history.push('/profile'))
        }else{
            props.firebase.user(uid).update({
                ...userData,
                name,
                lastname,
                email,
                address,
                postalcode,
                province,
                city,
                country,
                editedAt: props.firebase.fieldValue.serverTimestamp(),
            }).then(() => setLoad(false))
        }
        if(load === false){
            props.history.push('/profile')
        }
        
    }

    const onSendPasswordResetEmail = (email) => {
        props.firebase.doPasswordReset(email)
    }
    let isInvalid
    if(!userContext.address){
        isInvalid = (name === '') || (lastname === '') || (email === '') 
    }
    else if(!userContext.address && !userContext.lastname){
        isInvalid = (name === '') || (email === '') 
    }
    else if(userContext.address && !userContext.lastname){
        isInvalid = (name === '') || (email === '') || (address === '') || (postalcode === '') || (province === '') || (city === '') || (country === '')
    }
    else{
        isInvalid = (name === '') || (lastname === '') || (email === '') || (address === '') || (postalcode === '') || (province === '') || (city === '') || (country === '')
    }
    
    return (
        <AuthUserContext.Consumer>
            {authUser =>
                !authUser ? (<Redirect to='/' />) :
                    (
                        <div className={classes.root}>
                            <div className={classes.container}>
                                <Card>
                                    <CardHeader
                                        title="Editar usuario"
                                    />
                                    <CardContent>
                                        <form>
                                            <List>
                                                <ListItem>
                                                    <TextField
                                                        error={name === '' ? true : false}
                                                        id="name"
                                                        label="Nombre"
                                                        helperText="Inserte su nombre"
                                                        className={classes.textField}
                                                        margin='normal'
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        disabled={!enable.name}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton edge='end' onClick={handleEnableInput('name')}>
                                                            <Create />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                                {authUser.lastname && (
                                                    <ListItem>
                                                        <TextField
                                                            error={lastname === '' ? true : false}
                                                            id="lastname"
                                                            label="Apellido"
                                                            helperText="Inserte su apellido"
                                                            className={classes.textField}
                                                            margin='normal'
                                                            value={lastname}
                                                            onChange={(e) => setLastname(e.target.value)}
                                                            disabled={!enable.lastname}
                                                        />
                                                        <ListItemSecondaryAction>
                                                            <IconButton edge='end' onClick={handleEnableInput('lastname')}>
                                                                <Create />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                )}
                                                <ListItem>
                                                    <TextField
                                                        error={email === '' ? true : false}
                                                        id="email"
                                                        label="Correo"
                                                        helperText="Inserte su correo"
                                                        className={classes.textField}
                                                        margin='normal'
                                                        value={email}
                                                        
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        disabled={!enable.email}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton edge='end' onClick={handleEnableInput('email')}>
                                                            <Create />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                                {authUser.address && (
                                                    <React.Fragment>
                                                        <ListItem>
                                                            <TextField
                                                                error={address === '' ? true : false}
                                                                id="address"
                                                                label="Direccion"
                                                                helperText="Inserte su direccion"
                                                                className={classes.textField}
                                                                margin='normal'
                                                                value={address}
                                                                
                                                                onChange={(e) => setAddress(e.target.value)}
                                                                disabled={!enable.address}
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <IconButton edge='end' onClick={handleEnableInput('address')}>
                                                                    <Create />
                                                                </IconButton>
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                        <ListItem>
                                                            <TextField
                                                                error={postalcode === '' ? true : false}
                                                                id="postalcode"
                                                                label="Codigo Postal"
                                                                helperText="Inserte su codigo postal"
                                                                className={classes.textField}
                                                                margin='normal'
                                                                value={postalcode}
                                                                
                                                                onChange={(e) => setPostalcode(e.target.value)}
                                                                disabled={!enable.postalcode}
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <IconButton edge='end' onClick={handleEnableInput('postalcode')}>
                                                                    <Create />
                                                                </IconButton>
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                        <ListItem>
                                                            <TextField
                                                                error={province === '' ? true : false}
                                                                id="province"
                                                                label="Provincia"
                                                                helperText="Inserte su provincia/estado"
                                                                className={classes.textField}
                                                                margin='normal'
                                                                value={province}
                                                                
                                                                onChange={(e) => setProvince(e.target.value)}
                                                                disabled={!enable.province}
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <IconButton edge='end' onClick={handleEnableInput('province')}>
                                                                    <Create />
                                                                </IconButton>
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                        <ListItem>
                                                            <TextField
                                                                error={city === '' ? true : false}
                                                                id="city"
                                                                label="Ciudad"
                                                                helperText="Inserte su ciudad"
                                                                className={classes.textField}
                                                                margin='normal'
                                                                value={city}
                                                                onChange={(e) => setCity(e.target.value)}
                                                                disabled={!enable.city}
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <IconButton edge='end' onClick={handleEnableInput('city')}>
                                                                    <Create />
                                                                </IconButton>
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                        <ListItem>
                                                            <TextField
                                                                error={country === '' ? true : false}
                                                                id="country"
                                                                label="Pais"
                                                                select
                                                                helperText="Seleccione su pais de los disponibles"
                                                                className={classes.textField}
                                                                margin='normal'
                                                                SelectProps={{
                                                                    native: true,
                                                                }}
                                                                value={country}
                                                                
                                                                onChange={(e) => setCountry(e.target.value)}
                                                                disabled={!enable.country}
                                                            >
                                                                {paises.map(option => (
                                                                    <option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </TextField>
                                                            <ListItemSecondaryAction>
                                                                <IconButton edge='end' onClick={handleEnableInput('country')}>
                                                                    <Create />
                                                                </IconButton>
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                    </React.Fragment>
                                                )}

                                                <ListItem>
                                                    <ListItemText primary='Cambiar contraseña' secondary='Se enviara una peticion en tu correo' />
                                                    <ListItemSecondaryAction>
                                                        <IconButton edge='end' onClick={() => 
                                                        {onSendPasswordResetEmail(authUser.email)
                                                        handleSnackBarOpen()
                                                        }
                                                        }>
                                                            <Lock />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>

                                            </List>
                                        </form>
                                    </CardContent>
                                    <CardActions className={classes.actionButton}>
                                        <Button variant='contained' onClick={() => props.history.push('/profile')}>Cancelar</Button>
                                        <Button onClick={(e) => handleSubmit(e, authUser.uid)} disabled={isInvalid} variant='contained' color='secondary'>Cambiar</Button>
                                    </CardActions>
                                </Card>
                            </div>
                            <Snackbar
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                open={snackbar}
                                onClose={handleSnackBarClose}
                                ContentProps={{
                                    'aria-describedby': 'message-id',
                                }}
                                autoHideDuration={2000}
                                onRequestClose={handleSnackBarClose}
                                message={<span id='message-id'>Peticion enviada, vea su correo electronico</span>}
                            />
                        </div>
                    )
            }
        </AuthUserContext.Consumer>
    )
}

const EditUser = compose(withFirebase, withRouter)(EditUserForm)

export default EditUser