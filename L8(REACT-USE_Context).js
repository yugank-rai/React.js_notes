// context/CounterContext.js
import { createContext, useState, useContext } from "react";

/**
 * STEP 1: Create the Context
 * This is like creating a 'teleportation portal' for your data.
 */
const CounterContext = createContext(null);

/**
 * STEP 2: Create a Provider Component
 * The 'Provider' is a wrapper. Any component inside this wrapper 
 * will have access to the data we pass into it.
 */
export const CounterProvider = (props) => {
  const [count, setCount] = useState(0); // This is the global state

  return (
    // We pass the state and the updater function as a 'value'
    <CounterContext.Provider value={{ count, setCount }}>
      {props.children} 
    </CounterContext.Provider>
  );
};

/**
 * STEP 3: Create a Custom Hook (Best Practice)
 * Instead of importing 'useContext' and 'CounterContext' everywhere,
 * we create a simple 'useCounter' hook to keep the code clean.
 */
export const useCounter = () => {
  return useContext(CounterContext);
};
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CounterProvider } from './context/CounterContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrapping <App /> ensures that every single component 
      in your project can now access the Counter state.
    */}
    <CounterProvider>
      <App />
    </CounterProvider>
  </React.StrictMode>
);
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// components/CounterComponent.jsx
import React from "react";
import { useCounter } from "../context/CounterContext";

const CounterComponent = () => {
  // Use our custom hook to get the global state [00:15:11]
  const counterState = useCounter();

  return (
    <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      <h1>Count is: {counterState.count}</h1>
      
      {/* Update the global state directly from this component [00:15:55] */}
      <button onClick={() => counterState.setCount(counterState.count + 1)}>
        Increment
      </button>
      
      <button onClick={() => counterState.setCount(counterState.count - 1)}>
        Decrement
      </button>
    </div>
  );
};

export default CounterComponent;