define([
    'backbone'
], function(Backbone) {
    'use strict';

    return Backbone.Model.extend({

        idAttribute: 'id',

        url: window.getApi('/getService.do'),

        defaults: {
        	agencyCode: '',
        	agencyName: '',
        	id: ''
        },

        parse: function(res) {
        	return res.code=='00' ? res.agency: {}
        }

    });

});