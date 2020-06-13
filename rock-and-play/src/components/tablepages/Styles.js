import { makeStyles } from '@material-ui/core'
import { grey, red } from '@material-ui/core/colors'

const Grey600 = grey[600];
const Red500 = red[500];

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    floatingDiv: {
        position: 'relative',
        top: 0,
        left: 0,

    },
    floatingDiv2: {
        position: 'absolute',
        top: '10%',
        left: '20vw',
        width: '60vw',
        backgroundColor: theme.palette.common.black,
        opacity: 0.9,
        padding: theme.spacing(2),
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
        display: 'flex',
        marginTop: theme.spacing(2),
        padding: theme.spacing(3),
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
    },
    image: {
        width: 128,
        height: 128,
    },
    img2: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
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
        width: '100vw',
        opacity: 0.7,
        position: 'relative',
        top: 0,
        left: 0,
    },
    avatar: {
        backgroundColor: Red500,
    },
    title: {
        paddingLeft: theme.spacing(4)
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    profileImg: {
        width: theme.spacing(8),
        height: theme.spacing(10),
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    table: {
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
    mapStyles: {
        alignSelf: 'flex-end',
        width: '40%',
        height: '100%',
    },
    gridList: {
        alignSelf: 'flex-start',

        overflow: 'hidden',
        width: '59%',
        backgroundColor: theme.palette.background.paper,
    },
    gridListPhotos: {
        width: '540',
        height: '480',
    },
    actionButton: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    rootLocation: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        flexBasis: '50%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        flexBasis: '33.33%',
    },
    controlExpansion:{
        width: "80%",
        maxWidth: '80%',
    }
}))

export default useStyles;