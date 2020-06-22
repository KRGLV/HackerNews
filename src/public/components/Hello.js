import React from "react";

const Hello = (props) => (
    <React.Fragment>
        <h1>Welcome, {props.name ? props.name : "John Smith"}!</h1>
        <br />
        <a href="/reactrouter">React Router</a>
    </React.Fragment>
);

export default Hello;
