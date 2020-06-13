import React from 'react'
import { Typography, Button, IconButton, Card, CardMedia, CardContent, CardActions } from '@material-ui/core'
import { Add, Remove } from '@material-ui/icons'
import useStyles from './Styles'
import { useTheme } from '@material-ui/core/styles'


const CartItem = ({ item, value }) => {
    const classes = useStyles()
    const theme = useTheme()
    const { uid, name, variation, productUid } = item
    const { color, price, count, total, profile } = variation
    const { increment, decrement, removeItem } = value
 
    return (
          <Card className={classes.card}>
            <CardMedia
                className={classes.img}
                image={profile}
                title={`${name}, ${color}`}
            />
            <div className={classes.details}>

                <CardContent className={classes.content}>

                    <Typography component="h5" variant="h5" style={{ textTransform: 'capitalize' }}>
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" style={{ textTransform: 'capitalize' }}>
                        Color: <em>{color}</em>
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" style={{ textTransform: 'capitalize' }}>
                        Precio: <em>${price}</em>
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" style={{ textTransform: 'capitalize' }}>
                        Vendido por: <em>{`Rock & Play`}</em>
                    </Typography>
                    
                    <b>Total por producto: {total}</b>
                    

                </CardContent>
                <CardActions>
                    <Button variant='outlined' color='primary'
                        onClick={() => { removeItem(uid,productUid,variation.uid, count) }}
                    >
                        Eliminar
                        </Button>
                </CardActions>
                <CardContent>
                    Cantidad:
                </CardContent>
                
                    <div className={classes.controls}>
                    <IconButton aria-label="remove" onClick={() => decrement(uid,productUid,variation.uid)} disabled={count === 1}>
                        {theme.direction === 'rtl' ? <Add /> : <Remove />}
                    </IconButton>
                    <IconButton aria-label="cantidad" disabled >
                        {count}
                    </IconButton>
                    <IconButton aria-label="add" onClick={() => increment(uid,productUid,variation.uid)}>
                        {theme.direction === 'rtl' ? <Remove /> : <Add />}
                    </IconButton>
                </div>
            </div>

        </Card>

    )
}

export default CartItem
/*
<Grid container spacing={1} alignContent='center' justify='center' >
<Grid className="col-10 mx-auto col-lg-2" >
    <img className={classes.img} src={profile} />
</Grid>
<Grid className="col-10 mx-auto col-lg-2" >
    <Typography variant="subtitle1" component="b" style={{ textTransform: 'capitalize' }}>{name}</Typography>
</Grid>
<Grid className="col-10 mx-auto col-lg-2" >
    <Typography variant="subtitle1" component="b" style={{ textTransform: 'capitalize' }}>{color}</Typography>
</Grid>
<Grid className="col-10 mx-auto col-lg-2" >
    <Typography variant="subtitle1" component="b" style={{ textTransform: 'capitalize' }}>{price}</Typography>
</Grid>
<Grid className="col-10 mx-auto col-lg-2" >
    <ButtonGroup variant="contained" size="small" aria-label="small contained button group">
        <Button className={classes.item}><Remove/></Button>
        <Button disabled classes={{disabled: '#ffffff', }} >{count}</Button>
        <Button className={classes.item}><Add/></Button>
    </ButtonGroup>
</Grid>
<Grid className="col-10 mx-auto col-lg-2" >
    <IconButton onClick={() => {removeItem(variationUID)}} className={classes.item}><Delete></Delete></IconButton>
</Grid>
<Grid className="col-10 mx-auto col-lg-2" >
    <Typography variant="subtitle1" component="b" style={{ textTransform: 'capitalize' }}>Total: $ {total}</Typography>
</Grid>
</Grid>
*/

/*<Grid className='row my-2 text-capitalize text-center' >
            <Grid className="col-10 mx-auto col-lg-2" >
                <img className={classes.img} src={profile} />
            </Grid>
            <Grid className="col-10 mx-auto col-lg-2" >
                <Typography variant="subtitle1" component="b" style={{ textTransform: 'capitalize' }}>{name}</Typography>
            </Grid>
            <Grid className="col-10 mx-auto col-lg-2" >
                <Typography variant="subtitle1" component="b" style={{ textTransform: 'capitalize' }}>{color}</Typography>
            </Grid>
            <Grid className="col-10 mx-auto col-lg-1" >
                <Typography variant="subtitle1" component="b" style={{ textTransform: 'capitalize' }}>{price}</Typography>
            </Grid>
            <Grid className="col-10 mx-auto col-lg-2" >
                <ButtonGroup variant="contained" size="small" aria-label="small contained button group">
                    <Button className={classes.item}
                    onClick={() => decrement(variationUID)}
                    ><Remove/></Button>
                    <Button disabled classes={{disabled: '#ffffff', }} >{count}</Button>
                    <Button className={classes.item}
                    onClick={() => increment(variationUID)}
                    ><Add/></Button>
                </ButtonGroup>
            </Grid>
            <Grid className="col-10 mx-auto col-lg-1" >
                <IconButton onClick={() => {removeItem(variationUID)}} className={classes.item}><Delete></Delete></IconButton>
            </Grid>
            <Grid className="col-10 mx-auto col-lg-1" >
                <Typography variant="subtitle1" component="b" style={{ textTransform: 'capitalize' }}>Total: $ {total}</Typography>
            </Grid>
        </Grid> */