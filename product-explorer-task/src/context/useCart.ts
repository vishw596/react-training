import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function useCart(){
    const context = useContext(CartContext)
    if(!context){
        throw new Error("cart context must be used inside provider")
    }
    return context
}