import React from 'react';
import { IconButton, Typography, InputBase, Tooltip, Divider, Paper, Fade, Collapse, Slide } from '@material-ui/core';
import { Search, Menu, Close } from '@material-ui/icons';
import useStyles from './Navstyles'

const SearchBar = () => {
    const classes = useStyles()
    const SearchId = "search-expand"
    const [open, setOpen] = React.useState(false);

    const handleInputSearch = () => (
        setOpen(prev => !prev)
        
    )
    const SearchInput = () => (

        <Paper component="form" className={classes.paper} >
            <InputBase
                className={classes.input}
                placeholder="Busca tu producto"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <Tooltip title="Buscar">
                <IconButton type="submit" className={classes.iconButton} color='default' aria-label="search" size='small'>
                    <Search />
                </IconButton>
            </Tooltip>
            <div className={classes.sectionMobile}>
                <Divider className={classes.divider} orientation='vertical' />
                <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={handleInputSearch}>
                    <Close />
                </IconButton>
            </div>
        </Paper>

    )
    return (
        <div>
            <div className={classes.sectionDesktop}>
                <SearchInput></SearchInput>
            </div>

            <div className={classes.sectionMobile}>
                <Slide direction='left' in={open} mountOnEnter unmountOnExit>
                    <div>
                    <SearchInput></SearchInput>
                    </div>
                </Slide>
                <Slide direction='left' in={!open} mountOnEnter unmountOnExit>
                <IconButton
                    aria-label="show more"
                    color="inherit"
                    id={SearchId}
                    className={classes.iconButton}
                    onClick={(e) => {
                        handleInputSearch()
                        e.target.style.display = 'none'

                    }}
                >
                    <Search />
                </IconButton>
                </Slide>
            </div>

        </div>
    )
}

export default SearchBar


