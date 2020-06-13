import { makeStyles } from '@material-ui/core'
import React from 'react'
import { grey , blueGrey} from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'
import { Menu, MenuItem, InputBase, Card, CardActions, Avatar } from '@material-ui/core'

const Grey600 = grey[600];
const BlueGrey100 = blueGrey[100]

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2),
    },
    TitleDisplay: {
        borderTop: '1px solid',
        borderTopColor: Grey600,
        borderBottom: '1px solid',
        borderBottomColor: Grey600,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: theme.spacing(1),
    },
    container: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(3),
        flex: 1,
        justifyContent: 'center',

    },
    divider: {
        height: 4,
        margin: 2,
        backgroundColor: 'black'
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    card: {
        display: 'flex',
        width: '60vw',
        marginTop: theme.spacing(1),
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    img: {
        width: '9rem',
        padding: theme.spacing(1)
    },
    underCard: {
        width: theme.spacing(40),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    
    tableWrapper: {
        overflowX: 'auto',
    },
    table:{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
    columnHeader: {
        padding: theme.spacing(2),
        borderSpacing: '5px',
        borderCollapse: 'separate',
        borderBottom: '1px solid',
        borderBottomColor: Grey600,
        
    },
    disabledButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
}))

export default useStyles;