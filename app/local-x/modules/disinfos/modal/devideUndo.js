define([
    'marionette',
    'backbone.radio',
    './devideUndo.tpl',
    'vendor/bootstrapValidator'
], function(Marionette, Radio, template) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'modal fade',

        events: {
            'hidden.bs.modal': '_destroyModal',
            'shown.bs.modal': '_shownModal',
        },

        template: template,

        ui: {
            'checkDevideForm': '#check-devide-form'
        },

        initialize: function() {
            this.render();
            this.id = this.model.id;
        },

        serializeData: function() {
            var data = this.model.toJSON();
            data.auditUserAll = this.options.auditUserAll;
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
            self.ui.checkDevideForm.bootstrapValidator()
            .on('success.form.bv', function(e){
                e.preventDefault();
                var $form = $(e.target),
                    bv = $form.data('bootstrapValidator'); 
                $.ajax({
                    url: window.getApi('/getService.do?serviceId=4000330000001044'),
                    type: 'POST',
                    data: {
                        auditId: $('.check-list').data('audit'),
                        functionType: 1
                        // t: new Date().valueOf()
                    },
                    success: function(res){
                        if(res.code === '00'){
                            Radio.channel('listChange2').trigger('reset');
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
            });
        },

        

    });

});