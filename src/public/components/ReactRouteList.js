import React from "react";
import { Link, Route } from "react-router-dom";

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/route1`}>Route Link 1</Link>
            </li>
            <li>
                <Link to={`${match.url}/route2`}>Route Link 2</Link>
            </li>
            <li>
                <Link to={`${match.url}/route3`}>Route Link 3</Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic} />
        <Route
            exact
            path={match.url}
            render={() => <h3>Please select a topic.</h3>}
        />
    </div>
);

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);

const ReactRouteList = () => (
    <div>
        <ul>
            <li>
                <Link to="/reactrouter">Home</Link>
            </li>
            <li>
                <Link to="/reactrouter/about">About</Link>
            </li>
            <li>
                <Link to="/reactrouter/topics">Topics</Link>
            </li>
            <li>
                <a href="/">return to server</a>
            </li>
        </ul>

        <hr />

        <Route exact path="/reactrouter" component={Home} />
        <Route path="/reactrouter/about" component={About} />
        <Route path="/reactrouter/topics" component={Topics} />
    </div>
);

export default ReactRouteList;
