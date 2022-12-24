import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import adminShop from "./screens/AdminShopScreen";
import NotFound from "./screens/NotFound";
import { Redirect } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import manageOrders from "./components/ShopComponents/manageOrders";
import manageProducts from "./components/ShopComponents/manageProducts";
import ProfileTabs from "./components/profileComponents/ProfileTabs";
import UpdatePassword from "./components/profileComponents/UpdatePassword";
import ShopScreen from "./screens/ShopScreen";

const App = () => {
  
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/search/:keyword" component={HomeScreen} exact />
        <Route path="/page/:pagenumber" component={HomeScreen}  />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile/:idUser" component={ProfileScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/admin/my-shop/" component={adminShop} />
        <Route path="/shop/:idShop" component={ShopScreen} />

        <Route path="*" component={NotFound} />

      </Switch>
    </Router>
  );
};

export default App;
