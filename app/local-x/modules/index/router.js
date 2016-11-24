define([
    'backbone',

    'application',

    './layout',
    
], function(Backbone, App, LayoutView) {
    'use strict';

    return {
        router: {
            'index': 'index'
        },

        controller: {
            index: function() {

                if(App.logged){
                    var layout = new LayoutView();
                    if(App.rootView){
                        App.rootView.getRegion('main').show(layout);
                        // layout.getRegion('list').show(new ListView());
                    }

                    
                }else{
                    App.Router.navigate('login', {
                        trigger: true
                    });
                }
            }
        }
    };

});