define([
    'marionette',
    'share/modal',
    './confirmModalView.tpl',
    'core/navModel',
    'vendor/bootstrap-treeview',
    'application',
    './otpModalView',
    './resultModalView'
], function(Marionette, Modal, confirmModalTemplate, NavModel,Treeview,App,OptModal,ResultModal) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'modal fade',

        events: {
            'hidden.bs.modal': '_destroyModal',
            'success.form.bv': '_submit',
            'submit #change-check2': '_prevent'
        },

        initialize: function() {
            this.promise = $.Deferred();
            this.render();
            // this.model = new NavModel();
        },

        ui: {
            'changeCheck2': '#change-check2'
        },
        
        _prevent: function(e){
            e.preventDefault();
        },

        template: confirmModalTemplate,

        serializeData: function() {
            var self = this,
                data = {
                    og: $("#og-span").text(),
                    price:$("#price-span").text(),
                    userAgencyList: self.model.get('userAgencyList')
                };
            return data;
        },

        onRender: function(){   
            var self = this;        
            this.$el.modal({
                show: true
            });
            setTimeout(function(){
                self.ui.changeCheck2.bootstrapValidator({
                    message: '',
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        'check-name': {
                            validators: {
                                notEmpty: {
                                    message: '必须选择审核员'
                                },
                                blank: {}
                            }
                        }
                    }
                })
            },100);
        },

        _destroyModal: function() {
            this.$el.remove();
        },
        
        _initData:function(){
        	var data = new Object();
        	data.transferName = $("#info").val();
        	data.transferList = [];
        	$(".input-number").each(function(e,i){
        		var og = new Object();
        		og.targetOrganzationId = $(this).data('id')+'';
        		og.transferAmount = $(this).val();
        		if (og.transferAmount!=''&&og.transferAmount!='0'){
        			data.transferList.push(og)
        		}
        	});
            
        	return JSON.stringify(data);
        },
        
        _submit:function(){
        	var self = this;
        	var otp = $("#otp").val();
            var data = this._initData();
        	if (otp=='true'){
        		this.$el.modal('hide');
        		var optModal = new OptModal({
	                model: this.model,
                    data :data,
                    auditUser: $('.check-name:checked').val()
	            });
        		return false;
        	}
	
	       	var url = window.getApi('/getService.do?serviceId=4000330000001000');
	        $.ajax({  
	            url : url,  
	            type:'POST',  
	            data:{
	            	data: data,
                    auditUser: $('.check-name:checked').val()
	            },  
	            async: false,  
	            cache: false,  
	            contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
		        success: function(msg){
		        	 if (msg.code=='00'){
		        		 self.$el.modal('hide');
		        		 var resultModal = new ResultModal({
		 	                model: msg.message
		 	            });
		        	 }
		        }
	        });
        }
    });
});