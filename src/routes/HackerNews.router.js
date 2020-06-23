import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter as Router } from "react-router-dom";
import HackerNewsList from "./../public/components/HackerNewsList";
import ReactRouteList from "../public/components/ReactRouteList";
import HackerNewsService from "./../service/HackerNews.service";

var hnrouter = express.Router();

/* GET Hacker News List. */
hnrouter.get("/", async (req, res, next) => {
    let { page = 0 } = req.query;

    try {
        let data = [];

        page = parseInt(page);

        if (page > -1) {
            data = await HackerNewsService.find(page);
        }
        //console.log(data);
        const componentStream = ReactDOMServer.renderToNodeStream(
            <HackerNewsList page={page} data={data} />
        );

        const htmlStart = `
    <!doctype html>
      <html>
      <head>
        <script>window.__INITIAL__DATA__ = ${JSON.stringify({
            page,
        })}; window.onload = (event) => {
          document.getElementsByTagName("path")[0].style.fill="#fff";
          document.getElementsByClassName("rv-xy-plot__axis__line")[0].style.stroke = "#a09898";
          document.getElementsByClassName("rv-xy-plot__axis__line")[0].style.strokeWidth = 1;
          document.getElementsByClassName("rv-xy-plot__axis__line")[1].style.stroke = "#a09898";
          document.getElementsByClassName("rv-xy-plot__axis__line")[1].style.strokeWidth = 1;
          
        };</script>
      </head>
      <body>
      <div id="root">`;

        res.write(htmlStart);

        componentStream.pipe(res, { end: false });

        const htmlEnd = `</div>
      <script src="/static/home.js"></script>
    </body>
    </html>`;

        componentStream.on("end", () => {
            res.write(htmlEnd);

            res.end();
        });
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error.");
    }
});

hnrouter.get("/reactrouter*", (req, res) => {
    const context = {};

    const component = ReactDOMServer.renderToString(
        <Router location={req.url} context={context}>
            <ReactRouteList />
        </Router>
    );

    const html = `
    <!doctype html>
      <html>
      <head>
        <title>document</title>
      </head>
      <body>
        <div id="root">${component}</div>
        <script src="/static/reactRoutes.js"></script>
      </body>
      </html>
    `;

    if (context.url) {
        res.writeHead(301, { Location: context.url });
        res.end();
    } else {
        res.send(html);
    }
});

export default hnrouter;
