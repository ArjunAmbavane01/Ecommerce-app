Process FLow

1. publicPage 
- userDetails small popup 

2. card page 
getLaptopsByFilters

3. addToCartProduct - frontend will give me _id of laptop


const user_id = req.id; -> object id of user 
const laptop_id = req.params.id -> object id of laptop

getCartProducts - user model -> carts array -> item_id of differnet laptops and pc 
full laptop details 

4. orders 

post route for order table

addCartOrders
const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Laptop' }, 
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
  status: { type: String, default: 'Pending' } 
});

frontedn will give me req.body and  i will save that in orders model 

user_id: req.id
  items: [{
    item_id: body
    price: body
  }],
  totalAmount: body
  orderDate: new Date
  deliveryDate: orderDate + 5 ;
  status:  default: 'Pending' 

getOrdersByUserId 
