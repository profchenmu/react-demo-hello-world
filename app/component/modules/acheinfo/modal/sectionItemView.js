import _ from 'lodash';
import Marionette from 'marionette';
import App from 'application';
import Radio from 'backbone.radio';
import setionItem from './sectionItemView.tpl';
import childrenCompositeView from './orgCompositeView'

export default Marionette.ItemView.extend({
	className: 'item',

    template: setionItem,

    events: {
    	'click span.expand': '_showChildren',
        'click input.org-group': '_triggerInput'

    	// 'click span.expanded': '_hideChildren'
    },

    serializeData: function() {
    	
        let data = this.model.toJSON();
        
        return data;
    },

    onRender(){
    	$('span.expanded').on('click', function(){
    		var $setionHolder = $(this).parent('.item').children('.section-holder'),
    			$this = $(this);
    		$setionHolder.slideUp(function(){
    			$this.addClass('expand').removeClass('expanded');
    			$this.addClass('icon-plus').removeClass('icon-minus');
    			
    		});
    		
    	})
    },

    _triggerInput(e){
        var tempVal = $(e.target).val(),
            tempText = $(e.target).next('label').text();
        Radio.channel('getOrgValAche2').trigger('getVal', [tempVal, tempText]);
    },

    _showChildren(e){
    	var $sectionHolder = $(e.target).parent('.item').children('.section-holder');
    	if($sectionHolder.is(':empty')){
    		let childrenSection = new childrenCompositeView({
	    		prentAgc: $(e.target).data('parent')
	    	});
	    	$sectionHolder.html(childrenSection.render().$el);
	    	setTimeout(function(){
				$sectionHolder.slideDown();
	    	},100);
	    	
	    	
    	}else{
    		$sectionHolder.slideDown();
    	}
    	$(e.target).addClass('expanded').removeClass('expand');
    	$(e.target).addClass('icon-minus').removeClass('icon-plus');
		
    },

    _hideChildren(e){
    	// var $sectionHolder = $(e.target).parent('.item').children('.section-holder');
    	// $(e.target).parent('.item').text('caocao');
    	// if($sectionHolder.is(':empty')){
    		
    	// }else{
    	// 	$sectionHolder.hide();
    	// }
    	// $sectionHolder.hide();
    	// $(e.target).addClass('expand').removeClass('expanded');
    }
});