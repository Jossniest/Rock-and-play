import React from 'react'
import { Card, CardContent, CardActions, CardMedia, Button, Typography, IconButton } from '@material-ui/core'
import useStyles from '../tablepages/Styles'

const SubOrder = (props) => {
    const classes = useStyles();
    const { uid, name, variation, productUid } = props.product
    const { color, price, count, total, profile } = variation
    return (
        <Card style={{width:'75%'}}>
            <CardMedia
                image={profile}
                title={`${name}  ${color}`}
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
                    <Typography variant="subtitle1" color="textSecondary" style={{ textTransform: 'capitalize' }}>
                        Cantidad: <em>{count}</em>
                    </Typography>

                    <b>Total por producto: {total}</b>
                </CardContent>


            </div>

        </Card>

    )
}

export default SubOrder;