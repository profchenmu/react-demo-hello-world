define([
    'backbone'
], function(Backbone) {
    'use strict';

    return Backbone.Model.extend({

        idAttribute: 'id',

        urlRoot: window.getApi('/getService.do'),

        defaults: {
			agencyCode: '',
			agencyName: '',
			consumeAmount: '',
			createdBy: '',
			createdDate: '',
			createdDateStr: '',
			currentEmploye: '',
			fundBalance: '',
			id: '',
			lastSettlementAmount: '',
			lastSettlementDate: '',
			parentCode: '',
			partnerCode: '',
			rechargeAmount: '',
			source: '',
			stat: '',
			totalEmploye: '',
			totalRemit: '',
			totalWelfare: '',
			updatedBy: '',
			updatedDate: '',
			updatedDateStr: ''
		}
    });

});