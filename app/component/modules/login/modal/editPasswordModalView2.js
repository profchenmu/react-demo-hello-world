define([
    'marionette',
    'backbone.radio',
    './editPasswordModalView2.tpl',
    'core/navVcodeModel',
    'core/navModel',
    './resultModalView',
    'core/checkCodeImageModel',
    'vendor/simpletimer'
], function(Marionette, Radio, template, NavModel, NavModel2, ResultModal, CheckModel, simpleTimer) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'modal fade',

        events: {
            'hidden.bs.modal': '_destroyModal',
            'click #image-auth': '_updateImageAuth',
            'click #reload-img': '_updateImageAuth',
            'click #get-timer': '_getTimer',
            // 'blur #code': '_validatorCode',
            'success.form.bv': '_sendChanges',
            'submit #add-user-form': '_prevent'
        },

        template: template,

        ui: {
            'imageAuth': '#image-auth',
            'editPasswordForm2': '#edit-password-form2',
            'code': '#code',
            'getTimer': '#get-timer',
            'timerText': '#timer-text',
            'timer': '#timer',
            'phone': '#phone',
            'checkCode': '#check-code',
            'userName': '#user-name'
        },

        _prevent: function(e){
            e.preventDefault();
        },

        initialize: function() {
            this.render();
        },

        _sendChanges: function(e){
            var self = this;
            e.preventDefault();
            var model = new NavModel2();
            model.fetch({
                url: window.getApi('/userPwdRestore.do'),
                data: {
                    otp: self.ui.checkCode.val(),
                    code: self.ui.code.val(),
                    timestamp: self.timestamp,
                    t: new Date().valueOf(),
                    phone: self.ui.phone.val(),
                    userName: self.ui.userName.val()
                },
                reset: true,
                success: function(model,msg){
                    if (msg.code=='00'){
                         self.$el.modal('hide');
                         var resultModal = new ResultModal({
                            model: msg.message
                        });
                    } else {
                        alert(msg.message);
                    }
                    $("#edit-password-button").prop("disabled",false);
                }
            })
        },

        _validatorCode: function(){
            var checkModel = new CheckModel();
            var self = this;
            checkModel.fetch({
                data:{
                    timestamp: self.timestamp,
                    code: self.ui.code.val(),
                    t: new Date().valueOf(),
                },
                reset:true,
                success:function(model,msg){
                    if (msg.code=='01'){
                        $("#code2").val("");
                        $('#edit-password-form2').data('bootstrapValidator').updateStatus('code2', 'NOT_VALIDATED').validateField('code2');
                    } else if (msg.code=='00'){
                        $("#code2").val("1");
                        $('#edit-password-form2').data('bootstrapValidator').updateStatus('code2', 'VALIDATED').validateField('code2'); 
                    }
                }
            })
        },

        _updateImageAuth: function(){
            this.timestamp = Math.round(new Date().getTime());
            this.ui.imageAuth.attr('src',window.getApi('/vcodeImage.do')+'?timestamp='+this.timestamp); 
        },
        _getTimer: function(e){
            var self = this;
            $('#edit-password-form2').data('bootstrapValidator').validateField('phone');
            $('#edit-password-form2').data('bootstrapValidator').validateField('code');
            $('#edit-password-form2').data('bootstrapValidator').validateField('user-name');
            var caophone = $('#edit-password-form2').data('bootstrapValidator').isValidField('phone');
            var caoCode = $('#edit-password-form2').data('bootstrapValidator').isValidField('code');
            var userName = $('#edit-password-form2').data('bootstrapValidator').isValidField('user-name');

            if(caophone&&caoCode&&userName){
                
                var model = new CheckModel();
                model.fetch({
                    url: window.getApi('/otpCheckCode.do'),
                    data: {
                        code: self.ui.code.val(),
                        timestamp: self.timestamp,
                        t: new Date().valueOf(),
                        phone: self.ui.phone.val(),
                        userName: self.ui.userName.val()
                    },
                    reset: true,
                    success: function(model,msg){
                        if (msg.code=="02"){
                            $('#edit-password-form2').data('bootstrapValidator').updateMessage('code', 'blank', msg.message)
                            $('#edit-password-form2').data('bootstrapValidator').updateStatus('code', 'INVALID', 'blank');
                            self._updateImageAuth();
                        } else if (msg.code=='00'){
                            $(e.currentTarget).prop('disabled',true);
                            self.ui.timerText.text('秒后重新发送');
                            self.ui.timer.simpleTimer({
                                callback: function(){
                                    self.ui.getTimer.prop('disabled',false);
                                    self.ui.timer.empty();
                                    self.ui.timerText.text('重新发送');
                                    // self._updateImageAuth();
                                },
                                time: 60
                            });
                        } else {
                            alert(msg.message);
                            self._updateImageAuth();
                        }
                        $("#edit-password-button").attr("disabled",false);
                    }
                });
            }
        },
        onRender: function(){
            this.$el.modal({
                show: true
            });
            var self = this;
            // this._updateImageAuth();

            self.ui.editPasswordForm2.bootstrapValidator({
                message: '',
                feedbackIcons: {

                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    'user-name': {
                        validators: {
                            notEmpty: {
                                message: '用户名不能为空'
                            }
                        }
                    },
                    code: {
                        validators: {
                            notEmpty: {
                                message: '验证码不能为空'
                            },
                            blank: {}
                        }
                    },
                    'check-code': {
                        validators: {
                            notEmpty: {
                                message: '手机验证码不能为空'
                            }
                        }
                    },
                    phone: {
                        validators: {
                            notEmpty: {
                                message: '手机号不能为空'
                            },
                            regexp: { 
                                regexp: /^((1[3,4,5,7,8][0-9]{2})|(177[0-9]{1})|(178[0-9]{1})|(176[0-9]{1})|(1700)|(1705)|(1709))[0-9]{7}$/,
                                message: '手机号不对'
                            }
                        }
                    }
                }
            });
            self._updateImageAuth();
        },


        _destroyModal: function() {
            this.$el.remove();
        }

    });

});