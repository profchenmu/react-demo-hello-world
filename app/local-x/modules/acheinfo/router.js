define([
    'backbone',

    'application',

    './layout',
    './listView',
    './addAche/layout',
    'backbone.radio'
], function(Backbone, App, LayoutView, ListView, AddAcheView, Radio) {
    'use strict';

    return {
        router: {
            'acheinfo': 'index',
            // 'manage/auth/:id': 'manageAuth',
            // 'manage/checker/:id': 'manageChecker',
            // 'manage/add_user': 'addUser',
            'acheinfo/add_ache': 'addAche',
            'acheinfo/:id': 'editAche',
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


            editAche: function(id){

                if(App.logged){
                    
                    // var hash = window.location.hash.replace('#','').replace('/addUser','');
                    if(App.menuGroups.indexOf('acheinfo')<0){
                        App.Router.navigate('disabled', {
                            trigger: true
                        });
                    }else{
                        if(!App.tempModel){
                            App.Router.navigate('acheinfo/add_ache', {
                                trigger: true
                            });
                        }
                        var layout = new LayoutView();
                        if(App.rootView){
                            var layout =  new AddAcheView({
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
            addAche: function(){
                if(App.logged){
                    // var hash = window.location.hash.replace('#','').replace('/addUser','');
                    if(App.menuGroups.indexOf('acheinfo')<0){
                        App.Router.navigate('disabled', {
                            trigger: true
                        });
                    }else{
                        var layout = new LayoutView();
                        if(App.rootView){
                            var layout =  new AddAcheView();
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