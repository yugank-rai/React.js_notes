/**
 * TOPIC: REACT HOOKS & useState
 * Source: Piyush Garg (React Tutorial Series)
 * * * WHAT ARE HOOKS?
 * - Hooks are special functions that allow you to "hook into" React features.
 * - They allow functional components to have state and lifecycle features.
 * * * THE COMPONENT LIFECYCLE:
 * 1. Mounting: When the component is created and inserted into the DOM (appears on screen).
 * 2. Updating: When the component's state or props change (re-renders).
 * 3. Unmounting: When the component is removed from the DOM (disappears).
 */

import React, { useState } from 'react';

/**
 * UNDERSTANDING STATE: 
 * - State is an object that holds information about the component.
 * - Unlike regular variables, when 'State' changes, React automatically 
 * RE-RENDERS the component to show the new data. 
 */

function CounterComponent() {
  /**
   * useState HOOK SYNTAX: 
   * const [state, setState] = useState(initialValue);
   * 1. 'count': The current state value.
   * 2. 'setCount': A function to update the state.
   * 3. '0': The starting value.
   */
  const [count, setCount] = useState(0);

  // Logic to handle increment
  const handleIncrement = () => {
    // We NEVER mutate state directly (e.g., count = count + 1 is WRONG)
    // We always use the setter function.
    setCount(count + 1);
  };

  // Logic to handle decrement
  const handleDecrement = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {/* 1. Displaying State */}
      <h2>Count is: {count}</h2>
      
      {/* 2. Conditional Rendering based on State  */}
      <p>Number is {count % 2 === 0 ? "Even" : "Odd"}</p>

      {/* 3. Updating State on Click */}
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement} style={{ marginLeft: '10px' }}>
        Decrement
      </button>
    </div>
  );
}

/**
 * KEY CONCEPTS:
 * 1. Independent State:
 * If you use <CounterComponent /> multiple times in App.js, 
 * each one keeps its own separate count. Changing one doesn't affect the others.
 * * 2. Re-rendering:
 * When setCount is called, React "calls" your function component again 
 * with the new value to update the UI.
 * * 3. Initial Value: 
 * The value inside useState(0) is only used during the very first render (Mounting). [00:21:46]
 */

export default CounterComponent;