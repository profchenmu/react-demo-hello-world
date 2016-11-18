define([
    'lodash',
    'marionette',
    './modal/checkDenyView',
    './modal/checkCirfirmView',
    'application',
    'backbone.radio',
    // 'share/modal',
    './itemView.tpl'
], function(_, Marionette, DevideDenyModal, DevideCirfirmModal, App, Radio, itemViewTpl) {
    'use strict';

    return Marionette.ItemView.extend({

        tagName: 'tr',

        template: itemViewTpl,

        events: {
            // 'click #user-ban': '_destroy',
            // 'click #change-phone': '_changePhone',
            'click #devide-deny': '_devideDeny',
            'click #devide-pass': '_devideCirfirm'
        },

        initialize: function(){
            this.authBtn = (window.sessionStorage.getItem('btnAuth')).split(',');
        },

        onRender: function(){
            var self = this;
            this.$el.attr('data-id',self.model.id);
        },

        serializeData: function() {
            var data = this.model.toJSON();
            return data;
        },

        _devideDeny: function(e){
            var self = this;
            var denyModal = new DevideDenyModal({
                model: self.model
            });
        },

        _devideCirfirm: function(e){
            var self = this;
            var cirfirmModal = new DevideCirfirmModal({
                model: self.model
            });
        }

    });

});