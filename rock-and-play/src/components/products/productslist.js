import React, { useEffect, useState, useContext } from 'react'
import ProductCast from './productcast'
import { ProductContext } from '../../sessioncontext/ProductContext'
import {
  Container, Grid, TableCell, TablePagination, IconButton,
  TableRow, CircularProgress
} from '@material-ui/core'
import useStyles from './productsStyles'
import { useTheme } from '@material-ui/core/styles';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@material-ui/icons'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div style={{ flexShrink: 0, marginLeft: '2.5vw' }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="Primera pagina"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="Pagina anterior">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Pagina siguiente"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Ultima pagina"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export const ProductList = (props) => {
  
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [products, setProducts] = useState(props.data)
  
  console.log(products)
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.tableWrapper}>
      <div className={classes.tableWrapper}>

            <div className={classes.table}>
              <Grid container spacing={2}>
                {products && products[0] !== null ? 
                products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, i) => {
                  return (
                    <ProductCast key={product.uid} product={product}></ProductCast>
                  )
                }
                )
                : (
                  null
                )
                }
                
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </Grid>

              <TablePagination
                rowsPerPageOptions={[9, 18, 36]}
                colSpan={3}
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </div>
          </div>
    </div>
  )


}

/*const MapElement = (props) => {
  const classes = useStyles();
  if (!props.data) {
    return (
      <div className={classes.rootProgress}>
        desde MapElement
          <CircularProgress className={classes.circularProgress}></CircularProgress>
      </div>
    )
  }
  else {
    return <ProductList context={props.data}></ProductList>
  }
}

export default withRouter(MapElement);*/
