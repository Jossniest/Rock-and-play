import { makeStyles } from '@material-ui/core'
import React from 'react'
import { grey } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'
import { Menu, MenuItem, InputBase, Card , CardActions, Avatar} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },

  container: {
    padding: theme.spacing(1),
    display: 'flex',
    flexShrink: 1,
  },
  heading: {
    padding: theme.spacing(2),
  },
  rootSlider: {
    margin: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  rootProgress:{
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    '& > * + *':{
      marginLeft: theme.spacing(2),
    },
  },
  circularProgress:{
    alignSelf:'center',
  },
  SliderImg: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  modal: {
    height: 700,
  },
  paper: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 3, 2),
    minHeight: '40vh',
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  card: {
    marginTop: theme.spacing(3),
    maxWidth: 300,
    alignItems: 'center',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  header: {
    padding: 0,
    height: 'auto',
  },
  media: {
    paddingTop: '91.25%', // 16:9  
    cursor: 'pointer',
  },
  Photo: {
    maxWidth: 200,
  },
  expand: {
    transform: 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },

  expandOpen: {
    transform: 'rotate(0deg)',
  },
  avatar: {
    backgroundColor: grey[900],
    margin: 5,
  },
  content: {
    minHeight: 100,
    maxHeight: 100,
  },
  cartIcon: {
    "&:hover": {
      color: grey[900]
    }
  },
  viewMore: {
    width: '100%',

  },
  tableWrapper: {
    overflowX: 'hidden',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(1),
    
    
  },
  table: {
    background: theme.palette.common.white,
    padding: theme.spacing(2),
    width: '80vw',

  },
  select: {
    width: '100%',
    maxWidth: 260,
    backgroundColor: theme.palette.background.paper,
  },
  marginOutside: {
    margin: theme.spacing(4),
    
  },
  halfCard: {
    width: '60%',
  },
  halfCard2: {
    width: '40%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
},
})
)

export default useStyles;


export const StyledCard = withStyles(theme => ({
  root: {
      borderRightColor: theme.palette.grey,
      borderLeftColor: theme.palette.grey,
      borderRight: '1.5px solid',
      borderLeft: '1.5px solid',
      borderRadius: '0px',
      padding: theme.spacing(2),
      boxShadow: '0.5px 1.5px 1px 1px rgba(0,0,0, 0.45)'
  }

}))(Card);

export const StyleCardAction = withStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
}))(CardActions)


export const StyledMenuItem = withStyles(theme => ({
  root: {
   
    '&:focus': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
      '& .MuiListItemIcon-root, & .MuiListItemAvatar-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      },
    },
  }
}))(MenuItem);

export const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    borderRadius: '10px' ,
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))


export const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

export const StyledAvatar = withStyles(theme => ({
  root: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: '0px',
  },
}))(Avatar)

