const bcryt = require("bcrypt");

const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    productname: {
      type: String,
    },
    manufacturingdate: {
      type: String,
    },

    barcode: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    expiryday: {
      type: String,
    },
    alert:{
      type:Number,
      default : 0

    }
,
    expiry: {
      type: Boolean,
      default: false,
    },
    sales: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sales",
      },
    ],
  },
  { timestamps: true }
);

const saleSchema = mongoose.Schema(
  {
    issuer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    quantity: {
      type: Number,
    },
    price: {
      type: String,
    },
    customer: {
      type: String,
    },
    payment: {
      type: String,
    },
    purchasecode:{
      type: String,
    }
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("product", ProductSchema);
const SalesModel = mongoose.model("sales", saleSchema);

module.exports = {
  ProductModel,
  SalesModel,
};
