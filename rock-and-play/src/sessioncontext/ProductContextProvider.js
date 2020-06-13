import React, { useState, useEffect} from 'react'
import { withFirebase } from '../config/context';
import { ProductContext } from './ProductContext'
import withAuthentication from './withAuthentication'
import { compose } from 'redux'

const ProductProvider = (props) => {
    const authUserRef = JSON.parse(localStorage.getItem('authUser'))
    const [productos, setProductos] = useState([])
    const [cart, setCart] = useState([])
    const [cartSubTotal, setCartSubTotal] = useState(0)
    const [cartTax, setCartTax] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const [categories, setCategories] = useState([])
    const [userOrders, setuserOrders] = useState([])

    const onListenForProducts = async () => {
        let products = []
        let itemInCart = JSON.parse(sessionStorage.getItem('cart'))
        let ProductsRef = props.firebase.products()
        let unsubscribe = await ProductsRef.orderBy('createdAt','desc').get()
        for (let product of unsubscribe.docs) {
            let variation = []
            let subCollectionDocs = await ProductsRef.doc(product.id).collection(`variation`).get();
            for (let subCollection of subCollectionDocs.docs) {
                if (itemInCart.length > 0) {
                    let temp = []
                    itemInCart.filter((item) => {
                        if (item.variation.uid === subCollection.id) {
                            temp.inCart = true;
                        }
                    })
                    variation.push({ ...subCollection.data(), ...temp, variationUID: subCollection.id })
                }
                else {
                    variation.push({ ...subCollection.data(), variationUID: subCollection.id })
                }
            }
            products.push({ ...product.data(), uid: product.id, variation })
        }
        setProductos({ products: products.reverse() })
    }
    const onListenForCategories = async () => {
        let tempcategories = []
        let categoriesRef = props.firebase.categories()
        let unsubscribe = await categoriesRef.get()
        for (let category of unsubscribe.docs) {
            let SubCategories = []
            let subCollection = await categoriesRef.doc(category.id).collection(`subcategories`).get()
            for (let subcategory of subCollection.docs) {
                if (subcategory.exists) {
                    SubCategories.push({ ...subcategory.data(), uid: subcategory.id })
                }
            }
            if (category.exists) {
                tempcategories.push({ ...category.data(), uid: category.id, SubCategories })
            }
        }
        setCategories(tempcategories.reverse())
    }
    const onListenForCartProducts = async () => {
        if (authUserRef) {
            let userRef = []
            let productsinCart = []
            let CartRef = props.firebase.cart(authUserRef.cartRef)
            let unsubscribe = await CartRef.get()
                .then(async (doc) => {
                    if (doc.exists) {
                        let getSubCollection = await CartRef.collection(`products`).get()
                        for (let subDoc of getSubCollection.docs) {
                            productsinCart.push({ ...subDoc.data(), uid: subDoc.id })
                        }
                    } else {
                        console.log("No existe el documento")
                    }
                    userRef.push({ userRef: doc.data().userRef, uid: doc.id })
                })
            sessionStorage.setItem("cart", JSON.stringify([...productsinCart]))
            setCart([...productsinCart])
            addTotal()
        }
    }
    const onListenForUserOrder = async () => {
        if (authUserRef) {
            let tempOrders = []
            let orderRef = props.firebase.orders()
            let unsubscribe = await orderRef.where("userRef", "==", `${authUserRef.uid}`).get()
            for (let orders of unsubscribe.docs) {
                let products = []
                let subCollectionDocs = await orderRef.doc(orders.id).collection(`products`).get();
                for (let subCollection of subCollectionDocs.docs) {
                    products.push({ ...subCollection.data(), uid: subCollection.id })
                }
                tempOrders.push({ ...orders.data(), uid: orders.id, products })
            }
            setuserOrders(tempOrders.reverse());

        }
    }

    useEffect(() => {
        const controller = new AbortController();
        if (sessionStorage.getItem("cart") === null) {
            sessionStorage.setItem("cart", JSON.stringify([]))
        }
        const runEffect = () => {
            try {
                onListenForCartProducts()
                onListenForCategories()
                onListenForProducts()
                onListenForUserOrder()
            } catch (err) {
                console.log("error ", err)
            }
        }
        runEffect();

        return () => {
            controller.abort();
        }
    }, [])

    const addToCart = async (uid, pcount, key, UID2, authUser, callback) => {
        const tempProducts = [...productos.products]
        const index = tempProducts.indexOf(getItem(uid))
        const product = tempProducts[index]
        const { variation } = product
        if (variation[key].quantity === 0) {
            return;
        }
        else {
            //hacemos la edicion del producto que va a la base de datos
            variation[key].inCart = true
            const count = pcount
            const newQuantity = variation[key].quantity - count
            if (newQuantity < 0) {
                return
            }
            const price = variation[key].price
            const total = price * count
            let editProduct = JSON.parse(JSON.stringify(product))
            editProduct.variation = editProduct.variation.find(item => item.variationUID === UID2)

            const tempProduct = {
                brand: editProduct.brand,
                category: editProduct.category,
                subcategory: editProduct.subcategory,
                name: editProduct.name,
                productUid: editProduct.uid,
                variation: {
                    color: editProduct.variation.color,
                    count: count,
                    price: price,
                    profile: editProduct.variation.profile,
                    total: total,
                    uid: editProduct.variation.variationUID,
                }
            }
            let CartRef = props.firebase.cart(authUser.cartRef)
            CartRef.collection(`products`).add({
                ...tempProduct,
            }).then(doc => {
                returnProductsQuantity(uid, UID2, -pcount, () => {
                    onListenForCartProducts().then(() => {
                        onListenForProducts()
                    })
                })
            })

            callback()
        }
    }
    const returnProductsQuantity = async (uid, variationUID, count, callback) => {
        let oldQuantity = 0
        let ProductRef = props.firebase.product(uid)
        let unsubscribe = await ProductRef.get()
            .then(async (doc) => {
                if (doc.exists) {
                    let getSubCollection = await ProductRef.collection(`variation`).doc(variationUID).get()
                        .then(async (subDoc) => {
                            oldQuantity = subDoc.data().quantity
                            let subCollection = await ProductRef.collection(`variation`).doc(variationUID).update({
                                quantity: oldQuantity + count
                            })
                        })
                        .catch((err) => {
                            console.log('ha habido un error', err)
                        })
                } else {
                    console.log("No existe el documento")
                }
            })
        callback()
    }

    const getItem = (uid) => {
        const product = productos.products.find(item => item.uid === uid)
        return product;
    }

    const increment = (uid, productUid, variationUID) => {
        //obtener mi producto de mi array de productos
        //sumarle a mi cuenta de carro 
        //restarle a mi base de datos
        const tempProducts = [...productos.products]
        const index = tempProducts.indexOf(getItem(productUid))
        const product = tempProducts[index]
        const { variation } = product
        let tempVariation = variation.find(item => item.variationUID === variationUID)
        const quantity = tempVariation.quantity
        console.log(quantity)
        if (quantity > 0) {
            let ProductCount = {}
            let CartProductRef = props.firebase.cartProduct(authUserRef.cartRef, uid)
            let unsubscribe = CartProductRef.get()
                .then((doc) => {
                    Object.assign(ProductCount, doc.data().variation)
                }).then(() => {
                    CartProductRef.update({
                        variation: {
                            ...ProductCount,
                            count: ProductCount.count + 1,
                            total: (ProductCount.count + 1) * ProductCount.price,
                        }

                    }).then(() => {
                        returnProductsQuantity(productUid, variationUID, -1, () => {
                            onListenForCartProducts().then(() => {
                                onListenForProducts()
                            })
                        })
                    })
                })
        }
    }
    const decrement = (uid, productUid, variationUID) => {
        const tempProducts = [...productos.products]
        const index = tempProducts.indexOf(getItem(productUid))
        const product = tempProducts[index]
        const { variation } = product
        let tempVariation = variation.find(item => item.variationUID === variationUID)
        const quantity = tempVariation.quantity
        console.log(quantity)

        let ProductCount = {}
        let CartProductRef = props.firebase.cartProduct(authUserRef.cartRef, uid)
        let unsubscribe = CartProductRef.get()
            .then((doc) => {
                Object.assign(ProductCount, doc.data().variation)
            }).then(() => {
                CartProductRef.update({
                    variation: {
                        ...ProductCount,
                        count: ProductCount.count - 1,
                        total: (ProductCount.count - 1) * ProductCount.price,
                    }

                }).then(() => {
                    returnProductsQuantity(productUid, variationUID, 1, () => {
                        onListenForCartProducts().then(() => {
                            onListenForProducts()
                        })
                    })
                })
            })

    }
    const removeItem = async (uid, productUid, variationUID, count) => {
        let productsinCart = []
        let CartProductRef = props.firebase.cartProduct(authUserRef.cartRef, uid)
        let unsubscribe = await CartProductRef.delete()
            .then(() => {
                returnProductsQuantity(productUid, variationUID, count, () => {
                    onListenForCartProducts().then(() => {
                        onListenForProducts()
                    })

                })
            })
    }

    const clearCart = () => {
        let oldQuantity = 0
        cart.map(async (item, idx) => {
            let ProductRef = props.firebase.product(item.productUid)
            let unsubscribe = await ProductRef.get()
                .then(async (doc) => {
                    if (doc.exists) {
                        let getSubCollection = await ProductRef.collection(`variation`).doc(item.variation.uid).get()
                            .then(async (subDoc) => {
                                oldQuantity = subDoc.data().quantity
                                let subCollection = await ProductRef.collection(`variation`).doc(item.variation.uid).update({
                                    quantity: oldQuantity + item.variation.count
                                }).then(async () => {
                                    let CartRef = props.firebase.cartProduct(authUserRef.cartRef, item.uid)
                                    CartRef.delete()
                                })
                            }).then(() => {
                                onListenForCartProducts().then(() => { onListenForProducts() })
                            })
                            .catch((err) => {
                                console.log('ha habido un error', err)
                            })
                    } else {
                        console.log("No existe el documento")
                    }
                })
        })
    }
    const eraseCart = async () => {
        cart.map(async (item, idx) => {
            let CartRef = props.firebase.cartProduct(authUserRef.cartRef, item.uid)
            CartRef.delete()
                .then(() => {
                    onListenForCartProducts().then(() => { onListenForProducts() })
                })
                .catch((err) => {
                    console.log('ha habido un error', err)
                })
        })
    }

    const addTotal = () => {
        let cartFromSession = JSON.parse(sessionStorage.getItem('cart'))
        let subTotal = 0;
        cartFromSession.map(item => (subTotal += item.variation.total))
        const tempTax = subTotal * 0.18
        const tax = parseFloat(tempTax.toFixed(2))
        const total = subTotal + tax
        setCartSubTotal(subTotal)
        setCartTax(tax)
        setCartTotal(total)
    }

    const createOrder = (order, authUser, total, tax, subtotal,callback) => {
        const tempOrder = {
            canceled: false,
            createtime: order.create_time,
            payer: { ...order.payer },
            userRef: authUser.uid,
            itbs: tax,
            waitCancel: false,
            total: total,
            delivered: false,
            subtotal: subtotal,
        }
        let orderRef = props.firebase.orders()
        orderRef.add({
            ...tempOrder,
            createdAt: props.firebase.fieldValue.serverTimestamp(),

        }).then(doc => {
            cart.map((product, i) => {
                orderRef.doc(doc.id).collection(`products`).add({
                    ...product,
                })
            })
            callback()
        })
    }
    const newProduct = (product,variation,callback) => {
        let tempProduct = {
            brand: product.brand,
            category: product.category,
            subcategory: product.subcategory,
            name: product.name,
            description: product.description
        }
        let ProductsRef = props.firebase.products()
        ProductsRef.add({
            ...tempProduct,
            createdAt: props.firebase.fieldValue.serverTimestamp(),

        }).then(doc => {
            variation.map((variation, i) => {
                ProductsRef.doc(doc.id).collection(`variation`).add({
                    ...variation,
                    price: variation.precio,
                })
            })
            callback()
        }).then(() => onListenForProducts())
    }


    return (
        <ProductContext.Provider value={{
            ...productos, categories: categories, cart: cart, increment: increment, decrement: decrement, removeItem: removeItem
            , clearCart: clearCart, addToCart: addToCart, cartSubTotal: cartSubTotal, cartTax: cartTax, cartTotal: cartTotal,
            userOrders: userOrders, createOrder: createOrder, eraseCart: eraseCart, newProduct: newProduct,
        }}>
            {props.children}
        </ProductContext.Provider>
    )


}

export default compose(withFirebase, withAuthentication)(ProductProvider);