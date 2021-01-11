import React from "react";
import { useState, useEffect } from "react";

export default function Basket(props) {
  const [shippingPrice, setShipping] = useState(100);

  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const totalPrice = itemsPrice + shippingPrice;

  useEffect(() => {
    var count = 0;
    Object.keys(cartItems).map(function (key, index) {
      count = count + cartItems[key].qty;
      //console.log(cartItems[key].qty);
    });
    console.clear();
    console.log(count);

    if (itemsPrice > 400) {
      setShipping(0);
    } else if (count <= 10) {
      setShipping(30);
    } else {
      count = count - 10;
      count = count / 5;
      setShipping(10 + Math.floor(count) * 7);
    }
  });

  return (
    <aside className="block col-1">
      <div className="cart">
        <h2>
          <center>Shopping Cart</center>
        </h2>
      </div>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="col-2">{item.name}</div>
          <div className="col-2">
            <button onClick={() => onAdd(item)} className="add">
              +
            </button>
            <button onClick={() => onRemove(item)} className="remove">
              -
            </button>
          </div>
          <div className="col-2 text-right">
            {item.qty} x $ {item.price.toFixed(2)}
          </div>
        </div>
      ))}
      {cartItems.lenght !== 0 && (
        <>
          <div className="discount-code">
            <input placeholder="Discount code" className="col-2"></input>
            <button className="col-1">
              <strong>Apply</strong>
            </button>
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-2">Subtotal</div>
            <div className="col-1 text-right">{itemsPrice.toFixed(2)}</div>
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-2">Shipping</div>
            <div className="col-1 text-right">{shippingPrice.toFixed(2)}</div>
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-2">Discount</div>
            <div className="col-1 text-right">{shippingPrice.toFixed(2)}</div>
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-2">
              <strong>Total</strong>
            </div>
            <div className="col-1 text-right">
              <strong>{totalPrice.toFixed(2)}</strong>
            </div>
          </div>
          <hr />
          <div>
            <button
              className="button-checkout"
              onClick={() => alert("Successful checkout")}
            >
              <strong>CHECKOUT</strong>
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
