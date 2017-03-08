import React from "react";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import AppRoot from "./components/AppRoot";
import Home from "./components/Home";

import Login from "./components/Login";
import Search from "./components/Search";
import GivingHistory from "./components/GivingHistory";
import Basket from "./components/Basket";

import Donate from "./components/Donate";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import UpdateDonation from "./components/UpdateDonation";
import GiftMessage from "./components/GiftMessage";

export default (
    <Route path="/" component={AppRoot}>
        <IndexRoute component={Home}/>
        <Route path="login" component={Login}/>
        <Route path="search" component={Search}/>
        <Route path="givingHistory" component={GivingHistory}/>
        <Route path="basket" component={Basket}/>
        <Route path="donate/:ein" component={Donate}/>
        <Route path="checkout" component={Checkout}/>
        <Route path="confirmation/:orderId" component={Confirmation}/>
        <Route path="updateDonation/:donationId" component={UpdateDonation}/>
        <Route path="giftMessage/:donationId" component={GiftMessage}/>
    </Route>
);
