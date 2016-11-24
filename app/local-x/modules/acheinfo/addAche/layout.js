define([
    'lodash',
    'marionette',
    'application',
    './layout.tpl',
    './item',
    'backbone.radio',
    '../acheSearchModel'
], function(_, Marionette, App, layoutTpl, AddStaff, Radio, AcheModel) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'add-staff',

        template: layoutTpl,

        regions: {
            'addStaff': '.add-staff'
        },

        serializeData: function(){
            if(this.id){
                return {
                    title: '权限管理'
                }
            }else{
                return {
                    title: '新建审核员'
                }
            }
        },

        initialize: function(){
            var self = this;
            Radio.channel('heada').trigger('aaa', ['acheinfo','组织信息管理']);
            // this.staffModel = new StaffModel({id: self.id});
            // this.model2 = new NavModel();
        },
        onRender: function(){
        	var self = this;
            self.getRegion('addStaff').show(new AddStaff({
                id: self.id,
                tempModel: self.options.tempModel
            }));

            
            
        },

    });

});