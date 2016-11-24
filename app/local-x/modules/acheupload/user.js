define([
    'backbone'
], function(Backbone) {
    'use strict';

    return Backbone.Model.extend({

        idAttribute: 'batchId',

        // urlRoot: window.getApi('/getService.do'),

        defaults: {
        	batchId: '',
            importTime: '',
            processMsg: '',
            agencyCode: '',
            agencyName: '',
            parentCode: '',
            dealStatus: '',
            dealMsg: '',
            ecode: '',
            name: '',
            gender: '',
            mobile: '',
            orgId: '',
            job: '',
            hireDateStr: '',
            id: ''

        }
    });

});