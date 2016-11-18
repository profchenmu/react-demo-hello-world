define([
    'lodash',
    'marionette',
    'backbone.radio',
    './layout.tpl',
    './listView',
    // './newsCollection'
], function(_, Marionette, Radio, layoutTpl, UserlistView) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'users-wrapper',

        template: layoutTpl,

        regions: {
            'list': '#user-list'
        },

        initialize: function(){
            Radio.channel('heada').trigger('aaa', ['check_distribute','审核发放记录']);
        },

        onRender: function(){
            this.getRegion('list').show(new UserlistView());
        }
    });

});