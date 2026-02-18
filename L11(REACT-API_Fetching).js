/* -----------------------------------------------------------------------------
   TOPIC: Redux Toolkit - Async Operations (API Calls)
   SOURCE: Piyush Garg (React Tutorial Series)
   
   DESCRIPTION: 
   Standard Reducers in Redux are "Synchronous" (they happen instantly).
   But fetching data from an API takes time. To handle this, we use a concept 
   called "Thunk". 
   
   Redux Toolkit gives us `createAsyncThunk` to make this easy.
   
   KEY TAKEAWAYS:
   1. createAsyncThunk: A function to perform async tasks (API calls).
   2. Promises: It automatically handles 3 states: Pending, Fulfilled, Rejected.
   3. extraReducers: Used in the Slice to listen to these async actions.
   -----------------------------------------------------------------------------
*/

// ==========================================
// 1. CREATING THE ASYNC THUNK (redux/slices/todoSlice.js)
// ==========================================

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ACTION: fetchTodos
   We use createAsyncThunk to define the API call.
   It takes two arguments:
   1. Action name ('fetchTodos') - naming convention matters.
   2. An async callback function that fetches the data.
*/
export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
    // Standard fetch call
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    return response.json(); // This returned data becomes 'action.payload'
});

// ==========================================
// 2. HANDLING THE STATES IN SLICE
// ==========================================

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
    },
    
    // Standard reducers are for sync actions (like toggleTheme)
    reducers: {},

    // EXTRA REDUCERS:
    // This is where we listen for the 'fetchTodos' thunk we created above.
    // createAsyncThunk generates 3 lifecycle actions automatically:
    // 1. pending   (API call started)
    // 2. fulfilled (API call successful)
    // 3. rejected  (API call failed)
    
    extraReducers: (builder) => {
        // CASE 1: Request Started
        builder.addCase(fetchTodos.pending, (state, action) => {
            state.isLoading = true;
        });

        // CASE 2: Request Successful
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload; // Store the data from the API
        });

        // CASE 3: Request Failed
        builder.addCase(fetchTodos.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
            state.isLoading = false;
        });
    },
});

export default todoSlice.reducer;


// ==========================================
// 3. USING IT IN THE COMPONENT (App.jsx)
// ==========================================

import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "./redux/slices/todoSlice";

function App() {
    const dispatch = useDispatch();
    
    // Select the specific piece of state we need
    // Note: state.todo comes from the store configuration key
    const state = useSelector((state) => state.todo);

    console.log("Current State:", state);

    if (state.isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="App">
            {/* BUTTON TO TRIGGER API CALL */}
            <button onClick={() => dispatch(fetchTodos())}>
                Fetch Todos
            </button>

            {/* RENDER DATA */}
            {state.data.map((todo) => (
                <div key={todo.id}>
                    <li>{todo.title}</li>
                </div>
            ))}
        </div>
    );
}

// ==========================================
// 4. SUMMARY OF FLOW
// ==========================================

/*
   1. User clicks "Fetch Todos" button.
   2. Component calls `dispatch(fetchTodos())`.
   3. Redux triggers `fetchTodos.pending`.
      -> `extraReducers` sets `isLoading = true`.
      -> UI updates to show "Loading...".
   4. API call finishes successfully.
   5. Redux triggers `fetchTodos.fulfilled`.
      -> `extraReducers` sets `isLoading = false` and `data = action.payload`.
      -> UI updates to show the list of Todos.
*/