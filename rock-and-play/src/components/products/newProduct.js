import React, { useState } from 'react'
import { ProductContext } from '../../sessioncontext/ProductContext'
import AuthUserContext from '../../sessioncontext/context'
import { Redirect, withRouter } from 'react-router-dom'
import {
    CircularProgress, Typography, Card, CardContent, CardHeader, CardActions, List, ListItem, ListItemSecondaryAction,
    Button, TextField, IconButton, Snackbar, ListItemText, Divider, FormControl, InputLabel,
    Select, FormHelperText, TextareaAutosize
} from '@material-ui/core'
import useStyles from './productsStyles'
import { compose } from 'redux'
import { withFirebase } from '../../config/context'
import { callbackify } from 'util'
import { Save } from '@material-ui/icons'

const initState = {
    category: '',
    subcategory: '',
    brand: '',
    description: '',
    name: '',
    variation: [],
}
const initVariation = {
    color: '',
    inCart: false,
    precio: 0,
    quantity: 0,
    profile: null,
    images: [],
}

const NewProductForm = (props) => {
    const classes = useStyles();
    const [subCategories, setSubCategories] = useState([])
    const [state, setState] = useState({
        ...initState
    })
    const [variation, setVariation] = useState({
        ...initVariation
    })
    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.value,
        });

    };
    const handleVariationChange = name => event => {
        setVariation({
            ...variation,
            [name]: event.target.value,
        })
    }
    const handleProfile = name => event => {
        let url
        let reader = new FileReader();
        try {
            let file = event.target.files[0]
            reader.onloadend = () => {
                setVariation({
                    ...variation,
                    profile: file,
                })
                url = reader.result
                console.log(url)
            }
            reader.readAsDataURL(file)
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleImages = name => event => {
        let image = []
        let reader = new FileReader();
        try {
            let file = event.target.files[0]
            reader.onloadend = () => {
                image.push(file)
                setVariation({
                    ...variation,
                    images: [...image],
                })
            }
            reader.readAsDataURL(file)
        }
        catch (error) {
            console.log(error)
        }
    }
    const SaveImage = async() => {
        let image = []
        let tempVariation = {...variation}
        let profileimg 
        await props.firebase.profile(`/productImage/${new Date().getTime()}${state.name}`).put(variation.profile).
            then((snapshot) => {
                snapshot.ref.getDownloadURL().then((url) => {
                    image.push(url)
                    profileimg = url
                    
                }
                )
            }).then(() => {
                props.firebase.profile(`/productImage/${new Date().getTime()}${state.color}${state.name}`).put(variation.images[0]).
                then((snapshot) => {
                snapshot.ref.getDownloadURL().then((url) => {
                    image.push(url)
                    tempVariation.profile = profileimg
                    tempVariation.images = [...image.reverse()]
                }
                ).then(() => {
                    setState({
                        ...state,
                        variation: [{...tempVariation}]
                    })
                    setVariation({
                        ...initVariation
                    })
                })
            })
            })
            
        
    }
    
    console.log(state)
    let isInvalid = (state.category === '') || (state.brand === '') || (state.name === '') || (state.description === '')
    let disabledVariation = (variation.color === '') || (variation.price = 0) || (variation.profile === null) || (variation.images.length === 0)
    let GlobalInvalidad = (state.category === '') || (state.brand === '') || (state.name === '') || (state.description === '') || (state.variation.length === 0)
    return (
        <div className={`${classes.root}  ${classes.marginOutside}`}>
            <Card className={classes.container}>
                <CardContent className={classes.halfCard} >
                    
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="age-native-required">Categoria</InputLabel>
                            <Select
                                native
                                value={state.category}
                                onChange={handleChange('category')}
                                name="category"
                                error={state.category === '' ? true : false}
                                inputProps={{
                                    id: 'age-native-required',
                                }}
                            >
                                {props.categories.map((category, i) => (
                                    <option value={category.name} key={category.uid}>
                                        {category.name}
                                    </option>
                                ))}
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                        {state.category !== '' ?
                            (
                                <FormControl required className={classes.formControl}>
                                    <InputLabel htmlFor="age-native-required">Subcategoria</InputLabel>
                                    <Select
                                        native
                                        value={state.subcategory}
                                        onChange={handleChange('subcategory')}
                                        name="subcategory"
                                        inputProps={{
                                            id: 'age-native-required',
                                        }}
                                    >
                                        {props.categories.map((category, i) => {
                                            return category.name === state.category &&
                                                category.SubCategories.map((subcategory, i) => (
                                                    <option value={subcategory.name} key={subcategory.uid}>{subcategory.name}</option>
                                                ))
                                        })}
                                    </Select>
                                    <FormHelperText>Opcional</FormHelperText>
                                </FormControl>
                            ) :
                            null
                        }

                        <List>
                            <ListItem>
                                <TextField
                                    error={state.name === '' ? true : false}
                                    id="name"
                                    label="Nombre "
                                    name="name"
                                    helperText="Nombre del producto"
                                    className={classes.textField}
                                    margin='normal'
                                    value={state.name}
                                    onChange={handleChange('name')}

                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    error={state.brand === '' ? true : false}
                                    id="brand"
                                    name="brand"
                                    label="Marca"
                                    helperText="Marca del producto"
                                    className={classes.textField}
                                    margin='normal'
                                    value={state.brand}
                                    onChange={handleChange('brand')}

                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    error={state.description === '' ? true : false}
                                    id="description"
                                    name="name"
                                    label="Descripcion"
                                    helperText="Descripcion del producto"
                                    className={classes.textField}
                                    margin='normal'
                                    value={state.description}
                                    multiline
                                    onChange={handleChange('description')}

                                />
                            </ListItem>
                        </List>
                    
                </CardContent>
                <Divider orientation="vertical" />
                <CardContent className={classes.halfCard2} >
                    {!isInvalid && (
                        <div>
                            <List>
                                <ListItem>
                                    <TextField
                                        error={variation.color === '' ? true : false}
                                        id="color"
                                        label="Color"
                                        name="color"
                                        helperText="Color del producto"
                                        className={classes.textField}
                                        margin='normal'
                                        value={variation.color}
                                        onChange={handleVariationChange('color')}

                                    />
                                </ListItem>
                                
                                <ListItem>
                                    <TextField
                                        error={variation.quantity === '' ? true : false}
                                        id="quantity"
                                        name="quantity"
                                        
                                        type="number"
                                        helperText="cantidad del producto"
                                        className={classes.textField}
                                        margin='normal'
                                        value={variation.quantity}
                                        onChange={handleVariationChange('quantity')}

                                    />
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        error={variation.precio === '' ? true : false}
                                        id="precio"
                                        name="precio"
                                        type="number"
                                        helperText="Precio del producto en dolares"
                                        className={classes.textField}
                                        margin='normal'
                                        value={variation.precio}
                                        onChange={handleVariationChange('precio')}

                                    />
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        error={variation.profile === null ? true : false}
                                        id="profile"
                                        name="profile"
                                        type="file"
                                        accept="image/*"
                                        helperText="Foto de portada"
                                        className={classes.textField}
                                        margin='normal'
                                        defaultValue={variation.profile}
                                        onChange={handleProfile('profile')}

                                    />
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        error={variation.images.length < 1 ? true : false}
                                        id="images"
                                        name="images"
                                        type="file"
                                        accept="image/*"
                                        helperText="Fotos de muestra"
                                        className={classes.textField}
                                        margin='normal'
                                        defaultValue={variation.images}
                                        onChange={handleImages('images')}

                                    />
                                </ListItem>
                                <Button disabled={disabledVariation} onClick={() => {
                                    SaveImage()
                                }}>Guardar Coleccion</Button>
                            </List>
                        </div>
                    )}
                </CardContent>
                <CardActions>
                    <Button variant="outlined" onClick={() => props.history.goBack()}>Cancelar</Button>
                    <Button variant="outlined" color="secondary"
                     onClick={() => props.newProduct(state, state.variation, () => {
                         props.history.push('/')
                     })} disabled={GlobalInvalidad}>Guardar</Button>
                </CardActions>
            </Card>
        </div>
    )
}

const NewProduct = (props) => {
    return (
        <AuthUserContext.Consumer>
            {authUser =>
                authUser && !authUser.isAdmin ?
                    (<Redirect to="/" />) :
                    (
                        <ProductContext.Consumer>
                            {value =>
                                value.categories.length > 0 ?
                                    (
                                        <NewProductForm {...props} newProduct={value.newProduct} categories={value.categories}></NewProductForm>
                                    ) :
                                    (<CircularProgress />)
                            }
                        </ProductContext.Consumer>
                    )
            }
        </AuthUserContext.Consumer>
    )
}

export default compose(withFirebase, withRouter)(NewProduct);
