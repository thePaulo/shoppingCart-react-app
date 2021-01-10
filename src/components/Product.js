import React from "react";

export default function Product(props) {
  const { product, onAdd } = props;
  return (
    <div class="cart">
      <img className="small" src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <div className="row">
        <div class="col-1">${product.price}</div>
        <div class="col-2"> • {product.left} left</div>
      </div>

      <div>
        <button onClick={() => onAdd(product)}>
          <strong>BUY</strong>
        </button>
      </div>
    </div>
  );
}
