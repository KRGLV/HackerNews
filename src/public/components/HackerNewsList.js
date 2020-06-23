import React, { useState, useRef } from "react";
///import styles from "./HackerNewsList.css";

const getstyles = () => {
    let styles = {
        rTable: {
            display: "table",
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #999999",
        },
        rTableRow: {
            display: "table-row",
        },
        rTableHeading: {
            display: "table-header-group",
            backgroundColor: "#fa7809",
        },
        //rTableCell,
        rTableHead: {
            display: "table-cell",
            padding: "3px 10px",
            color: "#ffffff",
            //border: "1px solid #999999",
        },
        rTableCell: {
            display: "table-cell",
            padding: "3px 10px",
            color: "black",
            //border: "1px solid #999999",
        },
        rTableHeading: {
            display: "table-header-group",
            backgroundColor: "#fa7809",
            fontWeight: "bold",
        },
        rTableFoot: {
            display: "table-footer-group",
            fontWeight: "bold",
            backgroundColor: "#ddd",
        },
        rTableBody: {
            display: "table-row-group",
        },
    };

    return styles;
};

const hideRow = (refele, objectID) => {
    console.log("............");
    console.log(refele[`row_${objectID}`]);
    //refele[`row_${objectID}`].style.display = "hide";
    // [`row_${objectID}`]
    // window.document.getElementById(`Table_Row_${objectID}`).style.display =
    //     "none";
};

const getDuration = (d) => {
    let date = new Date(d);
    let currentDate = new Date();
    let duration = currentDate.getTime() - date.getTime();

    var seconds = (duration / 1000).toFixed(1);
    var minutes = (duration / (1000 * 60)).toFixed(1);
    var hours = (duration / (1000 * 60 * 60)).toFixed(1);
    var days = (duration / (1000 * 60 * 60 * 24)).toFixed(1);

    if (seconds < 60) {
        return seconds + " seconds";
    } else if (minutes < 60) {
        return minutes + " minutes";
    } else if (hours < 24) {
        return hours + " hours";
    } else {
        return days + " days";
    }
};

const renderTableData = (data, refele) => {
    //console.log(data);
    if (data && Array.isArray(data)) {
        let styles = getstyles();
        return data.map((item, index) => {
            const {
                objectID,
                title,
                story_text,
                url,
                author,
                points,
                num_comments,
                created_at_i,
                relevancy_score,
                vote,
            } = item;

            return (
                <tr
                    id={`Table_Row_${objectID}`}
                    key={objectID}
                    style={styles.rTableRow}
                    style={{
                        backgroundColor: index % 2 == 1 ? "#ced0d3" : "#e8e9ea",
                    }}
                    // ref={(input) => {
                    //     refele[`row_${objectID}`] = input;
                    // }}
                >
                    <td style={styles.rTableCell}>
                        {num_comments ? num_comments : 0}
                    </td>
                    <td style={styles.rTableCell}>
                        <span
                            style={{
                                color:
                                    vote > 100
                                        ? "#FF4500"
                                        : vote > 50
                                        ? "#DC143C"
                                        : "black",
                            }}
                        >
                            {vote}
                        </span>
                    </td>
                    <td style={styles.rTableCell}>upvote button</td>
                    <td style={styles.rTableCell}>
                        {title ? title : story_text}{" "}
                        <small style={{ color: "#9e9898" }}>
                            <a
                                style={{ color: "#9e9898" }}
                                href={url ? `${url}` : "NA"}
                            >
                                {url ? `(${url})` : "(NA)"}
                            </a>{" "}
                            by{" "}
                            <span style={{ color: "black" }}>
                                {author ? author : "NA"}
                            </span>{" "}
                            {getDuration(created_at_i)} ago [{" "}
                            <a
                                style={{ color: "#9e9898" }}
                                onClick={() => hideRow(refele, objectID)}
                                href="javascript:void(0)"
                            >
                                hide
                            </a>{" "}
                            ]
                        </small>
                    </td>
                </tr>
            );
        });
    } else {
        return (
            <tr key={"NoData"} style={styles.rTableRow}>
                <td colSpan="4" style={styles.rTableCell}>
                    Data Not Available...
                </td>
            </tr>
        );
    }
};

const HackerNewsList = (props) => {
    const [data, setData] = useState(props.data);
    const [refele, setRefele] = useState({});
    let styles = getstyles();
    return (
        <React.Fragment>
            {/* className={styles.wrapper} */}
            <h1>Page Number, {props.page}</h1>

            <table
                id="students"
                // border="1"
                cellPadding="5"
                style={styles.rTable}
            >
                <thead style={styles.rTableHeading}>
                    <tr style={styles.rTableRow}>
                        <th style={styles.rTableHead}>Comments</th>
                        <th style={styles.rTableHead}>Vote Count</th>
                        <th style={styles.rTableHead}>Up Vote</th>
                        <th style={styles.rTableHead}>News Details</th>
                    </tr>
                </thead>
                <tbody style={styles.rTableBody}>
                    {renderTableData(data.hits, refele)}
                </tbody>
            </table>
            <div style={{ width: 100, minHeight: 30 }}>
                <div
                    style={{
                        position: "absolute",
                        right: 25,
                        color: "#fa7809",
                        fontWeight: "bold",
                        marginTop: 5,
                    }}
                >
                    {parseInt(props.page) > 0 && (
                        <span>
                            <a
                                href={
                                    parseInt(props.page) > 1
                                        ? `/?page=${props.page - 1}`
                                        : "/"
                                }
                                style={{ color: "#fa7809", padding: 5 }}
                            >
                                Previous
                            </a>
                            <span
                                style={{
                                    color: "#fa7809",
                                    fontWeight: "bold",
                                    fontSize: 20,
                                }}
                            >
                                |
                            </span>
                        </span>
                    )}

                    <a
                        href={`/?page=${parseInt(props.page) + 1}`}
                        style={{ color: "#fa7809", padding: 5 }}
                    >
                        Next
                    </a>
                </div>
            </div>
            <hr />
            <a href="/reactrouter">React Router</a>
        </React.Fragment>
    );
};

export default HackerNewsList;
