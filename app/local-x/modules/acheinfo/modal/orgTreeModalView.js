define([
    'marionette',
    'backbone.radio',
    './orgTreeModalView.tpl',
    './orgCompositeView',
    'vendor/jquery.autocomplete',
    'vendor/bootstrapValidator'
], function(Marionette, Radio, template, OrgCompositeView) {
    'use strict';

    return Marionette.LayoutView.extend({

        className: 'modal fade',

        events: {
            'hidden.bs.modal': '_destroyModal',
            // 'click span.plus': '_showChild',
            'shown.bs.modal': '_shownModal',
            // 'submit #change-org-form': '_sendOrg',
            'success.form.bv': '_sendOrg',
            // 'keyup #org-name-search': '_getSugText',
        },

        regions: {
            'sectionHolder': '.section-holder'
        },

        template: template,

        ui: {
            'orgNameSearch': 'input[name="org-name-search"]'
        },


        _shownModal: function(){
            var self = this;
            self.$el.find('#change-org-form').bootstrapValidator({
                    message: '',
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        'org-name-search': {
                            validators: {
                                regexp: { 
                                    regexp: /^[^(\`\~\!\@\#\$\%\^\&\*\<\>)]+$/,
                                    message: '非法字符'
                                },
                            }
                        }
                    }
                })
        },

        initialize: function() {
            var self = this;
            Radio.channel('getOrgValAche2').on('getVal', function(e){
                self.ui.orgNameSearch.val(`${e[1]}[${e[0]}]`);
            });
            this.render();
        },

        _sendOrg: function(e){
            e.preventDefault();
            var self = this,
                tempInfo = self.ui.orgNameSearch.val();
            var _orgNameVal = tempInfo.match(/\[.*\]/)?tempInfo.match(/\[.*\]/)[0]:'',
                orgNameVal = _orgNameVal.replace(/\[|\]/g, '');
            var orgName = tempInfo.replace(_orgNameVal, '');
            Radio.channel('getOrgValAche').trigger('getVal', [orgNameVal, orgName]);
            this.$el.modal('hide');
        },

        serializeData: function() {
            // var data = this.model.toJSON();
            // return data;
        },

        onRender: function(){
            this.getRegion('sectionHolder').show(new OrgCompositeView({
                model: this.model,
                // prentAgc: 'virtual_code'
            }))
            this.$el.modal({
                show: true
            });

            var self = this;
            self.ui.orgNameSearch.autocomplete({
                serviceUrl: window.getApi('/getService.do?serviceId=4000330000001061'),
                paramName: 'agencyName',
                type: 'POST',
                transformResult: function(a){
                    var temp = $.parseJSON(a);
                    return {suggestions: temp.rows};
                }
            });
        },

        _destroyModal: function() {
            this.$el.remove();
            // $('body').removeClass('rrp-info-detail-modal-open');
        }

    });

});