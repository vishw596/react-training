import { useEffect, useRef, useState } from "react";

// export function useDebounce(fn,delay) {
//     const [timer,setTimer] = useState(null);
//     console.log("useDebounce called",timer);
//     return function(...args){
//         clearTimeout(timer)
//         const id = setTimeout(()=>{
//             console.log(id);

//             fn(...args)
//         },delay)
//         setTimer(id)
//     }
// }

export function useDebounce(fn, delay) {
    const timerRef = useRef(null);
    return function (...args) {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

export function useDebounceValue(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(id);
    }, [value]);
    return debouncedValue;
}
