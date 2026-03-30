import { createContext } from "react";

export type CartItem = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    category: string;
    quantity: number;
};
export type CartContextType = {
    cart: CartItem[];
    addToCart: (id: number, title: string, price: number, thumbnail: string, category: string) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

