define([
    'marionette',
    'backbone.radio',
    './checkDenyView.tpl',
    'vendor/bootstrapValidator'
], function(Marionette, Radio, checkDenyTemplate2, bootstrapValidator) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'modal fade',

        events: {
            'hidden.bs.modal': '_destroyModal',
            'shown.bs.modal': '_shownModal',
        },

        template: checkDenyTemplate2,

        ui: {
            'checkDevideForm': '#check-devide-form',
            'denyReason': '#deny-reason'
        },

        initialize: function() {
            this.render();
            this.id = this.model.id;
        },

        serializeData: function() {
            var data = this.model.toJSON();
            return data;
        },

        onRender: function(){ 
            this.$el.modal({
                show: true
                // backdrop: true
            });
        },

        _destroyModal: function() {
            this.$el.remove();
            // $('body').removeClass('rrp-info-detail-modal-open');
        },

        _sendChange: function(e){
            
            
        },

        _shownModal: function(){
            var self = this;
            self.ui.checkDevideForm.bootstrapValidator({
                message: '',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    denyreason: {
                        validators: {
                            notEmpty: {
                                message: '理由不能为空'
                            },
                            regexp: { 
                                regexp: /^[^(\`\~\!\@\#\$\%\^\&\*\<\>)]+$/,
                                message: '非法字符'
                            },
                            stringLength: {
                                max: 20,
                                message: '最多20个字符'
                            },
                            blank: {}
                        }
                    }
                }
            })
            .on('success.form.bv', function(e){
                e.preventDefault();
                var msg = self.ui.denyReason.val(),
                    $form = $(e.target),
                    bv = $form.data('bootstrapValidator'); 
                $.ajax({
                    url: window.getApi('/getService.do?serviceId=4000330000001048'),
                    type: 'POST',
                    data: {
                        id: self.id,
                        functionType: 1,
                        status: 2,
                        message: msg,
                        // t: new Date().valueOf()
                    },
                    success: function(res){
                        if(res.code === '00'){
                            Radio.channel('listChange4').trigger('reset');
                            // self.ui.errorMsg.text('');
                            self.$el.modal('hide');
                        }else if(res.code === '101'){

                            App.Router.navigate('login', {
                                trigger: true
                            });
                            window.sessionStorage.clear();
                            return false;
                        }else{
                            alert(res.message);
                            // bv.updateMessage('code', 'blank', res.message);
                            // bv.updateStatus('code', 'INVALID', 'blank');
                        }
                    }
                });
                self.$el.modal('hide');
            })

                
        },

        

    });

});