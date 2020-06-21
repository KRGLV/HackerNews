// copy static file --> icon, jpg, png, json etc
try {
    //const fs = require("fs-extra");

    //fs.copySync("src/public/favicon.ico", "dist/public/favicon.ico");

    console.log(
        "------------------ static assets copy: OK ----------------------"
    );
} catch (err) {
    console.error(
        "------------------ static assets copy: ERROR ----------------------",
        err.message
    );
}
