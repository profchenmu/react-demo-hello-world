define([
    'marionette',
    'share/modal',
    './resultModalView.tpl',
    'core/navModel',
    'vendor/bootstrap-treeview',
    'application'
], function(Marionette, Modal, resultModalTemplate, NavModel,Treeview,App) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'modal fade',
        
        events: {
            'hidden.bs.modal': '_destroyModal',
            'click #confirm-button': '_submit',
        },

        initialize: function() {
            this.promise = $.Deferred();
            this.render();
            this.model = new NavModel();

        },

        template: resultModalTemplate,

        serializeData: function() {
        	var data = {
                message: this.model
            };
            return data;
        },

        onRender: function(){    
            this.$el.modal({
                show: true
            });
        },

        _destroyModal: function() {
            this.$el.remove();
        },
        
        _submit:function(){
        	 this.$el.modal('hide');
        	App.Router.navigate('devinfos', {
                trigger: true
            });
        }
    });
});