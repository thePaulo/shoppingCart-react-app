import React from "react";

export default function Header(props) {
  return (
    <header className="row block center">
      <div>
        <a href="#/">
          <h1>Shopping</h1>
        </a>
      </div>
      <div>
        <img
          class="prof_img"
          src="https://www.w3schools.com/howto/img_avatar.png"
        ></img>
        <a href="#">John Doe</a>
      </div>
    </header>
  );
}
