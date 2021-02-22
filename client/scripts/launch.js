const bs = require('browser-sync').create();
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 3030;

bs.watch('build/**/*.js', function (event, file) {
    //console.log("js changed", file);
    bs.reload("*.js");
})

bs.watch('build/**/*.css', function (event, file) {
    //console.log("css changed", file);
    if (event === "change") {
        bs.reload("*.css");
    }
})

const defaultFile = "index.html"
const folder = path.resolve(__dirname, "../")

bs.init({
    port: PORT,
    server: "./build", 
    serveStatic: [['./build/static/']],
    //cors: true,
    browser: "google chrome",  // [ "google chrome", "firefox"]
    open: "local", // false
    reloadOnRestart: true,
    ui: false,
    notify: false,
    middleware: function(req, res, next) {
        // this redirects all non-asset urls to the root index.html file, for development purposes
        if (req.url.match(/^(.*)(.css|.js|.ttf|.png|.jpg)/)) {
            return next();
        }
        
        var fileName = url.parse(req.url);
        fileName = fileName.href.split(fileName.search).join("");
        var fileExists = fs.existsSync(folder + fileName);
        if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
            req.url = "/" + defaultFile;
        }
        return next();
    }
    //scrollProportionally: false
})
