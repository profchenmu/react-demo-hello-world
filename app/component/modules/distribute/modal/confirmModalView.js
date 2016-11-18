define([
    'marionette',
    'share/modal',
    './confirmModalView.tpl',
    'vendor/bootstrap-treeview',
    'application',
    './otpModalView',
    './resultModalView',
    'core/navModel',
], function(Marionette, Modal, template, Treeview,App,OtpModal,ResultModal,NavModel) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'modal fade',

        events: {
            'hidden.bs.modal': '_destroyModal',
            'success.form.bv': '_submit',
            'submit #change-check': '_prevent'
        },

        initialize: function() {
            this.promise = $.Deferred();
            this.render();
        },

        ui: {
            'changeCheck': '#change-check'
        },
        
        _prevent: function(e){
            e.preventDefault();
        },

        template: template,

        serializeData: function() {
            var temp = this.model.toJSON();
        	if (this.options.model1=='01'){
	            var data = {
	                info: $("#info").val(),
	                price:$("#price").val(),
	                totalPrice:$("#budget-amt").text(),
                    userAgencyList: temp.userAgencyList
	            };
	            return data;
        	} else if (this.options.model1=='02'){
        		 var data = {
     	                info: $("#info2").val(),
     	                price:'',
     	                totalPrice:$("#total-span").text(),
                        userAgencyList: temp.userAgencyList
     	            };
     	            return data;
        	}
        },

        onRender: function(){           
            this.$el.modal({
                show: true
            });
            var self = this;
            setTimeout(function(){
                self.ui.changeCheck.bootstrapValidator({
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
        
        _getOrgIds:function(){
        	var orgChecknodes = $("#depart-tree").treeview('getChecked');
        	var ids = new Array();
        	$(orgChecknodes).each(function(){
        		ids.push(this.orgCode);
        	});
        	return ids.join();
        },
        
        _getJobIds:function(){
        	var jobs = $("#role-select").val();
        	if (jobs&&jobs.length>0){
        		jobs = jobs.join();
        	}
        	return jobs;
        },
        
        _initData:function(){
        	var data = new Object();
        	data.transferName = $("#info").val();
        	data.transferList = [];
        	$(".input-number").each(function(e,i){
        		var og = new Object();
        		og.targetOrganzationId = $(this).data('id')+'';
        		og.transferAmount = $(this).val();
        		data.transferList.push(og)
        	});
        	return JSON.stringify(data);
        },
        
        _successMethod:function(msg){
            var self = this;
        	if (msg.code=='00'){
        		var otp = $("#otp").val();
        		this.$el.modal('hide');
            	if (msg.OTP=='Y'){
            		var otpModal = new OtpModal({
    	                model: msg,
                        auditUser: $('.check-name:checked').val()
    	            });
            		return false;
            	} else { 
            		var model = new NavModel();
                	model.fetch({
                        data: {
                            serviceId: 4000330000001019,
                            taskId:msg.taskId,
                            t: new Date().valueOf(),
                            auditUser: $('.check-name:checked').val()
                        },
                        reset: true,
                        success: function(model,msg1){
                        	 if (msg1.code=='00'){
                        		 self.$el.modal('hide');
                        		 var resultModal = new ResultModal({
             	 	                model: msg1.message
             	 	            });
                        	 } else if (msg1.code="01"){
                        		 alert(msg1.message);
                        	 }
                        }
                	})
            		// var resultModal = new ResultModal({
            		// 	model: msg.message
            		// });
            	}
        	 }
        },
        
        _submit:function(){
        	var self = this;
        	if (this.options.model1=='01'){   //tab1
		       	var url = window.getApi('/getService.do?serviceId=4000330000001016');
		        $.ajax({  
		            url : url,  
		            type:'POST',  
		            data:{
		            	singlePrice: $("#price").val(),
		            	org_code:this._getOrgIds(),
		            	benefitName:$("#info").val(),
		            	job:this._getJobIds(),
		                gender:$("#gender").val(),
		                hire_date:$("#join-date").val(),
                        auditUser: $('.check-name:checked').val()
		            },  
		            async: false,  
		            cache: false,  
		            contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
			        success: function(msg){
			        	self._successMethod(msg);
			        }
		        });
        	} else if (this.options.model1=='02'){  //tab2
        		var url = window.getApi('/budget.do?serviceId=4000330000001017');
		        $.ajax({  
		            url : url,  
		            type:'POST',  
		            data:{
		            	fname: $('#upload-file').val(),
		            	benefitName:$('#info2').val(),
		            	orgname:$('#orgname').val(),
                        auditUser: $('.check-name:checked').val()
		            },  
		            async: false,  
		            cache: false,  
		            contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
			        success: function(msg){
			        	self._successMethod(msg);
			        }
		        });
        	}
    	}
    });
});