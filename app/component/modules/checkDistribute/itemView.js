define([
    'lodash',
    'marionette',
    './modal/rolesModalView',
    './itemView.tpl',
    'core/navModel',
    './modal/checkDenyView',
    './modal/checkCirfirmView',
    'numbers'
], function(_, Marionette, RolesModal, ItemViewTpl, ModalModel, DevideDenyModal, DevideCirfirmModal, numeral) {
    'use strict';

    return Marionette.ItemView.extend({

        tagName: 'tr',

        template: ItemViewTpl,

        events: {
            'click #show-roles': '_showRoles',
            'click #devide-deny': '_devideDeny',
            'click #devide-pass': '_devideCirfirm'
        },

        initialize: function() {
            this.rolesModel = new ModalModel();
        },
        

        onRender: function(){
            
        },

        serializeData: function() {
            var data = this.model.toJSON(),
                btnAuth = window.sessionStorage.getItem('btnAuth').split(',');
            data.benefitAmount = numeral(data.benefitAmount).format('0,0.00');
            data.sucNum = data.totalNum - data.failCount;
            if(btnAuth.indexOf('4000330000001008')>=0){
                data.showDetails = true;
            }else{
                data.showDetails = false;
            }
            
            if(btnAuth.indexOf('4000330000001009')>=0){
                data.showRoles = true;
            }else{
                data.showRoles = false;
            }
            this.type = data.type;
            return data;
        },

        _devideDeny: function(e){
            var self = this;
            var denyModal = new DevideDenyModal({
                model: self.model
            });
        },

        _devideCirfirm: function(e){
            var self = this;
            var cirfirmModal = new DevideCirfirmModal({
                model: self.model
            });
        },

        _showRoles: function(){
            var self = this;
            this.rolesModel.fetch({
                reset: true,
                data: {
                    serviceId: 4000330000001014,
                    t: new Date().valueOf(),
                },
                success: function(model,msg){
                	self.rolesModel.employes = msg.employes;
                	self.rolesModel.fetch({
                        reset: true,
                        data: {
                             id: self.model.get('ruleId'),
                             serviceId: 4000330000001009,
                             t: new Date().valueOf(),
                        },
                        success: function(model, msg){
                            if(msg.code === '00'){
                                var rolesModal = new RolesModal({
                                    model: self.rolesModel
                                });
                            }
                        }
                    })
                }
            });
        }

    });

});