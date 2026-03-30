import { useContext } from "react";
import { FilterContext } from "./FilterContext";

export function useFilter(){
    const context = useContext(FilterContext)
    if(!context){
        throw new Error("Hook is not used inside provider")
    }
    return context
}