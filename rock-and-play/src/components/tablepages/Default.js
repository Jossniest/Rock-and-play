import React, {Component} from 'react';
import useStyles from './Styles'
import {Container} from '@material-ui/core';

const Default = (props) =>{  

    const classes = useStyles()
    return(
        <div className={classes.root}>
            <Container maxWidth="sm">
                <div className={classes.container} style={{flexWrap:"wrap"}}>
                    <p>404</p>
                    <p>Error Pagina no encontrado</p>
                    <h3>
                        La URL requerida
                        <span>
                            {props.location.pathname}{' '}
                        </span>
                        No fue encontrada
                    </h3>
                </div>
            </Container>             
        </div>
    )
    
}

export default Default;

