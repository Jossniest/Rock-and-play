import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import FirebaseContext from './config/context';
import Firebase from './config/firestore';
import configureStore from './store/store'
import ProductProvider from './sessioncontext/ProductContextProvider'
import {ThroughProvider} from 'react-through'


ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <ProductProvider>
            <ThroughProvider>
                <App />
            </ThroughProvider>
        </ProductProvider>
    </FirebaseContext.Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
