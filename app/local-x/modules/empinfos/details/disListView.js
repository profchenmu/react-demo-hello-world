define([
    'lodash',
    'marionette',
    'backbone.radio',
    './itemView',
    './disListView.tpl',
    '../users'
    // './detailInfos',
    // 'backbone.radio'
], function(_, Marionette, Radio, ItemView, DisListViewTpl, DisCollection) {
    'use strict';

    return Marionette.CompositeView.extend({

        regions: {
            'listDetail': '#list-header'
        },

        ui: {
            pages: '.table-pagenation'
        },

        template: DisListViewTpl,

        childView: ItemView,

        childViewContainer: '#list-detail2',

        onRender: function(){
            this._renderUsers();
        },

        initialize: function() {
            var self = this;
            this.pageSize = 10;
            this.pageNow = 1;
            this.collection = new DisCollection();
            
        },

        _renderUsers: function(){
            var self = this;

            if (this.fetchRequest) {
                this.fetchRequest.abort();
                this.fetchRequest = null;
            }

            this.fetchRequest = this.collection.fetch({
                reset: true,
                data: {
                    serviceId: 4000330000001037,
                    t: new Date().valueOf(),
                    batchId: self.id,
                    pageNo: 1,
                    pageSize: self.pageSize
                },
                success: function(models, msg){
                    var data = msg;
                    if(msg.code!=='00'){
                        Radio.channel('logout').trigger('logout');
                        return false;
                    }
                    if(data.totalNum>self.pageSize){
                        self._initPagination(msg);
                    }
                }
            });
        },

        _initPagination: function(data) {
            var self = this,
                pageSize = self.pageSize,
                total = data.totalNum;

            $('.table-pagenation').pagination({
                items: total,
                itemsOnPage: pageSize,
                prevText: '<b class="caret-left">上一页</b>',
                nextText: '<b class="caret-right">下一页</b>',
                displayedPages: 4,
                onPageClick: function(pageNumber, e) {
                    e.preventDefault();
                    self._renderPage(pageNumber);
                }
            });
        },

        _renderPage: function(pageNumber) {
            var self = this;
            this.pageNow = pageNumber;

            return this.collection.fetch({
                data: {
                    serviceId: 4000330000001037,
                    t: new Date().valueOf(),
                    batchId: self.id,
                    pageNo: self.pageNow,
                    pageSize: self.pageSize
                },
                success: function(model,msg) {
                    if(msg.code!=='00'){
                        Radio.channel('logout').trigger('logout');
                        return false;
                    }
                },
                reset: true
            });
        },
    });

});