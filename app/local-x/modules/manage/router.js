define([
    'backbone',

    'application',

    './layout',
    './listView',
    './manageAuth/layout',
    './manageAuth/itemView',
    './addUser/layout',
    './addChecker/layout',
    'backbone.radio'
], function(Backbone, App, LayoutView, ListView, AuthLayoutView, AuthItemView, AddUserView, AddCheckerView, Radio) {
    'use strict';

    return {
        router: {
            'manage': 'index',
            'manage/auth/:id': 'manageAuth',
            'manage/checker/:id': 'manageChecker',
            'manage/add_user': 'addUser',
            'manage/add_checker': 'addChecker',
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

            manageChecker: function(id){
                if(App.logged){

                    // var hash = window.location.hash.replace('#','').replace('/addUser','');
                    if(App.menuGroups.indexOf('manage')<0){
                        App.Router.navigate('disabled', {
                            trigger: true
                        });
                    }else{
                        var layout = new LayoutView();
                        if(App.rootView){
                            var layout =  new AddCheckerView({id: id});
                            App.rootView.getRegion('main').show(layout);
                        }
                    }
                }else{
                    App.Router.navigate('login', {
                        trigger: true
                    });
                }
            },

            manageAuth: function(id){
                if(App.logged){
                    // var hash = window.location.hash.replace('#','').replace('/addUser','');
                    if(App.menuGroups.indexOf('manage')<0){
                        App.Router.navigate('disabled', {
                            trigger: true
                        });
                    }else{
                        var layout = new LayoutView();
                        if(App.rootView){
                            var layout =  new AuthLayoutView({userId: id});
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
            addChecker: function(){
                if(App.logged){

                    // var hash = window.location.hash.replace('#','').replace('/addUser','');
                    if(App.menuGroups.indexOf('manage')<0){
                        App.Router.navigate('disabled', {
                            trigger: true
                        });
                    }else{
                        var layout = new LayoutView();
                        if(App.rootView){
                            var layout =  new AddCheckerView();
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