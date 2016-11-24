define([
    'lodash',
    'marionette',
    './modal/orgTreeModalView',
    './addStaff/layout',
    'application',
    'backbone.radio',
    // 'share/modal',
    './itemView.tpl'
], function(_, Marionette, ChangeModal, AddStaffView, App, Radio, itemViewTpl) {
    'use strict';

    return Marionette.ItemView.extend({

        tagName: 'tr',

        template: itemViewTpl,

        events: {
            'click .edit-staff': '_editStaff'
        },

        initialize: function(){
            this.authBtn = (window.sessionStorage.getItem('btnAuth')).split(',');

        },

        onRender: function(){
            var self = this;
            this.$el.attr('data-id',self.model.id);
            // $('#user-ban').modal(new Modal());
        },

        _editStaff: function(e){
            var newUrl = 'staffinfo/' + this.model.id,
                self = this;

            App.tempModel = this.model;

            App.Router.navigate(newUrl, {
                trigger: true
            });


            // if(App.logged){
                
            //     // var hash = window.location.hash.replace('#','').replace('/addUser','');
            //     if(App.menuGroups.indexOf('staffinfo')<0){
            //         App.Router.navigate('disabled', {
            //             trigger: true
            //         });
            //     }else{
            //         // var layout = new LayoutView();
            //         if(App.rootView){
            //             var layout =  new AddStaffView({
            //                 id: self.model.id,
            //                 model: self.model
            //             });
            //             App.rootView.getRegion('main').show(layout);
            //         }
            //     }

                
            // }else{
            //     App.Router.navigate('login', {
            //         trigger: true
            //     });
            // }
        },

        serializeData: function() {
            var data = this.model.toJSON();
            
            return data;
        }

    });

});