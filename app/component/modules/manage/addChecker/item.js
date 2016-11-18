define([
    'lodash',
    'marionette',
    'application',
    './item.tpl',
    'vendor/bootstrap-treeview',
    'backbone.radio',
    'core/navModel',    
    'core/navVcodeModel',    
    'core/checkCodeImageModel',
    'vendor/jquery.tree-multiselect', 
    'vendor/bootstrapValidator'
], function(_, Marionette, App, itemTpl, BootstrapTree, Radio,NavModel,NavVcodeModel,CheckModel) {
    'use strict';

    return Marionette.CompositeView.extend({

        className: 'add-user-item',

        template: itemTpl,

        ui: {
        	userName: '#user-name',
        	phone: '#phone',
            orgTree: '#org-tree',
            menuTree: '#menu-tree',
            imageAuth: "#image-auth",
            timestamp: "#timestamp",
            checkCode: "#check-code",
            codeDiv: "#code-div",
            wrongMessage: "#wrong-message",
            org: 'input[name="org"]'
        },

        events: {
            'click #image-auth': '_updateImageAuth',
            'click #reload-img': '_updateImageAuth',
            'blur #check-code': '_validatorCode',
            'success.form.bv': '_sendForm',
            'submit #add-user-form': '_prevent'
        },

        initialize: function() {
        	this.vcodeModel = new NavVcodeModel();
            // this.model = new NavModel();
        },

        _prevent: function(e){
        	e.preventDefault();
        	// this._sendForm();
        },

        serializeData: function(){
        	var self = this;
        	var data = this.model.toJSON();
        	this.timestamp = Math.round(new Date().getTime());
        	data.vcodeImg = window.getApi('/vcodeImage.do') + '?timestamp=' + this.timestamp;



			var treeA = [];
			_.each(data.treeData, function(e,i){
				loops(e)
			});

			// _.each(caoData.treeData, function(e,i){
			// 	loops(e)
			// });
			var treeB = [];
			_.each(treeA, function(e){
			    e.text0 = e.text.substring(0,e.text.indexOf(';'));
			    e.text = e.text.substring(e.text.indexOf(';')+1);
			    e.text = e.text.split(";").reverse().join(";");
			    treeB.push(e);
			    // var tpl = '<option value="'+ e.value +'" data-section="'+ e.text +'">'+ e.text0 +'</option>'

			    // $('#test-select').append(tpl);
			});

			data.treeA = treeA;
			function loops(a){
			if(a.nodes){
			    _.each(a.nodes, function(f){
			    f.orgCode = f.orgCode + ';' + a.orgCode;
			    f.text = f.text + ';' + a.text;
			    if(a.checked){
	                f.checked = true
	            }
			    loops(f);
			    })
			}
			else{
				treeA.push({value: a.orgCode, text: a.text, orgCode: a.orgCode, checked: a.checked});
			}
			}
			if(this.options.model2){
				_.extend(data, self.options.model2.toJSON());
			}else{
				_.extend(data, {userName:'',phone:''});
			}
        	return data;
        },

        onShow: function(){
        	var self = this;
        	if(self.options.model2){
        		var startCollapsed = false;
        	}else{
        		var startCollapsed = true;
        	}
        	self.$el.find("#test-select").treeMultiselect({ startCollapsed: startCollapsed, hideSidePanel: true, sectionDelimiter: ';'});
        	self.$el.find('#add-user-form').bootstrapValidator({
		            message: '',
		            feedbackIcons: {
		                valid: 'glyphicon glyphicon-ok',
		                invalid: 'glyphicon glyphicon-remove',
		                validating: 'glyphicon glyphicon-refresh'
		            },
		            fields: {
		                "user-name": {
		                    validators: {
		                        notEmpty: {
		                            message: '用户名不能为空。'
		                        },
		                        stringLength: { 
		                            min: 6, 
		                            max: 18, 
		                            message: '用户名必须大于6个字符，小于18个字符。' 
		                        },
		                        callback: {
		                        	message: '用户名不符合限制规则，用户名只能是纯数字，或纯字母，或字母加数字，或邮箱格式',
		                        	callback: function(value, validator) {
			                            var regexp1 =  /[^0-9a-zA-Z]/;
			                            var re = new RegExp(regexp1);
			                            if (!re.test(value)) {
			                                return true;
			                            } else {
			                            	var regexp2 =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			                            	re = new RegExp(regexp2);
			                            	 if (re.test(value)) {
					                               return true;
			                            	 } else {
			                            		 return false;
			                            	 }
			                            }
		                            }
		                        }
		                    }
		                },
		                phone: {
		                    validators: {
		                        notEmpty: {
		                            message: '手机号不能为空。'
		                        },
		                        regexp: { 
		                            regexp: /^[1]{1}[3,4,5,7,8]{1}[0-9]{9}$/,
		                            message: '手机号不对'
		                        }
		                    }
		                },
		                org:{
		                	validators: {
		                        notEmpty: {
		                            message: '请选择一个组织'
		                        }
		                	}
		                },
		                'data-auth':{
		                	validators: {
		                        notEmpty: {
		                            message: '请至少选择一个菜单'
		                        }
		                	}
		                },
		                code:{
		                	validators: {
		                        notEmpty: {
		                            message: '验证码不正确'
		                        }
		                	}
		                }
		            }
		        })	
        },

        _sendForm: function(e){
        	var self = this;
        	var $selectionContainer = self.$el.find('.selections');
        	
		    var selections = [];
		    
		    // var selectAll = $selectionContainer.children('.title').children('input').prop('checked');

		    tempCao($selectionContainer);
		    
		    function tempCao($aa){
		    	// $aa.each(function(){
		    	// 	if($aa.children('div.section').length>0){
		    	// 		var $self = $(this);
		    	// 		tempCao($self);
		    	// 	}
		    	// });
		    	if($aa.children('.title').children('input').prop('checked')){
		    		var $el = $aa;
				    selections.push($el.data('cao'));
		    	}else{
		    		var $caoBoxs = $aa.children("div.section");
				    $caoBoxs.each(function(){
				    	var checked = $(this).children('.title').children('input').prop('checked');
				    	if(checked){
				            var $el = $(this);
				            selections.push($el.data('cao'));
				        }else{
				        	var $selectedBoxes = $(this).children("div.item").has("> input[type=checkbox]:checked");
				            $selectedBoxes.each(function() {
				            	var $el2 = $(this);
				            	selections.push($el2.data('value'));
				            });
				            var $childSet = $(this).children("div.section");
				            if($childSet.length>0){
				            	// var $self = $(this);
				            	// $childSet.each(function(){
				            		tempCao($(this));
				            	// });
				            }
					            
				        }

				        

				    });
		    	}
		    	
		    }
		    var auths = [];
		    	self.ui.org.each(function(){
		    		if($(this).prop('checked')){
		    			auths.push($(this).val());
		    		}
		    	})
		    	// auths = auths.join(',');
		    
        	var data = {
                serviceId: 4000330000001046,
                t: new Date().valueOf(),
                userName: self.ui.userName.val(),
                phone: self.ui.phone.val(),
                timestamp: self.timestamp,
                auths: auths.join(','),
                code: self.ui.checkCode.val(),
                agencyCode: selections.join('|')
            }

            if(this.options.model2){
            	data.serviceId = 4000330000001047;
            	data.userId = this.options.model2.get('userId')
            }
        	self.vcodeModel.fetch({
                data: data,
                reset: true,
                success: function(model,msg){
    				$('#auth-manage-save').attr("disabled",false);
                	 alert(msg.message);
                	 if (msg.code=='00'){
	                	 App.Router.navigate('manage', {
	                         trigger: true
	                     });
                	 }
                }
            });
            return false;
        },

        _updateImageAuth: function(){
        	var self = this;
            this.timestamp = Math.round(new Date().getTime());
        	this.ui.imageAuth.attr('src',window.getApi('/vcodeImage.do')+'?timestamp=' + self.timestamp); 
        },
        
        _validatorCode: function(){
        	var checkModel = new CheckModel();
        	var self = this;
        	checkModel.fetch({
        		data:{
        			timestamp: self.timestamp,
        			code: self.ui.checkCode.val(),
                    t: new Date().valueOf(),
        		},
        		reset:true,
        		success:function(model,msg){
        			if (msg.code=='01'){
                 		$("#code").val("");
                    	$('#add-user-form').data('bootstrapValidator').updateStatus('code', 'NOT_VALIDATED').validateField('code');
        			} else if (msg.code=='00'){
                 		$("#code").val("1");
                    	$('#add-user-form').data('bootstrapValidator').updateStatus('code', 'VALIDATED').validateField('code'); 
        			}
        		}
        	})
        },
        
    });

});