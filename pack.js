var path = require('path');
module.exports = {
	enterPath: './app/index.js',
    // enterPath: './app/component/core/nav.js',
    tplPath: './app/index.tpl.html',
    // plugins: [
    // 	{
    // 	    $: "jquery",
    // 	    jQuery: "jquery",
    // 	    "window.jQuery": "jquery"
    // 	}
    // ],
    alias: {
        component: path.resolve('app/component'),
        core: path.resolve('app/component/core'),
        modules: path.resolve('app/component/modules'),
        actions: path.resolve('app/redux/actions'),
        reducers: path.resolve('app/redux/reducers'),
        store: path.resolve('app/redux/store'),
        userservice: path.resolve('app/services/userService')
    },
    // target: 'http://172.20.20.177:8080'
};