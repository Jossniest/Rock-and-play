import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {withFirebase} from '../../config/context'
import {connect} from 'react-redux';
import AuthUserContext from '../../sessioncontext/context'
import ProductContainer from '../products/productContainer'
import ShowCaseScreen from './showcaseScreen'
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic'

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    
    }
    
    render(){
        return(
            <div>
                <ShowCaseScreen/>
            </div>
        )
    }

}

const HomeForm = compose(withRouter,withFirebase)(Home);

export default HomeForm;