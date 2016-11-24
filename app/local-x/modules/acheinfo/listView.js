define([
    'lodash',
    'marionette',

    'application',
    'backbone.radio',
    './listView.tpl',
    './itemView',
    './aches',
    './ache',
    // './modal/orgTreeModalView',
    'vendor/bootstrap-datepicker',
    'core/navModel',
    'vendor/simplePagination',
    'vendor/bootstrapValidator'
], function(_, Marionette, App, Radio, listViewTpl, 
    ItemView, AcheCollection, AcheModel, 
    datepicker, NavModel) {
    'use strict';


//     serviceId= 
// agencyCode=机构编码
// agencyName=机构名称
// pageNo=1
// pageSize=10

    return Marionette.CompositeView.extend({

        className: 'user-list',

        template: listViewTpl,

        regions: {
            'listDetail': '#list-header'
        },

        ui: {
            pages: '.table-pagenation',
            userName: '#search-username',
            phone: '#search-phone',
            // searchForm: '#search-bar-form',
            addUser: '#addUser',
            searchAcheForm: '#search-ache-form'
        },

        events: {
            'click #search-btn': '_search',
            'click #reset-btn': '_reset',
            // 'click #addUser': '_addUser',
            'click #add-staff': '_addStaff',
            // 'click #search-org': '_searchOrg'
            // 'blur #search-phone': '_reset2',
            // 'blur #search-username': '_reset2'
        },

        childView: ItemView,

        childViewContainer: '#list-detail',

        _reset: function(){
            // this.ui.searchAcheForm.data('bootstrapValidator').resetForm();
            // this.ui.searchAcheForm.find('input').val('');
            this.render();
        },

        initialize: function() {
            var self = this;
            this.pageSize = 10;
            this.pageNo = 1;
            // this.model = new StaffModel();
            this.navModel = new NavModel();
            this.collection = new AcheCollection();
            this.userName = '';
            this.phone = '';
            Radio.channel('listChange').on('reset', function(e){
                self._renderPage();
            });

        },

        _addStaff: function(e){
            App.Router.navigate('acheinfo/add_ache', {
                trigger: true,
            });
        },

        // _searchOrg: function(){
        //     var self = this;
        //     this.navModel.fetch({
        //         data: {
        //             serviceId: 4000330000001003,
        //             t: new Date().valueOf(),
        //         },
        //         success: function(model,msg){
        //             // self.agencyCode = model.get('agencyCode');
        //             // self.agencyName = model.get('agencyName');
        //             // self.agencyId = model.get('id');

        //             var orgModal = new OrgModal({
        //                 model: model
        //             });
                    
        //         }
        //     });
        // },

        _search: function(){
            // e.preventDefault();
            var self = this;
            var data = {};
                data.pageSize = self.pageSize;
            // self.searchData = {};
            // self.searchData.pageNo = self.pageNow;
            // self.searchData.pageSize = self.pageSize;
            var inputs = self.ui.searchAcheForm.find('input');
            _.each(inputs,function(e){
                data[$(e)[0].name] = $(e)[0].value;
            });
            // data.serviceId = 4000330000001055;
            data.pageNo = self.pageNo;
            data.timeStp =  new Date().valueOf();

            this.collection.fetch({
                type: 'POST',
                data: data,
                url: window.getApi('/getService.do?serviceId=4000330000001055'),
                success: function(models, msg){
                    var data = msg.data;
                    if(msg.code=='101'||msg.code=='102'){
                        Radio.channel('logout').trigger('logout');
                        return false;
                    }

                    if(msg.totalNum>self.pageSize){
                        self._initPagination(msg);
                    }else{
                        $('.table-pagenation2').empty();
                    }
                },
                reset: true  
            })
        },

        _initPagination: function(data) {
            var self = this,
                pageSize = self.pageSize,
                total = data.totalNum;

            $('.table-pagenation2').pagination({
                items: total,
                itemsOnPage: pageSize,
                prevText: '<b class="caret-left">上一页</b>',
                nextText: '<b class="caret-right">下一页</b>',
                displayedPages: 4,
                onPageClick: function(pageNumber, e) {
                    e.preventDefault();
                    self.pageNow = pageNumber;
                    self._renderPage();
                }
            });
        },

        _renderPage: function() {
            var self = this;
            var data = {};
                data.pageSize = self.pageSize;
                data.pageNo = self.pageNow;
            var inputs = self.ui.searchAcheForm.find('input');
            _.each(inputs,function(e){
                data[$(e)[0].name] = $(e)[0].value;
            });
            // data.serviceId = 4000330000001055;
            data.timeStp = new Date().valueOf();


            this.collection.fetch({
                data: data,
                type: 'POST',
                url: window.getApi('/getService.do?serviceId=4000330000001055'),
                success: function(model,msg) {
                    if(msg.code=='101'||msg.code=='102'){
                        Radio.channel('logout').trigger('logout');
                        return false;
                    }
                },
                reset: true
            });
        },

        onRender: function(){
            this._search();


        },

        onShow: function(){
            var self = this;

           
        },

        





        

    });

});