/* eslint-disable no-irregular-whitespace */
// 2. useEffect + cleanup
// Create a component that starts a `setInterval` when it mounts, updates a counter every second, and clears the interval in a `useEffect` cleanup. Unmount the component (e.g. toggle with a button) and confirm the interval stops (no console errors or extra ticks).

import { useEffect, useState } from "react";

export function CounterUseEffect() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setCounter((prev) => prev + 1), 1000);
        console.log(`Counter mounted with id ${id}`);

        return () => {
            clearInterval(id);
            console.log(`Counter unmounted with id ${id}`);
        };
    }, []);
    return (
        <>
            <h1>Counter:{counter}</h1>
        </>
    );
}

export default function ToggleCounterBtn() {
    const [toggle, setToggle] = useState(true);
  
    return (
        <>
            {toggle && <CounterUseEffect />}
            <button
                onClick={() => {
                    setToggle((prev) => !prev);
                }}>
                Toggle Counter
            </button>
        </>
    );
}
