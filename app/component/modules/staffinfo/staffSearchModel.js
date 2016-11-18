define([
    'backbone'
], function(Backbone) {
    'use strict';

    return Backbone.Model.extend({

        idAttribute: 'id',

        urlRoot: window.getApi('/getService.do'),

        defaults: {
        	birthday: '',
			createdBy: '',
			createdDateStr: '',
			ecode: '',
			gender: '',
			hireDate: '',
			hireDateStr: '',
			id: '',
			job: '',
			mobile: '',
			name: '',
			orgId: '',
			partnerCode: '',
			stat: '',
			updatedDate: '',
			updatedDateStr: ''
        }

    });

});