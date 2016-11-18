define([
    'backbone',

    'application',

    './layout',
    './listView',
    'backbone.radio'
], function(Backbone, App, LayoutView, ListView, Radio) {
    'use strict';

    return {
        router: {
            'check_devide': 'index',
            // 'manage/auth/:id': 'manageAuth',
            // 'manage/addUser': 'addUser'
        },

        controller: {
            index: function() {
                if(App.logged){
                    var hash = window.location.hash.replace('#','');
                    if(App.menuGroups.indexOf(hash)<0){
                        App.Router.navigate('disabled', {
                            trigger: true
                        });
                    }else{
                        var layout = new LayoutView();
                        if(App.rootView){
                            App.rootView.getRegion('main').show(layout);
                        }
                    }

                    
                }else{
                    App.Router.navigate('login', {
                        trigger: true
                    });
                }


            },

        }
    };

});