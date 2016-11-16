module.exports = {
	enterPath: './app/index.js',
    // enterPath: './app/component/core/nav.js',
    tplPath: './app/index.tpl.html',
    plugins: [
    	{
    	    $: "jquery",
    	    jQuery: "jquery",
    	    "window.jQuery": "jquery"
    	}
    ]
};