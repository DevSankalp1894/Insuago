const { Router } = require("express");
const { CartModel } = require("../model/product.model");
const cartRoute = Router();

// cartRoute.use(authenticate)
cartRoute.get("/", async (req, res) => {
  const { user } = req.body;

  try {
    await CartModel.find({ user })
      .populate("productId")
      .then((r) => {
        return res.status(200).send(r);
      });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

cartRoute.post("/add_id", async (req, res) => {
  const productId = req.body;
  let { user } = req.body;

  try {
    let cartItem = new CartModel({ user });

    await CartModel.insertMany(req.body);
    return res.status(200).send(cartItem);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

cartRoute.patch("/update/:id",async (req, res) => {
  const _id = req.params.id;
  const payload = req.body;
  try {
    await CartModel.findOneAndUpdate({ _id }, payload);
    res.send({ msg: `Product with id:${_id} has been updated` });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

cartRoute.delete("/delete/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    await CartModel.findOneAndDelete({ _id });
    res.send({ msg: `Product with id:${_id} has been deleted` });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

module.exports = { cartRoute };