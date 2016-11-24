define([
    'lodash',
    'marionette',
    'application',
    './item.tpl',
    '../staff',
    '../staffSearchModel',
    'backbone.radio',
    'core/navModel',
    'moment',
    '../modal/orgTreeModalView',
    'vendor/bootstrapValidator',
], function(_, Marionette, App, itemTpl, StaffModel, StaffSearchModel, Radio, NavModel, moment, OrgModal2, bootstrapValidator) {
    'use strict';

    return Marionette.CompositeView.extend({

        className: 'add-user-item',

        template: itemTpl,

        ui: {
        	userName: '#user-name',
        	phone: '#phone',
            wrongMessage: "#wrong-message",
            org: 'input[name="org"]',
            searchOrg: '#search-org2',
            addstaffForm: '#addstaff-form'
        },

        events: {
            'success.form.bv': '_sendForm',
            'submit #addstaff-form': '_prevent',

            'click #search-org2': '_searchOrg2'
        },

        initialize: function() {
        	// this.vcodeModel = new NavVcodeModel();
        	var self = this;


        	this.model = new StaffSearchModel();

        	

        	this.navModel = new NavModel();

        	Radio.channel('getOrgVal').on('getVal', function(data){
                $('#search-org2').val(data[0]);
                $('#search-org3').val(data[0]);
            });
        },

        _prevent: function(e){
        	e.preventDefault();
        },

        _searchOrg2: function(){
            var self = this;
            this.navModel.fetch({
                data: {
                    serviceId: 4000330000001003,
                    t: new Date().valueOf(),
                },
                success: function(model,msg){
                    // self.agencyCode = model.get('agencyCode');
                    // self.agencyName = model.get('agencyName');
                    // self.agencyId = model.get('id');

                    var orgModal = new OrgModal2({
                        model: model
                    });
                    
                }
            });
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
            this.navModel.fetch({
                data: {
                    serviceId: 4000330000001014,
                    t: new Date().valueOf(),
                },
                reset: true,
                success: function(model,msg){
                    if (msg.employes){
                        if (msg.employes[0]&&msg.employes[0].dictionarys){
                            $(msg.employes[0].dictionarys).each(function(){
                            	if(self.gender == this.name){
                            		self.$el.find('#gender').append("<option value='"+this.code+"' selected='selected'>"+this.name+"</option>");
                            	}else{
                            		self.$el.find('#gender').append("<option value='"+this.code+"'>"+this.name+"</option>");
                            	}
                            	
                            });
                        }
                        if (msg.employes[1]&&msg.employes[1].dictionarys){
                            $(msg.employes[1].dictionarys).each(function(){
                            	if(self.job == this.name){
                            		self.$el.find('#role-select').append("<option value='"+this.code+"' selected='selected'>"+this.name+"</option>");
                            	}else{
                            		self.$el.find('#role-select').append("<option value='"+this.code+"'>"+this.name+"</option>");
                            	}
                                
                            });
                            // $('#role-select').chosen();
                        }
                    }
                    
                }
            });

        },


        onShow: function(){


        	var self = this;
            this.$el.find('.input-group.date').datepicker({
                autoclose: true,
                clearBtn: true,
                language: 'zh-CN',
                format:'yyyy/mm/dd'
            });

        	self.$el.find('#addstaff-form').bootstrapValidator({
		            message: '',
		            feedbackIcons: {
		                valid: 'glyphicon glyphicon-ok',
		                invalid: 'glyphicon glyphicon-remove',
		                validating: 'glyphicon glyphicon-refresh'
		            },
		            fields: {
		                ecode: {
		                    validators: {
		                        notEmpty: {
		                            message: '员工号不能为空。'
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
		                name: {
		                    validators: {
		                        notEmpty: {
		                            message: '姓名不能为空。'
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
		                org:{
		                	validators: {
		                        notEmpty: {
		                            message: '请选择一个组织'
		                        }
		                	}
		                },

		                mobile: {
		                	validators: {
		                        regexp: {
		                            regexp: /^((1[3,4,5,7,8][0-9]{2})|(177[0-9]{1})|(178[0-9]{1})|(176[0-9]{1})|(1700)|(1705)|(1709))[0-9]{7}$/,
		                            message: '手机号不对'
		                        }
		                    }
		                },
                        job: {
                            validators: {
                                stringLength: {
                                    max: 20, 
                                    message: '必须小于20个字符。'
                                },
                                regexp: { 
                                    regexp: /^[^(\`\~\!\@\#\$\%\^\&\*\<\>)]+$/,
                                    message: '非法字符'
                                },
                            }
                        }
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
            var inputs = self.ui.addstaffForm.find('input');
            var selects = self.ui.addstaffForm.find('select');

            _.each(inputs,function(e){
                data[$(e)[0].name] = $(e)[0].value;
            });

            _.each(selects,function(e){
                data[$(e)[0].name] = $(e)[0].value;
            });
            // data.serviceId = 4000330000001058;
            data.t = '01';
            data.timeStp =  new Date().valueOf();
            data.type = this.id?'02':'01';
            data.id = self.id;
            // data.type = '01'

            var url = window.getApi('/getService.do?serviceId=4000330000001058');
	        $.ajax({  
	            url : url,  
	            type:'POST',  
	            data: data, 
	            contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
		        success: function(msg){
		        	 if (msg.code=='00'){
	                	 App.Router.navigate('staffinfo', {
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