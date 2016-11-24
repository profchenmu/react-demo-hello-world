define([
    'lodash',
    'marionette',
    'application',
    './detailInfos.tpl',
    'numbers',
], function(_, Marionette, App, itemViewTpl2, numeral) {
    'use strict';

    return Marionette.ItemView.extend({

        className: 'info-items',

        template: itemViewTpl2,

        initialize: function() {
            this.reportId = this.options.reportId;
        },

        serializeData: function() {
            var data = this.model.toJSON(),
                self= this,
                t = new Date().valueOf();
            data.href = window.getApi('/benefitRecordDownload.do?id=' + self.reportId + '&t=' + t);
            
            data.successDateStr = data.successDateStr||'';
            // if(data.message == 'error'){
            //     App.Router.navigate('login', {
            //         trigger: true
            //     });
            // }
            data.fundBalance = numeral(data.fundBalance).format('0,0.00');
            data.totalRemit = numeral(data.totalRemit).format('0,0.00');

            data.totalWelfare = numeral(data.totalWelfare).format('0,0.00');
            data.totalNum = data.totalNum || 0;
            data.failCount = data.failCount || 0;
            data.successNum = data.totalNum - data.failCount;
            return data;

        },

    });

});