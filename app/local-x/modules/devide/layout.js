define([
    'lodash',
    'marionette',
    'backbone.radio',
    './layout.tpl',
    './treeView',
    './modal/confirmModalView',
    'core/navModel',
    'vendor/bootstrapValidator',
    'vendor/bootstrap-treeview',
    
], function(_, Marionette, Radio, layout, TreeView, ConfirmModal, NavModel, bootstrapValidator) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'mydata-layout',

        template: layout,

        events: {
            'click #submit-btn': '_submit'
        },
        
        regions: {
            'tree': '#devide-tree'
        },
        
        onRender: function(){
            var self = this;
        	this.getRegion('tree').show(new TreeView());
            setTimeout(function(){
            	self._validator();
            },0);
        },

        initialize: function(){    
            Radio.channel('heada').trigger('aaa', ['devide','福利划拨']);
            this.model = new NavModel();
        },
        
        _validator: function(e){
        	var self = this;
	        this.$el.find('#devide-form').bootstrapValidator({
	            message: 'This value is not valid',
	            feedbackIcons: {
	                valid: 'glyphicon glyphicon-ok',
	                invalid: 'glyphicon glyphicon-remove',
	                validating: 'glyphicon glyphicon-refresh'
	            },
	            fields: {
	                info: {
	                    validators: {
	                        notEmpty: {
	                            message: '说明不能为空。'
	                        },
	                        stringLength: { 
	                            min: 1, 
	                            max: 40, 
	                            message: '说明必须大于1个字符，小于40个字符。' 
	                        }, 
	                    }
	                },
	                org:{
	                	validators: {
	                        notEmpty: {
	                            message: '请至少一个组织'
	                        },
	                        stringLength: { 
	                            min: 1, 
	                            max: 20, 
	                            message: '划拨金额大于可用金额。' 
	                        }
	                    }
	                }
	            }
	        }).on('success.form.bv', function(e) {
	     		e.preventDefault();
	     		self.model.fetch({
                	data: {
                		serviceId: 4000330000001040,
                		functionType: 2,
                		operType: 2
                	},
                	success: function(model,b,c){
                		var confirmModal = new ConfirmModal({
			                model: model
			            });
                	}
                })
	     		
	     		$("#submit-btn").attr("disabled",false);
	     	});
        }
    });

});