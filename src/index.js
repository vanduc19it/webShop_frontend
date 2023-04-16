import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./Redux/store"
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId="1012721911527-s4aq6fksjqcveouh2gs6p48n453eg310.apps.googleusercontent.com"> 
        <App />
        </GoogleOAuthProvider>

       
    </Provider>
    ,document.getElementById("root")
);
