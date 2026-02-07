/**
 * TOPIC: PROPS IN REACT
 * Source: Piyush Garg (React Tutorial Series)
 * * WHAT ARE PROPS?
 * - 'Props' stands for Properties.
 * - They are like arguments passed to a JavaScript function. [00:00:52]
 * - Props make your components "Generic" and reusable by allowing them to display 
 * different data without changing the component code itself.
 */

import React from 'react';

/**
 * 1. DEFINING A COMPONENT WITH PROPS
 * - Props are received as an object in the function parameter. [00:02:45]
 */
function TodoItem(props) {
  return (
    <li className="todo-item">
      <span>
        {/* Conditional Rendering using Props [00:07:32] */}
        {/* If 'completed' prop is NOT true, show the checkbox */}
        {!props.completed && <input type="checkbox" />}
        
        {/* Using a prop value (dynamic text) [00:04:23] */}
        <span className="todo-item-text">{props.text}</span>
      </span>
      {/* Passing data to a nested element [00:09:57] */}
      <p>{props.customTag || "..."}</p>
    </li>
  );
}

/**
 * 2. PASSING PROPS TO COMPONENTS
 * - You pass props like HTML attributes.
 * - Key/Value pairs: attributeName="value"
 */
function App() {
  return (
    <div className="todo-container">
      <h1>My Tasks</h1>
      
      {/* Passing a string prop named 'text' [00:05:05] */}
      <TodoItem text="Eat" />
      
      {/* Passing different text to the SAME component (Reusability) [00:05:14] */}
      <TodoItem text="Code" />
      
      {/* Passing multiple props (text and a boolean) [00:08:21] */}
      <TodoItem text="Sleep" completed={true} />
      
      {/* Passing a custom prop for the end icon/tag [00:10:03] */}
      <TodoItem text="Repeat" customTag="Done" />
    </div>
  );
}

/**
 * WHY DO WE NEED PROPS? [00:00:39]
 * 1. Avoid Hardcoding: Without props, every 'TodoItem' would show the same text.
 * 2. Control from Parent: The Parent (App.js) decides what the Child (TodoItem) 
 * should display or how it should behave.
 * 3. Functional Logic: Just like passing 'a' and 'b' to an add(a, b) function, 
 * we pass data to components to get specific UI outputs. [00:01:42]
 */

export default App;