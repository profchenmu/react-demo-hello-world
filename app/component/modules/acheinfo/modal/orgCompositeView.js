import _ from 'lodash';
import Marionette from 'marionette';
import App from 'application';
import sectionTpl from './orgCompositeView.tpl';
import Radio from 'backbone.radio';
import setionItem from './sectionItemView'
import orgs from './orgs'

export default Marionette.CompositeView.extend({
	className: 'section',

    template: sectionTpl,

    childView: setionItem,

    childViewContainer: '.section-in',

    initialize: function() {
        this.collection = new orgs();
    },

    onRender(){
    	var self = this;
    	this.collection.fetch({
    		data: {
    			serviceId: 4000330000001059,
    			agencyCode: self.options.prentAgc
    		},

    		success(collection){
    		}
    	})
    },

    serializeData: function() {
        // var data = this.model.toJSON();
        // return data;
    },
});