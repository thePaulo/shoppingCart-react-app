import App from "./App";
import data from "./data";

import * as ReactDOM from "react-dom";
import puppeteer from "puppeteer";

test("products check", () => {
  const [a, b, c, d] = data.products;
  expect(a.name).toBe("Banana");
});

test("page render", () => {
  const root = document.createElement("div");
  ReactDOM.render(<App />, root);

  expect(root.querySelector("h1").textContent).toBe("Shopping");
  expect(root.querySelector("h3").textContent).toBe("Banana");
  expect(root.querySelector("button").textContent).toBe("BUY");
  expect(root.querySelector("div#shipping").textContent).toBe("30.00"); //default shipping value to lower than 10kg products
});

//might time it out due to API endpoint fetch error
test("Validating 30% code input", async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "load", timeout: 0 });

  await page.click("input#codeInput");
  await page.type("input#codeInput", "#30OFF");

  for (var i = 0; i < 15; i++) {
    await page.click("button");
  }
  const res = await page.$eval(
    "div#subtotal",
    (subtotal) => subtotal.textContent
  );
  const res2 = await page.$eval(
    "div#shipping",
    (subtotal) => subtotal.textContent
  );
  const res3 = await page.$eval(
    "div#discount",
    (subtotal) => subtotal.textContent
  );
  const res4 = await page.$eval(
    "strong#totalPrice",
    (subtotal) => subtotal.textContent
  );

  expect(res).toBe("105.00"); // buying 15 bananas and then applying a 30% discount, sometimes times it out
  expect(res2).toBe("17.00");
  expect(res3).toBe("45.00");
  expect(res4).toBe("122.00");
}, 20000);
