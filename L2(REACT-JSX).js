/**
 * TOPIC: REACT JSX (JavaScript XML)
 * Source: Piyush Garg (React Tutorial Series)
 * * WHAT IS JSX?
 * - JSX stands for JavaScript XML.
 * - It allows us to write HTML-like code inside JavaScript.
 * - It makes the code easier to write and understand compared to raw 'React.createElement' calls.
 * - Browsers don't understand JSX directly; tools like Babel compile it into regular JavaScript. [00:00:11]
 */

import React from 'react';

function JSXLearning() {
  // 1. Embedding Expressions in JSX [00:01:06]
  // You can put any valid JavaScript expression inside curly braces {}.
  const name = "Yugank";
  const userRole = "Developer";
  
  // 2. Using Attributes with JSX [00:05:05]
  // You can use variables to set attributes like 'src', 'href', 'alt', etc.
  const imageUrl = "https://via.placeholder.com/150";
  const profileLink = "https://github.com/YugankRai";

  /**
   * MULTI-LINE JSX RULE: [00:08:20]
   * If your JSX spans multiple lines, always wrap it in parentheses ( ).
   * This prevents JavaScript from automatically inserting semicolons and breaking your code.
   */
  return (
    <div className="container">
      {/* Rendering Variables */}
      <h1>Hello, {name}!</h1> 
      <p>Your role is: {userRole}</p>

      {/* 3. Evaluating Math/Logic inside JSX [00:02:58] */}
      <p>Calculation Example (2 + 3): {2 + 3}</p>

      {/* 4. Dynamic Attributes [00:06:00] */}
      <img src={imageUrl} alt="Profile" />
      <br />
      <a href={profileLink} target="_blank" rel="noreferrer">
        Visit My Profile
      </a>

      {/* 5. JavaScript Logic inside JSX [00:04:11] */}
      <p>
        Conditional Status: {name === "Yugank" ? "Admin Access" : "Guest"}
      </p>
    </div>
  );
}

/**
 * IMPORTANT RULES SUMMARY: [00:03:34]
 * 1. Single Root Element: JSX must return a single parent element (e.g., wrap everything in one <div> or a Fragment <>).
 * 2. camelCase Attributes: Use 'className' instead of 'class' and 'tabIndex' instead of 'tabindex'.
 * 3. Curly Braces: Use {} to inject JavaScript variables, functions, or math directly into your HTML structure. [00:02:22]
 */

export default JSXLearning;