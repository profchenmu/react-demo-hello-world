define([
    'lodash',
    'marionette',
    './modal/rolesModalView',
    './itemView.tpl',
    'core/navModel',
    './modal/devideChange',
    './modal/devideUndo',
    'backbone.radio',
    'numbers'
], function(_, Marionette, RolesModal, ItemViewTpl, ModalModel, DevideChange, DevideUndo, Radio, numeral) {
    'use strict';

    return Marionette.ItemView.extend({

        tagName: 'tr',

        template: ItemViewTpl,

        events: {
            'click #show-roles': '_showRoles',
            'click #devide-change': '_devideChange',
            'click #devide-undo': '_devideUndo'
        },

        initialize: function() {
            var self = this;
            this.rolesModel = new ModalModel();
            this.model2 = new ModalModel();
            
        },
        _devideChange: function(){
            var self = this;
            this.model2.fetch({
                data: {
                    serviceId: 4000330000001040,
                    functionType: 1,
                    operType: 2
                },
                success: function(model){
                    var auditUser = self.model.get('auditUser'),
                        auditUserAll = model.get('userAgencyList');
                    _.each(auditUserAll, function(e){
                        if(e.userName==auditUser){
                            e.checked = true;
                        }else{
                            e.checked = false;
                        }
                    });
                    var devideChange = new DevideChange({
                        model: self.model,
                        auditUserAll: auditUserAll
                    });
                }
            })
        },

        _devideUndo: function(){
            var devideChange = new DevideUndo({
                model: this.model
            });
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
            var temp = data.status;
            switch(temp){
                case '00':
                data.words = '全部成功';
                break;
                case '01':
                data.words = '全部失败';
                break;
                case '02':
                data.words = '部分成功';
                break;
                case '03':
                data.words = '待落地';
                break;
                case '04':
                data.words = '落地中';
                break;
                case '05':
                data.words = '落地成功';
                break;
                case '06':
                data.words = '待处理';
                break;
                case '07':
                data.words = '处理中';
                break;
                case '08':
                data.words = '待审核';
                break;
                case '09':
                data.words = '已拒绝';
                break;
                case '10':
                data.words = '撤销';
                break;
                default:
                data.words = '';

            }
            return data;
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
                             id: self.model.id,
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