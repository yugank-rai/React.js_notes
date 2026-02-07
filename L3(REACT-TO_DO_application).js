/**
 * TOPIC: BUILDING A REACT TODO APP (COMPONENTS & JSX PRACTICE)
 * Source: Piyush Garg (React Tutorial Series)
 * * PROJECT STRUCTURE:
 * - We break the UI into small pieces: Header, TodoItem, and Button.
 * - This video focuses on "Component Architecture" — how to divide a UI.
 */

import React from 'react';
import './style.css'; // Assuming your CSS is in a separate file

/**
 * 1. HEADER COMPONENT
 * Created in a separate file (e.g., Header.jsx)
 */
function Header() {
  return (
    <h1 className="todo-header">Todo App</h1>
  );
}

/**
 * 2. TODO ITEM COMPONENT
 * Created in a separate file (e.g., TodoItem.jsx) [00:06:04]
 * - Contains a checkbox, the task text, and a "..." menu icon.
 */
function TodoItem() {
  return (
    <li className="todo-item">
      <span>
        <input type="checkbox" />
        <span className="todo-item-text">Eat</span>
      </span>
      <p>...</p> {/* Placeholder for options/menu */}
    </li>
  );
}

/**
 * 3. BUTTON COMPONENT
 * Created in a separate file (e.g., Button.jsx) [00:08:53]
 * - A reusable button specifically for adding items.
 */
function Button() {
  return (
    <button className="todo-button">Add Todo</button>
  );
}

/**
 * 4. MAIN APP COMPONENT
 * Assembling all the pieces together. [00:05:06]
 */
function App() {
  return (
    <div className="todo-container">
      {/* Integrating the Header */}
      <Header />

      {/* Integrating multiple TodoItems (Reusability) [00:13:27] */}
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />

      {/* Integrating the Action Button */}
      <Button />
    </div>
  );
}

/**
 * KEY LEARNINGS FROM THIS PROJECT:
 * 1. COMPONENT FOLDER: It is best practice to keep components in a 'components' folder. [00:04:10]
 * 2. FRAGMENTS vs DIVS: If you don't want extra nodes in your HTML, you can use React Fragments <>.
 * 3. EXPORTING: Remember to 'export default ComponentName' so you can import it in App.js. [00:08:10]
 * 4. STYLING JSX: Use 'className' instead of 'class' for CSS styling. [00:10:14]
 */

export default App;