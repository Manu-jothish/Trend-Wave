import Products from "../models/ProductModel.js";
import asyncHadler from "../middleware/asyncHandler.js";

const addProduct = asyncHadler(async (req, res) => {
  const { name, brand, category, description, price, countInStock } = req.body;

  const image = req.body ? req.file.path : null;

  const product = await Products.create({
    name,
    brand,
    category,
    description,
    price,
    countInStock,
    image,
  });

  if (product) {
    res.status(201).json(product);
  }
});

const getProduct = asyncHadler(async (req, res) => {
  const pagesize = 4;
  const page = Number(req.query.pageNumber) || 1;
  const keyWordCondition = req.query.keyword
    ? { name: { $regex: req.query.keyword, $option: "1" } }
    : {};
  const count = await Products.countDocuments({ ...keyWordCondition });
  const products = await Products.find({ ...keyWordCondition })
    .limit(pagesize)
    .skip(pagesize * (page - 1));
  res.json({
    products,
    page,
    pages: Math.ceil(count / pagesize),
  });
});

const getProductById = asyncHadler(async (req, res) => {
  let product = await Products.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("product Not Found");
  }
});

const deleteProduct = asyncHadler(async (req, res) => {
  let product = await Products.findById(req.params.id);
  if (product) {
    await Products.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("product Not Found");
  }
});


const creatReview=asyncHadler(async(req,res)=>{
  const {rating,comments}=req.body
  const product = await Products.findById(req.params.id)

 
})

export { addProduct, getProduct, getProductById,deleteProduct };
