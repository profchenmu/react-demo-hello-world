define([
    'lodash',
    'marionette',
    'core/baseModel',
    'backbone.radio',
    './no-logged.tpl',
    './modal/editPasswordModalView2',
    'application',
    'core/views/root-view/logged'
    // 'notify'
    // 'core/views/sub-nav/index'
], function(_, Marionette, BaseModel, Radio, noLoggedTpl, EditPasswordModal2, App, LoggedView){

    'use strict';
    return Marionette.LayoutView.extend({
        className: 'form-holder',

        regions: {
            
        },

        ui: {
            'username': '#input-username-1',
            'password': '#input-password-1',
            'errorMsg': '.error-msg'
        },

        template: noLoggedTpl,

        initialize: function() {
            App.menuGroups = [];
            App.userGroup = '';
            App.userName = '';
            App.logged = false;
            App.options.privilegeCode = 0;
            this.model = new BaseModel();
            // this._configureEvents();
        },

        _editPassword:function(){
            new EditPasswordModal2();
        },

        onRender: function() {
            $('#main').attr('class','no-logged');
            // $('#logout').remove();
            // $('#edit-password').remove();
            window.sessionStorage.clear();
            // App.logged = window.sessionStorage.getItem('logged');
            // if(App.logged){
            //     this._login();
            // }else{
            //     window.sessionStorage.clear();
            // }
        },


        events: {
            'submit #login-form': '_validInfos',
            'click #reset-password': '_editPassword'
        },

        

        onShow: function(){
            $('.help').tooltip();
        },

        _validInfos: function(e){
        	e.preventDefault();
            if(this.ui.username.val().length < 1){
                this.ui.errorMsg.text('用户名不能为空');
                return false;
            }else if(this.ui.password.val().length < 1){
                this.ui.errorMsg.text('密码不能为空');
                return false;
            }else{
                this._loginCheck();
            }
        },

        _clearErrorMsg: function(){
            this.ui.errorMsg.empty();
        },

        _login: function(){
            if(App.logged){
                // App.baseView.render();
                var logged = new LoggedView();
                App.baseView.getRegion('rootView').show(logged);
                
                App.rootView = logged;
                App.rNum = new Date().valueOf();
                App.Router.navigate('index', {
                    trigger: true
                });
            }
        },

        _loginCheck: function(){
            var self = this,
                userName = self.ui.username.val(),
                passWord = self.ui.password.val();
            $('.btn').attr('disabled','disabled');
            App.menuGroups = [];
            App.logged = false;

            this.model.fetch({
                reset: true,
                data: {
                    userName: userName,
                    password: passWord,
                    t: new Date().valueOf()
                },
                success: function(model,msg){
                    if(msg.code == '00'){
                        App.logged = true;
                        App.userName = msg.userName;
                        App.adminFlag = msg.adminFlag;
                        window.sessionStorage.setItem('logged', App.logged);
                        window.sessionStorage.setItem('userName', App.userName);
                        window.sessionStorage.setItem('adminFlag', App.adminFlag);
                        
                        self._login();
                        $('.btn').removeAttr('disabled');
                    }else{
                        App.logged = false;
                        self.ui.errorMsg.text(msg.message);
                        $('.btn').removeAttr('disabled');
                    }
                    
                }
            });

        },

    });
});