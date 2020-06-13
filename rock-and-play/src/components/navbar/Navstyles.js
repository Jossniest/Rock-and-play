
import { fade, makeStyles } from '@material-ui/core/styles'
import deepOrange from '@material-ui/core/colors/deepOrange';

const primary = deepOrange['400'];

const useStyles = makeStyles(theme => ({
  root: {
    width: 'fit-content',

    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(2),
    },
    '& hr': {
      margin: theme.spacing(2, 2.5),
    },
  },
  grow: {
    flexGrow: 1,
  },
  appbar: {
    background: primary,
  },
  link: {
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  list:{
    witdh: 250,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  secondBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(3),
    backgroundColor: '#232528',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {   
    marginLeft: theme.spacing(1),
    display: 'inline-block',
    fontFamily: 'Hepta Slab',
    color: theme.palette.common.white,
    [theme.breakpoints.up('sm')]: {
      display: 'inline-block',
    },
  },
  menuItem: {
    cursor: 'default',
    [theme.breakpoints.up('sm')]: {
      margin: 0,
      width: 'auto',
    },
  },
  menuCategory: {
    fontFamily: "Segoe UI",
    letterSpacing: '0.1rem',
    fontWeight: 500,
    color: 'var(--primaryDark)',
  },
  menuTitle: {
    paddingTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
  textItem: {
    cursor: 'default',
    marginLeft: theme.spacing(4),
  },
  ListItem: {
    width: 230,
    padding: theme.spacing(2),
  },
  item:{
    padding: 0
  },
  button: {
    backgroundColor: fade(theme.palette.common.white, 0.25),
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: primary,
      color: theme.palette.common.white,
    },
  },
  paper: {
    padding: '0px 4px',
    alignItems: 'center',
    display: 'flex',
    width: 230,
    margin: theme.spacing(1),
    backgroundColor: fade(theme.palette.common.white, 0.50),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.65),
    },
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: 230,
    },
    
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    '&:focus': {
      width: 250,
    }
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

export default useStyles;
