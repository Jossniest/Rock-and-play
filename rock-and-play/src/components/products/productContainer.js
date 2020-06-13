import React, { useState, useEffect, useContext } from 'react'
import { ProductList } from './productslist'
import { ProductContext } from '../../sessioncontext/ProductContext'
import {CircularProgress, Fab } from '@material-ui/core'
import useStyles from './productsStyles'
import { BreadcrumbsItem} from 'react-breadcrumbs-dynamic'
import {withRouter} from 'react-router-dom'
import AuthUserContext from '../../sessioncontext/context'
import {Add} from '@material-ui/icons';

const ProductContainerLoad = (props) => {
  const [category, setCategory] = useState(props.match.params.category)
  const [subcategory, setSubCategory] = useState(() => {
    if (props.match.params.subcategory) {
      return props.match.params.subcategory
    } else {
      return null
    }
  })
  const [data, setData] = useState(null)
  useEffect(() => {
    const runEffect = async () => {
      try {
        if (subcategory) {
          const tempData = await props.context.products.filter(product =>
            product.category === category && product.subcategory === subcategory)
          setData(tempData)
        } else {
          const tempData = await props.context.products.filter(product =>
            product.category === category)
          setData(tempData)
        }

      }
      catch (e) {
        setData(null)
        console.log("error", e)
      }
    }
    runEffect()
  }, [category, subcategory])
  console.log(data)
  return (
    <div>
      {subcategory ?
        (
          <div>
            <BreadcrumbsItem to={`/`}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={`/productos/${category}`}>{` `}{category}{` `}</BreadcrumbsItem>
            <BreadcrumbsItem to={`/productos/${category}/${subcategory}`}>{` `}{subcategory} {` `}</BreadcrumbsItem>
          </div>
        ) :
        (
          <div>
            <BreadcrumbsItem to={`/`}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={`/productos/${category}`}>{` `}{category}{` `}</BreadcrumbsItem>
          </div>
        )
      }


      {data && data !== "undefined" ?
        (<ProductList data={data}></ProductList>) :
        "No Hay Productos"}
      <AuthUserContext.Consumer>
        {authUser => 
          authUser && authUser.isAdmin ? (
            <Fab color="secondary" onClick={() => props.history.push('/productos/new')}>
              <Add />
            </Fab>
          ) : null
        }
      </AuthUserContext.Consumer>
    </div>
  )
}

const ProductContainer = (props) => {
  const classes = useStyles();
  const ProductsInfo = useContext(ProductContext);

  if (!ProductsInfo.products) {
    return (
      <div className={classes.rootProgress}>
        <CircularProgress className={classes.circularProgress}></CircularProgress>
      </div>
    )
  }
  else {
    return <ProductContainerLoad context={ProductsInfo} {...props}></ProductContainerLoad>
  }
}

export default withRouter(ProductContainer)