import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./Redux/store"
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId="591909428129-7sqneikm8mv6m21p9kcasetg3vdhtt71.apps.googleusercontent.com"> 
        <App />
        </GoogleOAuthProvider>

       
    </Provider>
    ,document.getElementById("root")
);
