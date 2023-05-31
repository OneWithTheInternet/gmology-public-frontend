//This Common JS style server would redirects all requests to 
//index.html without server side rendering


const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "../build")));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// serve static assets
app.listen(8080, () =>
  console.log("Express server is running on localhost:8080")
);