const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const items = require("../fakeDb")

router.get("/", function (req, res) {
  res.json({ items })
})

router.post("/", function (req, res, next) {
  try {
    if (!req.body.name) throw new ExpressError("Name is required", 400);
    if (!req.body.price) throw new ExpressError("Price is required", 400);
    const newItem = { name: req.body.name, price: req.body.price }
    items.push(newItem)
    return res.status(201).json({ added: newItem })
  } catch (e) {
    return next(e);
  }
})

// GETS THE CAT BASED ON "name" of cat parameter we pass by in URL
router.get("/:name", function (req, res) {
    const foundItem = items.find(item => item.name === req.params.name);
    if (foundItem === undefined) {
      throw new ExpressError("Item not found", 404);
    }
    return res.json({ item: foundItem });
  
})

// UPDATE "name" of the cat we passed as a parameter in URL with the "request body name"
router.patch("/:name", function (req, res) {
    const foundItem = items.find(item => item.name === req.params.name);
    if (foundItem === undefined) {
      throw new ExpressError("Item not found", 404);
    }
    if(req.body.name) foundItem.name = req.body.name;
    if(req.body.price) foundItem.price = req.body.price;
    return res.json({ updated: foundItem });

})

// DELETING THE PARTICULAR cat based on the "name" parameter we passes in the URL
router.delete("/:name", function (req, res) {
    const foundItem = items.findIndex(item => item.name === req.params.name);
    if (foundItem === -1) {
      throw new ExpressError("Item not found", 404);
    }
    items.splice(foundItem, 1);
    return res.json({ message: "Deleted" });
  
})

module.exports = router;