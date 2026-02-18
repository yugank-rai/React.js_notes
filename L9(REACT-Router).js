/* -----------------------------------------------------------------------------
   TOPIC: React Router DOM - Navigation in React
   SOURCE: Piyush Garg (React Tutorial Series)
   
   DESCRIPTION: 
   This file explains how to implement client-side routing in React. 
   Unlike traditional websites that reload the page when you click a link, 
   React Router allows us to change the URL and content INSTANTLY without 
   a page refresh (Single Page Application - SPA).

   KEY TAKEAWAYS:
   1. Installation: `npm install react-router-dom`
   2. Wrap the app in <BrowserRouter>.
   3. Use <Routes> and <Route> to define paths.
   4. Use <Link> instead of <a> tags to prevent page reloading.
   5. Dynamic Routing using `useParams` (e.g., /user/123).
   -----------------------------------------------------------------------------
*/

// ==========================================
// 1. INSTALLATION & SETUP (index.js / main.jsx)
// ==========================================

/* First, we need to wrap our entire application in the `BrowserRouter` component.
   This gives our App the ability to track the URL and change views.
*/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import this
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


// ==========================================
// 2. DEFINING ROUTES (App.jsx)
// ==========================================

import { Routes, Route } from "react-router-dom";

// Let's assume we have these simple components created elsewhere
import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <h1>My React App</h1>
      
      {/* The <Routes> container holds all possible paths.
         React looks at the URL and renders the FIRST <Route> that matches.
      */}
      <Routes>
        {/* If URL is "/", render Home component */}
        <Route path="/" element={<Home />} />
        
        {/* If URL is "/about", render About component */}
        <Route path="/about" element={<About />} />
        
        {/* If URL is "/profile", render Profile component */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}


// ==========================================
// 3. NAVIGATION WITHOUT RELOAD (The <Link> Component)
// ==========================================

/*
   CRITICAL: Do NOT use the HTML <a> tag (e.g., <a href="/about">).
   The <a> tag causes a full page refresh, which destroys the React state.
   Instead, use <Link> from react-router-dom.
*/

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      {/* These change the URL *without* reloading the page */}
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}


// ==========================================
// 4. DYNAMIC ROUTING (Variable Paths)
// ==========================================

/*
   Sometimes we need routes that change based on ID, username, etc.
   Example: /user/1, /user/2, /user/yugank
   
   We use the colon (:) syntax to define a variable part of the URL.
*/

// In App.jsx
<Route path="/user/:userId" element={<UserPage />} />

/*
   Now, how do we get that "userId" inside the UserPage component?
   We use the hook: `useParams()`
*/

import { useParams } from "react-router-dom";

function UserPage() {
  // useParams returns an object with the dynamic values from the URL
  const params = useParams();
  
  // If URL is "/user/101", then params.userId will be "101"
  return (
    <div>
      <h1>User Details Page</h1>
      <p>Viewing profile for User ID: {params.userId}</p>
    </div>
  );
}


// ==========================================
// 5. REAL WORLD EXAMPLE: Fetching Data with Dynamic Routes
// ==========================================

/*
   Common Pattern: 
   1. User clicks a blog post link (/post/5).
   2. Component grabs ID "5" using useParams().
   3. useEffect uses that ID to fetch data from an API.
*/

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostDetails() {
  const { postId } = useParams(); // Extract ID from URL (defined as /post/:postId)
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data specifically for this ID
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [postId]); // Re-run if the postId changes

  if (!data) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
}