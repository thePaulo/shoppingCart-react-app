async function getData() {
  try {
    const response1 = await fetch(
      "https://shielded-wildwood-82973.herokuapp.com/products.json"
    );

    const data1 = await response1.json();
    const [banana, apple, orange, mango] = Object.entries(data1)[0][1];
    const products = [banana, apple, orange, mango];
    console.log(products);

    const response2 = await fetch(
      "https://shielded-wildwood-82973.herokuapp.com/vouchers.json"
    );
    const data2 = await response2.json();
    const [a, b, c] = Object.entries(data2)[0][1];
    const vouchers = [a, b, c];

    console.log(vouchers);
  } catch {
    alert("API endpoint wasn't reached, try refreshing the webpage");
  }
}

const data = {
  products: [
    {
      id: "1",
      name: "Banana",
      price: 10.0,
      left: 10,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/220px-Banana-Single.jpg",
    },
    {
      id: "2",
      name: "Apple",
      price: 20.0,
      left: 15,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/250px-Red_Apple.jpg",
    },
    {
      id: "3",
      name: "Orange",
      price: 30.0,
      left: 8,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Oranges_-_whole-halved-segment.jpg/220px-Oranges_-_whole-halved-segment.jpg",
    },
    {
      id: "4",
      name: "Mango",
      price: 15.0,
      left: 20,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Mango_and_cross_section_edit.jpg/238px-Mango_and_cross_section_edit.jpg",
    },
  ],
};

getData(); //data should be sent through here...
export default data;
