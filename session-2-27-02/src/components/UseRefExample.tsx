// 6. **Self-study hooks (useRef, useReducer)**
    
//     Add these to your assignment: build at least one small example using **useRef** (e.g. focus an input, or store a value that doesn’t need to trigger re-renders) and one using **useReducer** (e.g. a simple counter or form with multiple fields).


import { useRef } from "react";

export default function UseRefExample() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <>
            <input type="text" ref={inputRef} />
            <button
                onClick={() => {
                    inputRef.current?.focus();
                }}>
                Focus Input
            </button>
        </>
    );
}
