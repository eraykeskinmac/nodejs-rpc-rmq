const express = require("express");
const { RPCObserver, RPCRequest } = require("./rpc");

const PORT = 8000;

const app = express();

app.use(express.json());

const fakeProductResponse = {
  _id: "yt8593asdaw789945",
  title: "iPhone",
  price: 600,
};

RPCObserver("PRODUCT_RPC", fakeProductResponse);

app.get("/customer", async (req, res) => {
  const requestPayload = {
    customerId: "yt8593asdaw789945",
  };
  try {
    const responseData = await RPCRequest("CUSTOMER_RPC", requestPayload);
    console.log(responseData);
    return res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.get("/", (req, res) => {
  return res.json("Product Service");
});

app.listen(PORT, () => {
  console.log(`Product Service is running on port ${PORT}`);
  console.clear();
});
