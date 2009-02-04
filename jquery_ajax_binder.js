function bindAjaxEvents(target_document){
	if(!target_document){
		target_document = document;
	}
	$("[ajax_binding='ajax_form']",target_document).unbind('submit', {element_type:'form'}, ajaxEvent);	
	$("[ajax_binding='ajax_form']",target_document).bind('submit', {element_type:'form'}, ajaxEvent);
	$("[ajax_binding='ajax_link']",target_document).unbind('click', {element_type:'link'}, ajaxEvent);	
	$("[ajax_binding='ajax_link']",target_document).bind('click', {element_type:'link'}, ajaxEvent);
};
function ajaxEvent(e){
	our_element = $(e.target);
	element_type = e.data.element_type;
	if( element_type == 'link' && (our_element.attr('nodeName').toUpperCase() != 'A') ){
		our_element = our_element.parents('a');
	};
	our_parameters = {
		type: our_element.attr('ajax_method'),
		dataType: 'html',
		beforeSend: function(XMLHttpRequest) {
			if(our_element.attr('ajax_before_callback')){
				eval(our_element.attr('ajax_before_callback'));
			};
			if(our_element.attr('ajax_confirm')) {
				return confirm(our_element.attr('ajax_confirm'));
			} else {
				return true;
			};
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			if(jquery_error_element = our_element.attr('ajax_error_element')){
				switch( our_element.attr('ajax_error_placement') ) {
					case 'after':
						$('#' + jquery_error_element).after(XMLHttpRequest.responseText);
						break;
					case 'html':
						$('#' + jquery_error_element).html(XMLHttpRequest.responseText);
						break;
					case 'before':
						$('#' + jquery_error_element).before(XMLHttpRequest.responseText);
						break;
					case 'prepend':
						$('#' + jquery_error_element).prepend(XMLHttpRequest.responseText);
						break;
					case 'append':
						$('#' + jquery_error_element).append(XMLHttpRequest.responseText);
						break;
					default:
						$('#' + jquery_error_element).html(XMLHttpRequest.responseText);
						break;
				}
			} else {
				alert(XMLHttpRequest.responseText);
			}
		},
		success: function(data,textStatus) {
			if(jquery_success_element = our_element.attr('ajax_success_element')){
				switch( our_element.attr('ajax_success_placement') ) {
					case 'after':
						$('#' + jquery_success_element).after(data);
						break;
					case 'html':
						$('#' + jquery_success_element).html(data);
						break;
					case 'before':
						$('#' + jquery_success_element).before(data);
						break;
					case 'prepend':
						$('#' + jquery_success_element).prepend(data);
						break;
					case 'append':
						$('#' + jquery_success_element).append(data);
						break;
					default:
						$('#' + jquery_success_element).html(data);
						break;
				}
			};
			if(our_element.attr('ajax_success_callback')){
				eval(our_element.attr('ajax_success_callback'));
			};
			bindAjaxEvents();
		}
	};
	switch(element_type){
		case 'form':
			our_parameters.data = our_element.serializeArray();
			our_parameters.url = our_element.attr('action');
			break;
		case 'link':
			our_parameters.url = our_element.attr('href')
			break;
	}
	$.ajax(our_parameters);
	return false;
};


$(document).ready(function() {
	bindAjaxEvents();
});
