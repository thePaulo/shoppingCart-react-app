import React from "react";
import { useState, useEffect } from "react";

export default function Basket(props) {
  const [shippingPrice, setShipping] = useState(30);

  const { cartItems, onAdd, onRemove } = props;

  const [itemsPrice, setItemsPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [formData, setFormData] = useState();

  useEffect(() => {
    var count = 0;
    Object.keys(cartItems).map(function (key, index) {
      count = count + cartItems[key].qty;
    });

    if (formData === "#30OFF") {
      setItemsPrice(cartItems.reduce((a, c) => a + c.price * c.qty, 0) * 0.7);
      setDiscount(cartItems.reduce((a, c) => a + c.price * c.qty, 0) * 0.3);
    } else {
      setItemsPrice(cartItems.reduce((a, c) => a + c.price * c.qty, 0));
      setDiscount(0);
    }

    if (formData === "#SHIPIT" && itemsPrice >= 300.5) {
      setDiscount(shippingPrice);
      console.log("check shippin" + shippingPrice);
      setShipping(0);
    } else {
      if (itemsPrice > 400) {
        setDiscount(shippingPrice);
        setShipping(0);
      } else if (count <= 10) {
        setShipping(30);
      } else {
        count = count - 10;
        count = count / 5;
        setShipping(10 + Math.floor(count) * 7);
      }
    }

    if (formData === "#100DOLLARS") {
      if (itemsPrice + shippingPrice - 100 <= 0) {
        setTotalPrice(0);
        setDiscount(itemsPrice + shippingPrice);
      } else {
        setTotalPrice(itemsPrice + shippingPrice - 100);
        setDiscount(100);
      }
    } else {
      setTotalPrice(itemsPrice + shippingPrice);
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
          <div>
            <form className="discount-code">
              <input
                onInput={(e) => setFormData(e.target.value)}
                name="inputData"
                placeholder="Discount code"
                className="col-2"
                value={formData}
                id="codeInput"
              ></input>
              <button className="col-1">
                <strong>Apply</strong>
              </button>
            </form>
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-2">Subtotal</div>
            <div className="col-1 text-right" id="subtotal">
              {itemsPrice.toFixed(2)}
            </div>
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-2">Shipping</div>
            <div className="col-1 text-right" id="shipping">
              {shippingPrice.toFixed(2)}
            </div>
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-2">Discount</div>
            <div className="col-1 text-right" id="discount">
              {discount.toFixed(2)}
            </div>
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-2">
              <strong>Total</strong>
            </div>
            <div className="col-1 text-right">
              <strong id="totalPrice">{totalPrice.toFixed(2)}</strong>
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
