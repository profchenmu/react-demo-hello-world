define([
    'lodash',
    'marionette',
    // 'share/modal',
    './itemView.tpl'
], function(_, Marionette, itemViewTpl) {
    'use strict';

    return Marionette.ItemView.extend({

        tagName: 'tr',

        template: itemViewTpl,

        onRender: function(){
            // $('#user-ban').modal(new Modal());
        },

        serializeData: function() {
            var data = this.model.toJSON();
            return data;
        },

    });

});