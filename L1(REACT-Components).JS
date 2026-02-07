/**
 * TOPIC: REACT COMPONENTS
 * Source: Piyush Garg (React Tutorial Series)
 * * WHAT IS A COMPONENT?
 * - Components are the building blocks of a React application.
 * - Think of them as independent, reusable pieces of UI (User Interface).
 * - A website is made of many components: Header, Buttons, Cards, Sidebars, etc.
 * - Every component can contain other components (Nested Components).
 */

import React from 'react';

/**
 * RULE 1: Function must return JSX (JavaScript XML).
 * RULE 2: Component name MUST start with an UPPERCASE letter.
 * (If it starts with lowercase, React treats it as a standard HTML tag).
 */

// Example 1: A simple Greeting Component
function MyGreeting() {
  // Components return what looks like HTML but is actually JSX [00:03:32]
  return (
    <div>
      <h1>Hello from My Component!</h1>
      <p>This is how we create a basic functional component.</p>
    </div>
  );
}

// Example 2: A Reusable Button Component [00:07:32]
function MyButton() {
  return (
    <button style={{ padding: '10px', cursor: 'pointer' }}>
      Click Me!
    </button>
  );
}

/**
 * HOW TO USE COMPONENTS (Rendering)
 * - We use them like custom HTML tags: <ComponentName />
 */
function App() {
  return (
    <div>
      {/* Rendering our custom components multiple times */}
      <MyGreeting /> 
      
      <MyButton />
      <MyButton /> {/* Components are reusable! [00:01:02] */}
    </div>
  );
}

/**
 * SUMMARY OF RULES [00:06:48]:
 * 1. Must return JSX: A component that returns nothing or non-JSX isn't a React component.
 * 2. PascalCase Naming: "myComponent" (lowercase) will fail or not render; 
 * it must be "MyComponent".
 */

export default App;