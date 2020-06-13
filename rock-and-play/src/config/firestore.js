import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/storage'
import { tsAnyKeyword } from '@babel/types'

const config = {
    apiKey: "AIzaSyCE4aa-aSo2-XUElXhm6Y86gm_hrOQ96CU",
    authDomain: "rock-and-play.firebaseapp.com",
    databaseURL: "https://rock-and-play.firebaseio.com",
    projectId: "rock-and-play",
    storageBucket: "rock-and-play.appspot.com",
    messagingSenderId: "838678179557",
    appId: "1:838678179557:web:5b750058d19f34ef616e0c",
    measurementId: "G-9TYVJET3Y9"
}
/* Redirect Email Verification*/
const Redirect = 'http://localhost:3000';

class Firebase{
    constructor(){
        app.initializeApp(config);
        
        /*Helpers*/
        this.fieldValue = app.firestore.FieldValue;
        this.emailAuthProvider = app.auth.EmailAuthProvider;

        /*Firebase APIs*/

        this.auth = app.auth()
        this.db = app.firestore();
        this.storage = app.storage();
        
        /* Social Sign In Method Provider */
        this.googleProvider = new app.auth.GoogleAuthProvider();
    }
    /* Auth API*/
    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
    doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);
    doSignOut = () => this.auth.signOut();
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: Redirect,
    });
    doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

    doCreateUserCart = (uid) => {
      this.db.collection(`cart`).add({
        userRef: this.db.collection(`users`).doc(uid),
        createdAt: this.fieldValue.serverTimestamp(),
      }).then(doc => {
        this.db.collection(`users`).doc(uid).update({
          cartRef: doc.id
        })
      })
    }

    onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };
            
            next(authUser);
          });
      } else {
        fallback();
      }
    });

    /* Users API*/
    user = uid => this.db.doc(`users/${uid}`);
    /* Get all users collection */
    users = () => this.db.collection(`users`);

    /* Next collections API */
    products = () => this.db.collection(`products`);
    productsVariations = (uid) => this.db.collection(`products`).doc(uid).collection(`variation`)
    product = uid => this.db.collection(`products`).doc(`${uid}`);
    categories = () => this.db.collection(`categories`)
    subcategories = (uid) => this.db.collection(`categories`).doc(uid).collection(`subcategories`) 
    carts = () => this.db.collection(`cart`)
    cart = (uid) => this.db.collection(`cart`).doc(uid)
    cartProduct = (cartUid, productUid) => this.db.collection(`cart`).doc(cartUid).collection(`products`).doc(productUid)
    orders = () => this.db.collection(`orders`)
    order = uid => this.db.collection(`orders`).doc(uid)
    /* Storage API */
    profile = (filename) => this.storage.ref().child(filename)


}
export default Firebase;
