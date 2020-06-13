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
        value: '',
        label: ''
    },
    {
        value: 'Republica Dominicana',
        label: 'Rep. Dom.'
    },
    {
        value: 'Otro',
        label: 'Otro'
    }
]

const UserLocationForm = (props) => {
    const classes = useStyles()
    const [snackbar, setSnackbar] = useState(false)
    const [load, setLoad] = useState(false)
    const [address, setAddress] = useState('')
    const [postalcode, setPostalcode] = useState('')
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')

    const handleSubmit = (e, uid) => {
        e.preventDefault()
        setLoad(true)
        let userData = {}
        const currentUser = props.firebase.user(uid)
        currentUser.get()
            .then((doc) => Object.assign(userData, doc.data()))


        props.firebase.user(uid).update({
            ...userData,
            address,
            postalcode,
            province,
            city,
            country,
            editedAt: props.firebase.fieldValue.serverTimestamp(),
        }).then(() => setLoad(false))
        if(load === false){
            props.history.push('/profile')
        }

    }


    let isInvalid = (address === '') || (postalcode === '') || (province === '') || (city === '') || (country === '')

    return (
        <AuthUserContext.Consumer>
            {authUser =>
                !authUser || authUser.address ? (<Redirect to='/' />) :
                    (
                        <div className={classes.root}>
                            <div className={classes.container}>
                                <Card>
                                    <CardHeader
                                        title="Administrar Direccion"
                                    />
                                    <CardContent>
                                        <form>
                                            <List>
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
                                                    />

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

                                                    />

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
                                                    />

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
                                                    />

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
                                                    >
                                                        {paises.map(option => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </TextField>

                                                </ListItem>

                                            </List>
                                        </form>
                                    </CardContent>
                                    <CardActions className={classes.actionButton}>
                                        <Button variant='contained' onClick={() => props.history.goBack()}>Cancelar</Button>
                                        <Button onClick={(e) => handleSubmit(e, authUser.uid)} disabled={isInvalid} variant='contained' color='secondary'>Cambiar</Button>
                                    </CardActions>
                                </Card>
                            </div>

                        </div>
                    )
            }
        </AuthUserContext.Consumer>
    )
}

const UserLocation = compose(withFirebase, withRouter)(UserLocationForm)

export default UserLocation