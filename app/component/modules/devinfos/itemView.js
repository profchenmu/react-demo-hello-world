define([
    'lodash',
    'marionette',
    './itemView.tpl',
    'core/navModel',
    './modal/devideChange',
    './modal/devideUndo',
    'numbers'
], function(_, Marionette, ItemViewTpl, ModalModel, DevideChange, DevideUndo, numeral) {
    'use strict';

    return Marionette.ItemView.extend({

        tagName: 'tr',

        template: ItemViewTpl,

        initialize: function() {
            this.rolesModel = new ModalModel();
            this.model2 = new ModalModel();
        },

        events: {
            'click #devide-change': '_devideChange',
            'click #devide-undo': '_devideUndo'
        },
        

        onRender: function(){
            var self = this;
            
        },

        serializeData: function() {
            var data = this.model.toJSON();
            var temp = data.status;
            switch(temp){
                case '00':
                data.words = '成功';
                break;
                case '01':
                data.words = '失败';
                break;
                case '03':
                data.words = '待审核';
                break;
                case '04':
                data.words = '已拒绝';
                break;
                case '05':
                data.words = '撤销';
                break;
                default:
                data.words = '';
            }
            data.totalAmount = numeral(data.totalAmount).format('0,0.00');
            data.sucNum = data.totalNum - data.failCount;
            return data;
        },

        _devideChange: function(){
            var self = this;
            this.model2.fetch({
                data: {
                    serviceId: 4000330000001040,
                    functionType: 2,
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


    });

});