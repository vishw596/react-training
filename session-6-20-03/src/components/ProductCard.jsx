const dollarFormat = new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"})

export default function ProductCard({ id,thumbnail, title, category, price, rating, stock,setProducts }) {
    return (
        <div style={{ display: "flex", alignItems:"center" }}>
            <img src={thumbnail ?? `/product.svg`} alt="" style={{ height: "200px" }} />
            <div>
                <p>title:{title}</p>
                <p>Category:{category}</p>
                <p>price:{dollarFormat.format(price)}</p>
                <p>rating:{rating}</p>
                <p>stock:{stock}</p>
                <button onClick={()=>{
                    setProducts((prev)=>{
                        return prev.filter((product)=>product.id !== id)
                    })
                }}>Delete</button>
            </div>
        </div>
    );
}
