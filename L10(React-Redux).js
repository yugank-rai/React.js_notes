/* -----------------------------------------------------------------------------
   TOPIC: React Redux (with Redux Toolkit)
   SOURCE: Piyush Garg (React Tutorial Series)
   
   DESCRIPTION: 
   As apps grow, passing data (props) from parent -> child -> grandchild 
   becomes messy. This is called "Prop Drilling". 
   
   Redux solves this by creating a Central "Store" (like a database in the frontend)
   that any component can access directly, regardless of where it is in the tree.

   KEY TERMS:
   1. Store: The single place where all application state lives.
   2. Slice: A chunk of the store handling a specific feature (e.g., CartSlice, UserSlice).
   3. Action: Describes "what happened" (e.g., "ADD_TO_CART").
   4. Reducer: A function that says "how the state changes" based on the action.
   5. Dispatch: How we send an action to the store.
   6. Selector: How we get data out of the store.
   -----------------------------------------------------------------------------
*/

// ==========================================
// 0. INSTALLATION
// ==========================================
// npm install @reduxjs/toolkit react-redux


// ==========================================
// 1. CREATING A SLICE (redux/slices/cartSlice.js)
// ==========================================

/* A "Slice" contains the initial state and the functions (reducers) 
   to modify that state. Redux Toolkit's `createSlice` makes this very easy.
*/

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "Cart",
    initialState: [], // Initial state is an empty array (empty cart)
    
    // Reducers: Functions that define HOW to change the state
    reducers: {
        // Function to add an item to the cart
        addItem: (state, action) => {
            // In older Redux, we had to return a NEW array (immutability).
            // In Redux Toolkit, we can "mutate" state directly (it handles immutability behind the scenes).
            state.push(action.payload); 
        },
        // Function to remove an item (logic can be added here)
        removeItem: (state, action) => {
            // logic to remove item
        }
    }
});

// Export the "Actions" so components can use them
// createSlice automatically generates actions with the same names as reducers
export const { addItem, removeItem } = cartSlice.actions;

// Export the "Reducer" so the Store can use it
export default cartSlice.reducer;


// ==========================================
// 2. CONFIGURING THE STORE (redux/store.js)
// ==========================================

/*
   The Store is the global container combining all your slices.
*/

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice"; // Import the reducer we just made

export const store = configureStore({
    reducer: {
        cart: cartReducer, // We name this slice 'cart'
        // user: userReducer, // We could add more slices here
    },
});


// ==========================================
// 3. PROVIDING THE STORE (main.jsx / index.js)
// ==========================================

/*
   We need to wrap our entire React app in the <Provider> 
   so that every component can access the Redux Store.
*/

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux"; // Import Provider
import { store } from "./redux/store";  // Import the store we created

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* Pass the store to the Provider */}
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);


// ==========================================
// 4. WRITING DATA: DISPATCH (Product.jsx)
// ==========================================

/*
   To change the state (e.g., Add item to cart), we "Dispatch" an action.
   Hook: useDispatch()
*/

import React from "react";
import { useDispatch } from "react-redux"; 
import { addItem } from "../redux/slices/cartSlice"; // Import the action

const Product = ({ name, price }) => {
    const dispatch = useDispatch(); // Initialize the hook

    const handleAddToCart = () => {
        // dispatch(actionName(data))
        // 'data' here becomes 'action.payload' in the slice
        dispatch(addItem({ name: name, price: price }));
    };

    return (
        <div className="card">
            <h3>{name}</h3>
            <p>${price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};
export default Product;


// ==========================================
// 5. READING DATA: SELECTOR (Cart.jsx)
// ==========================================

/*
   To read data from the store, we use a "Selector".
   Hook: useSelector()
*/

import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
    // useSelector takes the entire global state and returns just what we need
    // state.cart matches the key we defined in store.js
    const items = useSelector((state) => state.cart);

    // Calculate total price
    const total = items.reduce((a, b) => a + b.price, 0);

    return (
        <div className="alert alert-success">
            <h3>Total Items: {items.length}</h3>
            <h3>Total Bill: ${total}</h3>
            
            {/* Displaying items */}
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name} - ${item.price}</li>
                ))}
            </ul>
        </div>
    );
};
export default Cart;


// ==========================================
// 6. SUMMARY: THE DATA FLOW
// ==========================================

/*
   1. User clicks "Add to Cart" Button.
   2. Component calls dispatch(addItem({name: 'Macbook'})).
   3. Action travels to the Store's Reducer.
   4. Reducer (in cartSlice) receives the action and pushes payload to state.
   5. Store updates the state.
   6. Any component using useSelector (like Cart.jsx) detects the change and re-renders automatically with new data.
*/