import React, { useState } from 'react';
import {
    IconButton, Typography,ListItemText, Divider, ListItem, ListItemSecondaryAction, 
    List, ListItemAvatar, Collapse, Drawer,
} from '@material-ui/core'
import { Menu as MenuIcon, ExpandLess, ExpandMore } from '@material-ui/icons'
import { ProductConsumer } from '../../sessioncontext/ProductContext'
import { withRouter } from 'react-router-dom'
import useStyles from './Navstyles'
import { StyledAvatar } from '../products/productsStyles'

const MenuButtom = ({ context, props }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [collapseOpen, setCollapseOpen] = useState(false)
    const [categories, setCategories] = useState(context.categories)

    const handleDrawerOpen = event => {
        if (event.type === 'keydown' && (event.key === 'tab' || event.key === 'shit')) {
            return;
        }
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        setCollapseOpen(!collapseOpen)
    }

    return (
        <div>
            <div className={classes.secondBar} >
                <List>
                    <ListItem classes={{ root: classes.item }}
                        button
                        onClick={handleDrawerOpen}
                    >
                        <ListItemAvatar>
                            <StyledAvatar>
                                <MenuIcon />
                            </StyledAvatar>
                        </ListItemAvatar>
                        <ListItemText primary={<Typography variant='button' color='inherit'>Departamentos</Typography>} />
                    </ListItem>
                </List>

            </div>
            <Drawer open={open} onClose={handleDrawerClose} aria-haspopup="true">
                <div className={classes.list} role='presentation' aria-haspopup="true" onKeyDown={handleDrawerClose}>
                    <List>
                        <Divider orientation='horizontal'></Divider>
                        {categories.map((category, index) => (
                            <div key={category.name}>
                                <ListItem
                                    className={classes.ListItem}
                                    button key={category.uid}
                                    onClick={() => {
                                        props.history.push(`/productos/${category.name}`)
                                        handleDrawerClose()
                                    }}
                                >
                                    <ListItemText primary={category.name} style={{ textTransform: 'uppercase' }} />
                                    {category.SubCategories.length > 0 && (
                                        < ListItemSecondaryAction >
                                            <IconButton edge='end' onClick={(e) => {
                                                e.stopPropagation()
                                                handleClick()
                                            }}>
                                                {collapseOpen ? < ExpandLess /> : <ExpandMore />}
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    )}


                                </ListItem>
                                <Collapse in={collapseOpen} unmountOnExit>
                                    <List component="div" disablePadding>
                                        {category.SubCategories.length > 0 && category.SubCategories.map((subcategory, idx) => (
                                            <ListItem key={subcategory.uid} button className={classes.nested}
                                                onClick={() => {
                                                    props.history.push(`/productos/${category.name}/${subcategory.name}`)
                                                    handleClick()
                                                    handleDrawerClose()
                                                }}
                                            >
                                                <ListItemText primary={subcategory.name} style={{ textTransform: 'capitalize' }}>
                                                </ListItemText>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </div>
                        ))}
                        
                    </List>
                </div>
            </Drawer>
        </div >
    )
}

const MenuCategory = (props) => (
    <ProductConsumer>
        {value => {
            if (value.categories.length > 0) {
                return <MenuButtom context={value} props={props}></MenuButtom>
            }
        }
        }
    </ProductConsumer>
)

export default withRouter(MenuCategory);
