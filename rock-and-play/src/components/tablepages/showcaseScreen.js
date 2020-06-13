import React from 'react'
import fill_image from '../../resources/fill_image.jpg'
import guitars from '../../resources/guitars.jpg'
import drums from '../../resources/drums.jpg'
import keyboards from '../../resources/keyboards.jpg'
import amps from '../../resources/amps.jpg'
import { Box, Typography, ButtonBase, Container, Grid } from '@material-ui/core'
import useStyles from './Styles'
import useStyles2 from './Styles2'
import Logo from '../../resources/logo.jpg'
import {withRouter} from 'react-router-dom'

const images = [
    {
        url: guitars,
        title: 'guitarras',
        width: '25%',
    },
    {
        url: drums,
        title: 'baterias',
        width: '25%',
    },
    {
        url: keyboards,
        title: 'teclados',
        width: '25%',
    },
    {
        url: amps,
        title: 'amplificadores',
        width: '25%',
    },
];

const ShowCaseScreen = (props) => {
    const classes1 = useStyles()
    const classes = useStyles2()

    return (
        <div className={classes1.root}>
            <Box>
                <div className={classes1.floatingDiv}>
                    <img src={fill_image} alt='fill' className={classes1.img} />
                    <div className={classes1.floatingDiv2}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <div className={classes1.image}>
                                    <img className={classes1.img2} alt="logo" src={Logo} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography style={{ color: 'white' }} gutterBottom variant="subtitle1">
                                            {`Rock and Play es una empresa distribuidora de instrumentos musicales\n 
                                            de cuerda, percusion, electronicos y aplificadores de sonidos`}
                                        </Typography>
                                        <Typography style={{ color: 'white' }} gutterBottom variant="subtitle1">
                                            {`Estaremos complacidos siempre de servirle al cliente, porque lo que nos\n
                                            mueve es demostrar que la musica esta viva y bien, y es de facil acceso\n
                                            hoy mas que nunca`}
                                        </Typography>

                                    </Grid>

                                </Grid>

                            </Grid>
                        </Grid>
                    </div>

                    <Container maxWidth='md'>
                        <div className={classes.root}>
                            {images.map(image => (
                                <ButtonBase
                                    focusRipple
                                    key={image.title}
                                    className={classes.image}
                                    focusVisibleClassName={classes.focusVisible}
                                    style={{
                                        width: image.width,
                                    }}
                                    onClick={() =>{
                                        props.history.push(`/productos/${image.title}`)
                                    }}
                                >
                                    <span
                                        className={classes.imageSrc}
                                        style={{
                                            backgroundImage: `url(${image.url})`,
                                        }}
                                    />
                                    <span className={classes.imageBackdrop} />
                                    <span className={classes.imageButton}>
                                        <Typography
                                            component="span"
                                            variant="subtitle1"
                                            color="inherit"
                                            className={classes.imageTitle}
                                            style={{textTransform:'capitalize'}}
                                        >
                                            {image.title}
                                            <span className={classes.imageMarked} />
                                        </Typography>
                                    </span>
                                </ButtonBase>
                            ))}
                        </div>
                    </Container>
                </div>
            </Box>
        </div>
    )
}

export default withRouter(ShowCaseScreen);