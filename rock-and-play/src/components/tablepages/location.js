import React from 'react'
import useStyles from './Styles'
import {GridList, GridListTile, GridListTileBar, ListSubheader} from '@material-ui/core'
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic'
import first from '../../resources/1.jpg'
import second from '../../resources/2.jpg'
import third from '../../resources/3.jpg'
import fourth from '../../resources/4.jpg'

const tileData = [
    {
        img: first,
        title: 'inside-view',
        cols: 1,
        author: 'Jossniest'
    },
    {
        img: second,
        title: 'front-view',
        cols: 2,
        author: 'Jossniest'
    },
    {
        img: third,
        title: 'guitar-view',
        cols: 2,
        author: 'Jossniest'
    },
    {
        img: fourth,
        title: 'panoramic-view',
        cols: 1,
        author: 'Jossniest'
    },
]

const Location = (props) => {
    const classes = useStyles()
    
    return(
        <div className={classes.rootLocation}>
            <div>
                <BreadcrumbsItem to={`/`}>Home</BreadcrumbsItem>
                <BreadcrumbsItem to={`/location`}>Ubicacion&nbsp;</BreadcrumbsItem>            
            </div>
            <div className={classes.gridList}>
                <GridList cellHeight={240} className={classes.gridListPhotos} cols={3}>
                    <GridListTile key='Subheader' cols={3} style={{height: 'auto'}} >
                        <ListSubheader component='div'>Vista de La Tienda</ListSubheader>
                    </GridListTile>
                    {tileData.map(tile => (
                        <GridListTile key={tile.img} cols={tile.cols || 1}>
                            <img src={tile.img} alt={tile.title}></img>
                            <GridListTileBar title={tile.title} subtitle={<span>by: {tile.author}</span>}>     
                            </GridListTileBar>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            <div className={classes.mapStyles}>
            <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1QfrHbf_7jP85Ut1gQUIsicrYEILWPghn" 
            style={{width:'100%',height:'80vh'}}></iframe>
            </div>
        </div>
    )
}

export default Location