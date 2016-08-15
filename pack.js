const webpack = require('webpack');
module.exports = {
    enterPath: './app/index.js',
    tplPath: './app/index.tpl.html',
    plugins: [
    	new webpack.ProvidePlugin({
    	    $: "jquery",
    	    jQuery: "jquery",
    	    "window.jQuery": "jquery"
    	})
    ]
};