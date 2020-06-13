import React, { useState } from 'react'
import {
    Avatar,  CardMedia,
} from '@material-ui/core'
import useStyles, { StyledCard, StyleCardAction } from './productsStyles'
import OutOfImage from '../../resources/no_disponible.png'

const ProductSlider = ({ Photos, Width }) => {
    const classes = useStyles();

    const [activeStep, setActiveStep] = useState(0);

    const handleStep = (index) => {
        setActiveStep(index)
    }

    return (
        
            <StyledCard  className={classes.rootSlider}>
                <CardMedia
                    src={Photos.length > 0 ?
                        Photos[activeStep] :
                        OutOfImage
                    }
                    component='img'
                    style={{height:Width, width: Width }}
                />
                <StyleCardAction >
                    {Photos ? Photos.map((photo, key) => (
                        <Avatar variant="square" key={key} src={photo} onClick={() => handleStep(key)} style={{ border: '1px solid var(--primaryOrange)' }} />
                    )) : null}
                </StyleCardAction>

            </StyledCard>
    )
}

export default ProductSlider;