import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDebounce, useDebounceValue } from "./hooks/useDebounce";

function App() {
    const [val, setVal] = useState("");
    const [data, setData] = useState("");
    const debouncedFetch = useDebounce(async (val) => {
        console.log("req goes now with value", val);
        if (val === "") return;
        const res = await fetch(
            `https://dummyjson.com/users/search?q=${val}&select=firstName`,
        );
        const data = await res.json();
        console.log(data);
    }, 2000);
    // const debouncedVal = useDebounceValue(val, 2000);
    // useEffect(() => {
    //     if (debouncedVal !== "") {
    //         console.log("Api call trigger", debouncedVal);
    //     }
    // }, [debouncedVal]);
    return (
        <>
            <input
                type="text"
                onChange={(e) => {
                    console.log(e.target.value);
                    setVal(e.target.value);
                    debouncedFetch(e.target.value);
                }}
                value={val}
            />
            {data}
        </>
    );
}

export default App;
