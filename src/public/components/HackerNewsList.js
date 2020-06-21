import React from "react";

const HackerNewsList = (props) => (
    <React.Fragment>
        <h1>Page Number, {props.page}</h1>
        {JSON.stringify(props.data)}
        <br />
        <a href="/reactrouter">React Router</a>
    </React.Fragment>
);

export default HackerNewsList;
