import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom'
import { ProductContext } from '../../sessioncontext/ProductContext'
import { CircularProgress, Container, Grid } from '@material-ui/core';
import useStyles from './productsStyles'
import ViewDetails from './productViewDetails';

const ProductDetailsLoader = (props) => {
  const classes = useStyles();
  const [id, setId] = useState(props.match.params.uid)
  const [key, setKey] = useState(props.match.params.key)
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)

  const getProductDetails = () => {
    const tempProduct = props.context.products.find(function (element) {
      return element.uid === id && element.variation[key]
    })
    setProduct(tempProduct)
    setLoading(false)
  }

  useEffect(() => {
    getProductDetails();
  }, [id, key])



  return (
    <div className={classes.root}>
      {!loading && product ? (<ViewDetails product={product} key={id} variation={key} />) :
        (
          <Container maxWidth='sm' className={classes.rootSlider}>
            <CircularProgress></CircularProgress>
          </Container>
        )}
    </div>
  )
}
const ProductDetails = (props) => {
  const classes = useStyles();
  const productsInfo = useContext(ProductContext);
  if (!productsInfo.products) {
    return (
      <Container maxWidth='sm' className={classes.rootSlider}>
        <CircularProgress></CircularProgress>
      </Container>
    )
  }
  else {
    return <ProductDetailsLoader context={productsInfo} {...props}></ProductDetailsLoader>
  }
}


export default withRouter(ProductDetails);