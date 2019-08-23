// postcss.config.js
const path = require("path");

module.exports = {
    plugins: [
        require("@fullhuman/postcss-purgecss")({
            content: [
                "./src/*.vue",
                "./src/components/**/*.vue",
                "./src/views/*.vue"
            ],
            whitelist: ["html", "body"]
        }),
        require("cssnano")(),
        require("postcss-preset-env")()
    ]
};