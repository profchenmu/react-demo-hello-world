define([
    'lodash',
    'marionette',
    './itemView.tpl'
], function(_, Marionette, itemViewTpl3) {
    'use strict';

    return Marionette.ItemView.extend({

        tagName: 'tr',

        template: itemViewTpl3,

        onRender: function(){
            // $('#user-ban').modal(new Modal());
        },

        serializeData: function() {
            var data = this.model.toJSON();
            return data;
        },

    });

});