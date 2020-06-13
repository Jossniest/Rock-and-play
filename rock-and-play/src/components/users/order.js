import React from 'react'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Card, CardContent,ExpansionPanelActions, Typography, Tooltip } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import useStyles from '../tablepages/Styles'
import SubOrder from './suborder'


const Order = (props) => {
    const classes = useStyles();
    console.log(props)
    const { canceled, createtime, uid, delivered, total, itbs, subtotal, waitCancel, products, deliveredAt } = props.order

    return (
        <div >
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<Tooltip title="Ver Productos"><ExpandMore /></Tooltip>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Orden de Compra: {` `}{uid}</Typography>
                    <Typography className={classes.secondaryHeading}>Fecha: {` `}{createtime} </Typography>
                    <Typography className={classes.secondaryHeading}>Entrega {delivered ? "Entregada" : "En Proceso"} </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {products.map((product, i) => (
                        <SubOrder product={product} key={i} ></SubOrder>
                    ))}
                    <br/>
                    <Card style={{margin:'1vw'}}>
                        <CardContent>
                        <Typography>Total: $ {total} </Typography>
                        <Typography>Itbs: $ {itbs} </Typography>
                        <Typography>SubTotal: $ {subtotal} </Typography>
                        </CardContent>
                    </Card>

                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}

export default Order