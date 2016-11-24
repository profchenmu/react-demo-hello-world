define([
    'backbone',
    './org',
    'application'
], function(Backbone, OrgModel, App) {
    'use strict';

    return Backbone.Collection.extend({

        url: window.getApi('/getService.do'),

        model: OrgModel,

        parse: function(res) {
            if(res.code ==='00'){
                return res.agencys;
            }else if(res.code === '101'){
                App.Router.navigate('login', {
                    trigger: true
                });
                window.sessionStorage.clear();
                return false;
            }else{
                return [];
            }
            
        }
    });
});