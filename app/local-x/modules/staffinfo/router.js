define([
    'backbone',

    'application',

    './layout',
    './listView',
    './addStaff/layout',
    'backbone.radio'
], function(Backbone, App, LayoutView, ListView, AddStaffView, Radio) {
    'use strict';

    return {
        router: {
            'staffinfo': 'index',
            // 'manage/auth/:id': 'manageAuth',
            // 'manage/checker/:id': 'manageChecker',
            // 'manage/add_user': 'addUser',
            'staffinfo/add_staff': 'addStaff',
            'staffinfo/:id': 'editStaff',
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


            editStaff: function(id){

                if(App.logged){
                    
                    // var hash = window.location.hash.replace('#','').replace('/addUser','');
                    if(App.menuGroups.indexOf('staffinfo')<0){
                        App.Router.navigate('disabled', {
                            trigger: true
                        });
                    }else{
                        if(!App.tempModel){
                            App.Router.navigate('staffinfo/add_staff', {
                                trigger: true
                            });
                        }
                        var layout = new LayoutView();
                        if(App.rootView){
                            var layout =  new AddStaffView({
                                id: id,
                                tempModel: App.tempModel
                            });
                            App.rootView.getRegion('main').show(layout);
                        }
                    }

                    
                }else{
                    App.Router.navigate('login', {
                        trigger: true
                    });
                }
                // this._checkLogin();
                // if(App.rootView){
                //     var layout =  new AuthLayoutView({userId: id});
                //     App.rootView.getRegion('main').show(layout);
                // }
            },
            addStaff: function(){
                if(App.logged){
                    // var hash = window.location.hash.replace('#','').replace('/addUser','');
                    if(App.menuGroups.indexOf('staffinfo')<0){
                        App.Router.navigate('disabled', {
                            trigger: true
                        });
                    }else{
                        var layout = new LayoutView();
                        if(App.rootView){
                            var layout =  new AddStaffView();
                            App.rootView.getRegion('main').show(layout);
                        }
                    }

                    
                }else{
                    App.Router.navigate('login', {
                        trigger: true
                    });
                }
            
            },
            addUser: function(){
                if(App.logged){

                    // var hash = window.location.hash.replace('#','').replace('/addUser','');
                    if(App.menuGroups.indexOf('manage')<0){
                        App.Router.navigate('disabled', {
                            trigger: true
                        });
                    }else{
                        var layout = new LayoutView();
                        if(App.rootView){
                            var layout =  new AddUserView();
                            App.rootView.getRegion('main').show(layout);
                        }
                    }

                    
                }else{
                    App.Router.navigate('login', {
                        trigger: true
                    });
                }
                // this._checkLogin();
                // if(App.rootView){
                //     var layout =  new AddUserView();
                //     App.rootView.getRegion('main').show(layout);
                // }
            }
        }
    };

});