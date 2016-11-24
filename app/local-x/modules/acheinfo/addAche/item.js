define([
    'lodash',
    'marionette',
    'application',
    './item.tpl',
    '../ache',
    '../acheSearchModel',
    'backbone.radio',
    'core/navModel',
    'moment',
    '../modal/orgTreeModalView',
    'vendor/bootstrapValidator',
], function(_, Marionette, App, itemTpl, StaffModel, AcheSearchModel, Radio, NavModel, moment, OrgModal2, bootstrapValidator) {
    'use strict';

    return Marionette.CompositeView.extend({

        className: 'add-user-item',

        template: itemTpl,

        ui: {
        	userName: '#user-name',
        	phone: '#phone',
            wrongMessage: "#wrong-message",
            org: 'input[name="org"]',
            searchOrg: '#parent-code',
            addacheForm: '#addache-form'
        },

        events: {
            'success.form.bv': '_sendForm',
            'submit #addache-form': '_prevent',
            'click #parent-code': '_searchOrg'
        },

        initialize: function() {
        	// this.vcodeModel = new NavVcodeModel();
        	var self = this;


        	this.model = new AcheSearchModel();

        	

        	this.navModel = new NavModel();

        	Radio.channel('getOrgValAche').on('getVal', function(data){
                $('#parent-name').val(data[0]);
                $('#parent-code').val(data[0]);
            });
        },

        _searchOrg: function(){
            var self = this;
            this.navModel.fetch({
                data: {
                    serviceId: 4000330000001003,
                    timeStp: new Date().valueOf(),
                },
                success: function(model,msg){
                    if(msg.code=='102'){
                        App.Router.navigate('login', {
                            trigger: true
                        });
                        return false;
                    }
                    var orgModal = new OrgModal2({
                        model: model
                    });
                    
                }
            });
        },

        _prevent: function(e){
        	e.preventDefault();
        },



        serializeData: function(){
        	var self = this;

        	if(self.options.tempModel){
        		var data = self.options.tempModel.toJSON();
	        	self.gender = data.gender;
	        	self.job = data.job;
	        	data.hireDateStr = moment(data.hireDateStr).format('YYYY/MM/DD');
                data.canChange = false;
	        	return data;
        	}else{
        		var data = self.model.toJSON();
                data.canChange = true;
        		return data;
        	}
        	

        },


        onRender: function(){
            // this._renderUsers();
            var self = this;
            

        },


        onShow: function(){


        	var self = this;
            this.$el.find('.input-group.date').datepicker({
                autoclose: true,
                clearBtn: true,
                language: 'zh-CN',
                format:'yyyy/mm/dd'
            });

        	self.$el.find('#addache-form').bootstrapValidator({
		            message: '',
		            feedbackIcons: {
		                valid: 'glyphicon glyphicon-ok',
		                invalid: 'glyphicon glyphicon-remove',
		                validating: 'glyphicon glyphicon-refresh'
		            },
		            fields: {
		                agencyCode: {
		                    validators: {
		                        notEmpty: {
		                            message: '组织编号不能为空。'
		                        },
                                stringLength: {
                                    max: 20, 
                                    message: '必须小于20个字符。'
                                },
                                regexp: { 
                                    regexp: /^[^(\`\~\!\@\#\$\%\^\&\*\<\>)]+$/,
                                    message: '非法字符'
                                },
		                    }
		                },
		                agencyName: {
		                    validators: {
		                        notEmpty: {
		                            message: '组织名称不能为空。'
		                        },
                                stringLength: {
                                    max: 20, 
                                    message: '必须小于20个字符。'
                                },
                                regexp: { 
                                    regexp: /^[^(\`\~\!\@\#\$\%\^\&\*\<\>)]+$/,
                                    message: '非法字符'
                                },
		                    }
		                },
		                // parentCode:{
		                // 	validators: {
		                //         notEmpty: {
		                //             message: '父组织编号不能为空。'
		                //         },
                  //               stringLength: {
                  //                   max: 20, 
                  //                   message: '必须小于20个字符。'
                  //               },
                  //               regexp: {
                  //                   regexp: /^[^(\`\~\!\@\#\$\%\^\&\*\<\>)]+$/,
                  //                   message: '非法字符'
                  //               },
		                // 	}
		                // },

		                // 'hire_date':{
		                // 	validators: {
		                //         notEmpty: {
		                //             message: '入职日期不能为空'
		                //         }
		                // 	}
		                // }
		            }
		        })
        		// .on('success.form.bv', function(){
		        // 	return false;
		        // });
        },

        _sendForm: function(e){
        	var self = this;

            var data = {};
                data.pageSize = self.pageSize;
            var inputs = self.ui.addacheForm.find('input');
            _.each(inputs,function(e){
                data[$(e)[0].name] = $(e)[0].value;
            });
            // data.serviceId = 4000330000001058;
            data.t = '02';
            data.timeStp =  new Date().valueOf();
            data.type = this.id?'02':'01';
            data.id = self.id;
            // data.type = '01'

            var url = window.getApi('/getService.do?serviceId=4000330000001056');
	        $.ajax({  
	            url : url,  
	            type:'POST',  
	            data: data, 
	            contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
		        success: function(msg){
		        	 if (msg.code=='00'){
	                	 App.Router.navigate('acheinfo', {
	                         trigger: true
	                     });
		             }else {
		        		 alert(msg.message);
		        	 }
		        	 
		        }
	        });
	        return false;

        },

        
    });

});