const webpack = require('webpack');
module.exports = {
    enterPath: './app/index.js',
    tplPath: './app/index.tpl.html',
    plugins: [
    	{
    	    $: "jquery",
    	    jQuery: "jquery",
    	    "window.jQuery": "jquery"
    	}
    ]
};