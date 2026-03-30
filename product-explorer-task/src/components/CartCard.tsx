import { memo } from "react";
import { useCartAction } from "../context/CartProvider";

type CartCardProps = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    category: string;
    quantity: number;
};

function CartCard({ id, title, price, thumbnail, category, quantity }: CartCardProps) {
    const { increaseQuantity, decreaseQuantity } = useCartAction();
    console.log('re-render');
    
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <img src={thumbnail} alt="" style={{ height: "200px" }} />
            <div>
                <p>Title:{title}</p>
                <p>Category:{category}</p>
                <p>price:{price}</p>
                <button
                    onClick={() => {
                        increaseQuantity(id);
                    }}>
                    +
                </button>
                {quantity}
                <button onClick={() => decreaseQuantity(id)}>-</button>
            </div>
        </div>
    );
}
export default memo(CartCard);
