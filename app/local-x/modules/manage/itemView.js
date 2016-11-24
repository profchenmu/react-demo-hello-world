define([
    'lodash',
    'marionette',
    './modal/destroyModalView',
    './modal/changePhoneModalView',
    './modal/changePassView',
    './manageAuth/itemView',
    'application',
    'backbone.radio',
    // 'share/modal',
    './itemView.tpl'
], function(_, Marionette, DestroyModal, ChangeModal, ChangePassModal, AuthItemView, App, Radio, itemViewTpl) {
    'use strict';

    return Marionette.ItemView.extend({

        tagName: 'tr',

        template: itemViewTpl,

        events: {
            'click #user-ban': '_destroy',
            'click #change-phone': '_changePhone',
            'click #change-auth': '_changeAuth',
            'click #change-password': '_changePass',
            'click #change-checker': '_changeChecker'
        },

        initialize: function(){
            this.authBtn = (window.sessionStorage.getItem('btnAuth')).split(',');
        },

        onRender: function(){
            var self = this;
            this.$el.attr('data-id',self.model.id);
            // $('#user-ban').modal(new Modal());
        },

        serializeData: function() {
            var data = this.model.toJSON();
            data.destroyBtn = this.authBtn.indexOf('4000330000001028')<0 ? false : true;
            data.changePhoneBtn = this.authBtn.indexOf('4000330000001012')<0 ? false : true;
            data.changeAuthBtn = this.authBtn.indexOf('4000330000001030')<0 ? false : true;
            var temp = data.adminFlag;
            switch(temp){
                case '1': data.typeText = '管理员';
                break;
                case '2': data.typeText = '操作员';
                break;
                case '3': data.typeText = '审核员';
                break;
                default: data.typeText = '';
            }
            return data;
        },

        _destroy: function(e){
            var self = this;
            var destroyModal = new DestroyModal({
                model: self.model
            });
            // $(e.currentTarget).modal();
        },

        _changePhone: function(e){
            var self = this;
            var destroyModal = new ChangeModal({
                model: self.model
            });
        },

        _changePass: function(e){
            var self = this;
            var destroyModal = new ChangePassModal({
                model: self.model
            });
        },

        _changeAuth: function(e){
            var newUrl = 'manage/auth/' + this.model.id;
            App.Router.navigate(newUrl, {
                trigger: true
            });
        },

        _changeChecker: function(e){
            var newUrl = 'manage/checker/' + this.model.id;
            App.Router.navigate(newUrl, {
                trigger: true
            });
        }

    });

});