define([
    'lodash',
    'marionette',

    'application',
    'backbone.radio',
    './listView.tpl',
    './itemView',
    './staffs',
    './staff',
    './modal/orgTreeModalView',
    'vendor/bootstrap-datepicker',
    'core/navModel',
    'vendor/simplePagination',
    'vendor/bootstrapValidator'
], function(_, Marionette, App, Radio, listViewTpl, 
    ItemView, StaffsCollection, StaffModel, 
    OrgModal, datepicker, NavModel) {
    'use strict';

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
            searchForm: '#search-bar-form',
            addUser: '#addUser',
            searchOrg: '#search-org',
            searchEForm: '#search-e-form'
        },

        events: {
            'submit #search-e-form': '_search',
            'click #reset-btn': '_reset',
            // 'click #addUser': '_addUser',
            'click #add-staff': '_addStaff',
            'click #search-org': '_searchOrg'
            // 'blur #search-phone': '_reset2',
            // 'blur #search-username': '_reset2'
        },

        childView: ItemView,

        childViewContainer: '#list-detail',

        initialize: function() {
            var self = this;
            this.pageSize = 10;
            this.model = new StaffModel();
            this.navModel = new NavModel();
            this.collection = new StaffsCollection();
            this.userName = '';
            this.phone = '';
            Radio.channel('listChange').on('reset', function(e){
                self._renderPage();
            });
            Radio.channel('getOrgVal').on('getVal', function(data){
                $('#search-org-code').val(data[0]);
                $('#search-org').val(data[0])
                // self._renderPage();
            });
        },

        _reset: function(){
            this.ui.searchEForm.find('input').val('');
            // this._search()
            // this.render();
        },

        _addStaff: function(e){
            App.Router.navigate('staffinfo/add_staff', {
                trigger: true,
            });
        },

        _searchOrg: function(){
            var self = this;
            this.navModel.fetch({
                data: {
                    serviceId: 4000330000001003,
                    timeStp: new Date().valueOf(),
                },
                success: function(model,msg){
                    // self.agencyCode = model.get('agencyCode');
                    // self.agencyName = model.get('agencyName');
                    // self.agencyId = model.get('id');

                    var orgModal = new OrgModal({
                        model: model
                    });
                    
                }
            });
        },

        _search: function(e){
            e.preventDefault();
            var self = this;
            var data = {};
                data.pageSize = self.pageSize;
            // self.searchData = {};
            // self.searchData.pageNo = self.pageNow;
            // self.searchData.pageSize = self.pageSize;
            var inputs = self.ui.searchEForm.find('input');
            var selects = self.ui.searchEForm.find('select');
            _.each(inputs,function(e){
                data[$(e)[0].name] = $(e)[0].value;
            });

            _.each(selects,function(e){
                data[$(e)[0].name] = $(e)[0].value;
            });
            // data.serviceId = 4000330000001057;
            data.t = '01';
            data.tiemStp = new Date().valueOf();
            this.collection.fetch({
                url: window.getApi('/getService.do?serviceId=4000330000001057'),
                data: data,
                type: 'POST',
                success: function(models, msg){
                    var data = msg.data;

                    if(msg.code=='101'||msg.code=='102'){
                        Radio.channel('logout').trigger('logout');
                        return false;
                    }
                    // params.type = 'POST'

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
            var inputs = self.ui.searchEForm.find('input');
            var selects = self.ui.searchEForm.find('select');
            _.each(inputs,function(e){
                data[$(e)[0].name] = $(e)[0].value;
            });

            _.each(selects,function(e){
                data[$(e)[0].name] = $(e)[0].value;
            });

            // data.serviceId = 4000330000001057;
            data.timeStp =  new Date().valueOf();
            data.t = '01';


            this.collection.fetch({
                type: 'POST',
                data: data,
                url: window.getApi('/getService.do?serviceId=4000330000001057'),
                success: function(model,msg) {
                    if(msg.code!=='00'){
                        Radio.channel('logout').trigger('logout');
                        return false;
                    }
                },
                reset: true
            });
        },

        onRender: function(){
            // this._renderUsers();
            var self = this;
            this.model.fetch({
                data: {
                    serviceId: 4000330000001014,
                    timeStp: new Date().valueOf(),
                },
                reset: true,
                success: function(model,msg){
                    if (msg.employes){
                        if (msg.employes[0]&&msg.employes[0].dictionarys){
                            $(msg.employes[0].dictionarys).each(function(){
                               self.$el.find('#gender').append("<option value='"+this.code+"'>"+this.name+"</option>");
                            });
                        }
                        if (msg.employes[1]&&msg.employes[1].dictionarys){
                            $(msg.employes[1].dictionarys).each(function(){
                                self.$el.find('#role-select').append("<option value='"+this.code+"'>"+this.name+"</option>");
                            });
                            // $('#role-select').chosen();
                        }
                    }
                    
                }
            });

        },

        onShow: function(){
            var self = this;
            this.$el.find('.input-group.date').datepicker({
                autoclose: true,
                clearBtn: true,
                language: 'zh-CN',
                format:'yyyy/mm/dd'
            });
           
        },

        

        

    });

});