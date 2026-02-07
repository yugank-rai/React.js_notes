/**
 * TOPIC: THE useEffect HOOK
 * Source: Piyush Garg (React Tutorial Series)
 * * WHAT IS useEffect?
 * - It's a Hook that lets you perform "Side Effects" in functional components.
 * - Side Effects include: Fetching data from an API, setting up a subscription, 
 * manually changing the DOM, or setting up timers (setTimeout/setInterval).
 * - It "injects" logic into the Component Lifecycle (Mount, Update, Unmount). [00:03:11]
 */

import React, { useState, useEffect } from 'react';

function UseEffectExample() {
  const [count, setCount] = useState(0);
  const [otherCount, setOtherCount] = useState(50);

  /**
   * SYNTAX: useEffect(setupFunction, dependencyArray);
   * * CASE 1: No Dependency Array
   * Runs on every single render (mount + every update). 
   */
  useEffect(() => {
    console.log("I run on EVERY render");
  });

  /**
   * CASE 2: Empty Dependency Array []
   * Runs ONLY ONCE when the component mounts (appears on screen). 
   * Perfect for API calls or starting a timer.
   */
  useEffect(() => {
    console.log("I only run ONCE (Mounting)");
  }, []);

  /**
   * CASE 3: With Dependencies [count]
   * Runs on mount + whenever 'count' changes. 
   * It will NOT run if 'otherCount' changes.
   */
  useEffect(() => {
    console.log("Count changed to:", count);

    /**
     * CLEANUP FUNCTION (The 'Return' Function)
     * - React runs this before the component unmounts.
     * - It also runs before re-running the effect due to a dependency change.
     * - Used to clear timers, cancel API requests, or remove event listeners.
     */
    return () => {
      console.log("Cleaning up before next effect or unmount...");
    };
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Update Count</button>
      
      <p>Other Count: {otherCount}</p>
      <button onClick={() => setOtherCount(otherCount + 1)}>Update Other</button>
    </div>
  );
}

/**
 * PRACTICAL EXAMPLE: A TIMER
 */
function TimerComponent() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    // 1. Setup side effect (Interval)
    const interval = setInterval(() => {
      console.log("Adding new interval...");
      setTime((prev) => prev + 1);
    }, 1000);

    // 2. Cleanup side effect
    // Without this, intervals will stack up and crash the app!
    return () => {
      console.log("Clearing old interval...");
      clearInterval(interval);
    };
  }, []); // Runs once on mount, cleans up on unmount

  return <h1>Time: {time}s</h1>;
}

/**
 * LIFECYCLE SUMMARY: 
 * 1. Mounting: Component enters the UI.
 * 2. Updating: State or Props change -> Re-render.
 * 3. Unmounting: Component leaves the UI.
 */

export default UseEffectExample;