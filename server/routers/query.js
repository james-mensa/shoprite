const { model, set } = require("mongoose");
const { ProductModel, SalesModel } = require("../models/Database");
const { sortArticles } = require("../middleware/utils");
const express = require("express");
const { User } = require("../models/users");
const { AdminNotification } = require("../config/gateway");
const routes = express.Router();
/** creation */
routes.route("/addproduct").post(async (req, res) => {
  try {
   
    const data = new ProductModel({
      ...req.body,
    });
    const content = await data.save();
   
    res.status(200).json(content);
  } catch (error) {
    res.status(400).json({ msg: error });
  
  }
});


function isExpiringSoon(expiryDate) {
  // Create Date objects for the current date and the product's expiry date
  const currentDate = new Date();
  const expiry = new Date(expiryDate);

  // Calculate the difference in days between the two dates
  const daysDifference = Math.floor(
    (expiry - currentDate) / (24 * 60 * 60 * 1000)
  );

  // Get the current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Calculate the last day of the current month
  const lastDayOfMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  // Calculate the number of days remaining in the current month
  const daysRemainingInMonth = lastDayOfMonth - currentDate.getDate() + 1;

  // Calculate the number of days from the start of the next month
  const daysInNextMonth = daysDifference - daysRemainingInMonth;

  // Check if the product expires within the next month
  if (daysDifference <= 30 && daysInNextMonth >= 0) {
    return true;
  } else {
    return false;
  }
}




function Expiry(expiryDate) {
  // Create Date objects for the current date and the product's expiry date
  const currentDate = new Date();
  const expiry = new Date(expiryDate);

  // Calculate the difference in days between the two dates
  const daysDifference = Math.floor(
    (expiry - currentDate) / (24 * 60 * 60 * 1000)
  );

  // Get the current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Calculate the last day of the current month
  const lastDayOfMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  // Calculate the number of days remaining in the current month
  const daysRemainingInMonth = lastDayOfMonth - currentDate.getDate() + 1;

  // Calculate the number of days from the start of the next month
  const daysInNextMonth = daysDifference - daysRemainingInMonth;

  // Check if the product expires within the next month
  if (daysDifference <= 0 ) {
    return true;
  } else {
    return false;
  }
}
routes.route("/addsales/:user/:customer/:payment").post(async (req, res) => {
  try {
    const bills = req.body;
    const user = req.params.user;
    const purchasecode =
      Math.floor(Math.random() * (90000 - 10000 + 1)) + 10000;
    const customer = req.params.customer;
    const payment = req.params.payment;
   

    if (bills.length > 0) {
      bills.forEach(async (data) => {
        try {
          const productid = data.productid;
          const good = await ProductModel.findById({ _id: productid });
          if (good) {
            let quantityn = good.quantity;
            const newquantity = quantityn - data.quantity;

            if (newquantity >= 0) {
              const newsale = new SalesModel({
                product: productid,
                quantity:  data.quantity,
                price: data.price,
                customer: customer,
                payment: payment,
                issuer:user,
                purchasecode: purchasecode,
              });

              const saveds = await newsale.save();
              if (saveds) {
                await ProductModel.findByIdAndUpdate(
                  { _id: productid },
                  {
                    $set: {
                      quantity: newquantity,
                    },
                    $push: {
                      sales: saveds._id,
                    },
                  },
                  { new: true }
                );
              }
            }
          }

          res.status(200).json({ msg: "success" });
        } catch (error) {
          
        }
      });
    }
  } catch (error) {
    res.status(400).json({ msg: error });
    
  }
});

/** get queries  all */
routes.route("/getproducts").get(async (req, res) => {
  try {
    // Example usage:
    // Replace this with your date
    const data = await ProductModel.find({}).sort({ expiryday: 1 });
    if (data) {
      data.forEach(async (item) => {
        if (item.quantity > 0) {
          if (item.alert < 2) {
            const result = isExpiringSoon(item.expiryday);
            if (result) {
              const admins = await User.find({ accountType: "Adminstrator" });
              if (admins && admins.length > 0) {
                admins.forEach((user) => {
                  AdminNotification(
                    user.fullname,
                    user.email,
                    item.productname,
                    item._id,
                    item.quantity,
                    item.quantity * item.price
                  );
                });
              }

              const alertn = item.alert;
              let newAlert = alertn + 1;
              await ProductModel.findByIdAndUpdate(
                { _id: item._id },
                {
                  $set: {
                    alert: newAlert,
                  },
                },
                { new: true }
              );
            }
          }
        }
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/getexpiryproducts").get(async (req, res) => {
  try {
    let ExpiryP = [];

    const data = await ProductModel.find({}).sort({ expiryday: 1 });
    if (data) {
      data.forEach(async (item) => {
        try {
          if (item.quantity > 0) {
            const spoilproduct=Expiry(item.expiryday)
            if(spoilproduct){
              await ProductModel.findByIdAndUpdate(
                { _id: item._id },
                {
                  $set: {
                    expiry: true,
                  },
                },
                { new: true }
              );


            }

            else{
              const result = isExpiringSoon(item.expiryday);
              if (result) {
                ExpiryP.push(item);
              }
            }
             
            
          }
        } catch (error) {}
      });
    }

    res.status(200).json(ExpiryP);
 
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
routes.route("/getsales").get(async (req, res) => {
  try {
    const data = await SalesModel.find({})
      .populate("issuer")
      .populate("product");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
});

routes.route("/populateSales").get(async (req, res) => {
  try {
    const data = await SalesModel.find({}).populate("issuer");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/getuserSales/:user").get(async (req, res) => {
  try {
    const user = req.params.user;
    const data = await SalesModel.find({ issuer: user }).populate("issuer");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
routes.route("/getproduct/:id").get(async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await ProductModel.findOne({ _id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/populateproduct/:id").get(async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await ProductModel.findOne({ _id }).populate("sales");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

/**** modify */
routes.route("/modifyproduct/:id").patch(async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await ProductModel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

/** delete queries */

routes.route("/deleteproduct/:id").delete(async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await ProductModel.findByIdAndDelete({ _id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

module.exports = routes;
