import React from "react";
import ReactDOM  from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<GoogleOAuthProvider clientId="950774078024-j7aetgcfamv6bb6tl9rmgi060g56jr0l.apps.googleusercontent.com">
<React.StrictMode>
    <BrowserRouter>
     <App />
    </BrowserRouter>
   
  
  </React.StrictMode>
</GoogleOAuthProvider>
 
);
