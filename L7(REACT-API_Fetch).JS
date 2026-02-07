/**
 * TOPIC: CALLING APIs IN REACT (Fetch API & useEffect)
 * Source: Piyush Garg (React Tutorial Series)
 * * WHAT IS AN API?
 * - Application Programming Interface.
 * - It acts as a bridge between your Frontend (React) and the Backend/Database.
 * - We send a 'Request' and get a 'Response' (usually in JSON format).
 */

import React, { useState, useEffect } from 'react';

/**
 * 1. THE API LOGIC (Separate Function)
 * - Good Practice: Keep your fetch logic in a helper function or separate file. 
 */
export const getPosts = async () => {
  // Using the native 'fetch' API 
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "GET",
  });
  // Convert the response to JSON 
  return await response.json();
};

export const getRandomUser = async () => {
  const response = await fetch("https://randomuser.me/api/", {
    method: "GET",
  });
  return await response.json();
};

/**
 * 2. DATA RENDERING COMPONENT
 */
function ApiLearning() {
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);

  /**
   * USE CASE: Fetching data when the component loads (Mounting) 
   */
  useEffect(() => {
    // Fetch posts on load
    getPosts().then((posts) => setData(posts));
    
    // Fetch random user on load
    refreshUser();
  }, []);

  const refreshUser = () => {
    getRandomUser().then((user) => setUserData(user.results[0])); 
  };

  return (
    <div className="container">
      {/* 3. REFRESH DATA ON BUTTON CLICK  */}
      <div className="user-section">
        {userData ? (
          <div className="user-card">
            <h3>{userData.name.first} {userData.name.last}</h3>
            <p>Email: {userData.email}</p>
            <button onClick={refreshUser}>Refresh User</button>
          </div>
        ) : (
          <p>Loading User...</p>
        )}
      </div>

      <hr />

      {/* 4. RENDERING LISTS (Map Function)  */}
      <h2>Posts</h2>
      <div className="posts-list">
        {data ? (
          data.map((post) => (
            <div key={post.id} className="post-card">
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </div>
          ))
        ) : (
          <p>No Data Available</p>
        )}
      </div>
    </div>
  );
}

/**
 * KEY TAKEAWAYS:
 * 1. JSON Parsing: 'fetch' returns a raw response; you must call '.json()' to use the data. 
 * 2. Loading States: Always check if your data is null before mapping, otherwise the app will crash on first render. 
 * 3. useEffect for API: Use [] dependency array to ensure the API is called only once when the page opens. 
 * 4. Refresh Logic: To update data, simply call the fetch function again and update the state; React handles the re-render. 
 */

export default ApiLearning;