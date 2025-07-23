const addDecimal = (num) => {
    return num.toFixed(2)
}

const updateCart = (state) => {

    // calculates items price
    state.itemsPrice = addDecimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    // calculate shipping price , if items price is greater than 100 , shipping price is free else shipping price is 100
    state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10)

    // calculate tax price // Tax is 15% of the items price
    state.taxPrice = addDecimal(0.15 * state.itemsPrice)

    // calculate total price
    state.totalPrice = Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)

    // save to localstorage in order to save the data from lost when page is refreshed
    localStorage.setItem('cart', JSON.stringify(state))

    return state

}

export { updateCart }