import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ReactRouteList from "./components/ReactRouteList";

const ReactRouteExample = () => (
    <Router>
        <ReactRouteList />
    </Router>
);

ReactDOM.hydrate(<ReactRouteExample />, document.getElementById("root"));
