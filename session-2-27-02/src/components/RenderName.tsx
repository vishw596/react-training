// useState
//Add a new component that has two pieces of state:name(string) and age(number). Render them and add buttons to increment age and update name from an input.

import { useState, type ChangeEvent } from "react";

function RenderName() {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [input, setInput] = useState("");
    return (
        <>
            <input
                type="text"
                placeholder="Enter name"
                onChange={(e:ChangeEvent<HTMLInputElement>) => {
                    console.log(e.target.value);
                    setInput(e.target.value);
                }}
            />
            <button
                onClick={() => {
                    setName(input);
                }}>
                Update Name
            </button>
            <button onClick={() => setAge((prev) => prev + 1)}>Increment Age</button>
            <h3>Name:{name}</h3>
            <h3>Age:{age}</h3>
        </>
    );
}

export default RenderName;
