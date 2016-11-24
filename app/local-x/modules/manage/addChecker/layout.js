define([
    'lodash',
    'marionette',
    'application',
    'core/navModel',
    './layout.tpl',
    './item',
    'backbone.radio'
], function(_, Marionette, App, NavModel, layoutTpl, AddCheckerView, Radio) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'add-user-item',

        template: layoutTpl,

        regions: {
            'manage': '.manage'
        },

        initialize: function(){
            Radio.channel('heada').trigger('aaa', ['manage','管理员／操作员列表']);
            this.model = new NavModel();
            this.model2 = new NavModel();
        },
        onRender: function(){
        	var self = this;
        	
            this.model.fetch({
                data: {
                    serviceId: 4000330000001039,
                    t: new Date().valueOf(),
                    userId: this.id
                },
                success: function(model){
                	if(self.id){
                		self.model2.fetch({
			                data: {
			                    serviceId: 4000330000001053,
			                    t: new Date().valueOf(),
			                    userId: self.id
			                },
			                success: function(model2){
			                    self.getRegion('manage').show(new AddCheckerView({
			                        model: model,
			                        model2: model2
			                    }));
			                }
			            })
                	}else{
                		self.getRegion('manage').show(new AddCheckerView({
	                        model: model
	                    }));
                	}
                }
            });

            
            
        },

    });

});