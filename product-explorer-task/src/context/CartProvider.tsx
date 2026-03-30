import { useCallback, useState, type ReactNode } from "react";
import { CartContext, type CartItem } from "./CartContext";

export default function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = useCallback(
        (
            id: number,
            title: string,
            price: number,
            thumbnail: string,
            category: string,
        ) => {
            setCart((prev) => [
                ...prev,
                { id, title, price, category, thumbnail, quantity: 1 },
            ]);
        },
        [],
    );

    const increaseQuantity = useCallback((productId: number) => {
        setCart((prev) => {
            return prev.map((product) =>
                product.id === productId
                    ? { ...product, quantity: product.quantity + 1 }
                    : product,
            );
        });
    }, []);
    const decreaseQuantity = useCallback((productId: number) => {
        setCart((prev) => {
            return prev
                .map((product) =>
                    product.id === productId
                        ? { ...product, quantity: Math.max(product.quantity - 1, 0) }
                        : product,
                )
                .filter(({ quantity }) => quantity > 0);
        });
    }, []);
    return (
        <CartContext.Provider
            value={{ cart, addToCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
}


