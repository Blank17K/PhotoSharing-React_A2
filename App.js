// Student Number: 

const { useState } = React;

// ==========================
// Supplied Data
// Do not modify this section
// ==========================

const posts = [
    {
        id: 1,
        username: "@sarah",
        caption: "Studying React today!",
        status: "Published"
    },
    {
        id: 2,
        username: "@john",
        caption: "Finished Practical 3.",
        status: "Draft"
    },
    {
        id: 3,
        username: "@amy",
        caption: "Coffee before coding.",
        status: "Published"
    },
    {
        id: 4,
        username: "@michael",
        caption: "Working on Assignment 2.",
        status: "Archived"
    },
    {
        id: 5,
        username: "@leanne",
        caption: "Sunset over campus.",
        status: "Published"
    }
];

// ==========================
// React Components
// Write your components below
// ==========================

function App() {
    return (
        <div className="app">
            <h1>PhotoShare Manager</h1>
        </div>
    );
}

// ==========================
// Render the Application
// Do not modify this section
// ==========================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);