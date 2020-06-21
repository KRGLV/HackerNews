import React from "react";
import ReactDOM from "react-dom";
import Hello from "./components/Hello";

ReactDOM.hydrate(
    <Hello page={window.__INITIAL__DATA__} />,
    document.getElementById("root")
);
