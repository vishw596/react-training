import { memo } from "react";

type BaseProductCardProps = {
    id: number;
    thumbnail: string;
    title: string;
    price: number;
    category: string;
    quantity: number;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
};

type ProductCardProps =
    | ({
          type: "productList";
          rating: number;
          stock: number;
          addToCart: (id: number, title: string, price: number, thumbnail: string, category: string) => void;
      } & BaseProductCardProps)
    | ({ type: "cartList" } & BaseProductCardProps);

function ProductCard(props: ProductCardProps) {
    const { id, thumbnail, title, category, price, type, quantity, increaseQuantity, decreaseQuantity } = props;
    console.log("Cart card re-render", id, type);
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <img src={thumbnail} alt="" style={{ height: "200px" }} />
            <div>
                <p>Title:{title}</p>
                <p>Category:{category}</p>
                <p>price:{price}</p>
                {type === "productList" && (
                    <>
                        <p>rating:{props.rating}</p>
                        <p>stock:{props.stock}</p>
                        {quantity === 0 && (
                            <button
                                onClick={() => {
                                    props.addToCart(id, title, price, thumbnail, category);
                                }}>
                                Add to Cart
                            </button>
                        )}
                        {quantity > 0 && (
                            <>
                                <button
                                    onClick={() => {
                                        increaseQuantity(id);
                                    }}>
                                    +
                                </button>
                                {quantity}
                                <button onClick={() => decreaseQuantity(id)}>-</button>
                            </>
                        )}
                    </>
                )}
                {type === "cartList" && (
                    <>
                        <button
                            onClick={() => {
                                increaseQuantity(id);
                            }}>
                            +
                        </button>
                        {quantity}
                        <button onClick={() => decreaseQuantity(id)}>-</button>
                    </>
                )}
            </div>
        </div>
    );
}
export default memo(ProductCard);
{
    /* <button onClick={handleRemoveCartItem}>Remove from cart</button> */
}

