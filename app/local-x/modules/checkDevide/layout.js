define([
    'lodash',
    'marionette',
    'application',
    './layout.tpl',
    './listView',
    'backbone.radio'
    // './newsCollection'
], function(_, Marionette, App, layoutTpl, UserlistView,Radio) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'users-wrapper',

        template: layoutTpl,

        regions: {
            'list': '#user-list'
        },

        events: {
        	
        },

        ui: {
            
        },
        
        initialize: function(){
            Radio.channel('heada').trigger('aaa', ['check_devide','划拨审核列表']);
        },
        onRender: function(){
            this.getRegion('list').show(new UserlistView());
        },
    });

});