function bindAjaxEvents(target_document){
	if(!target_document){
		target_document = document;
	}
	$("[submit_binding='ajax_form']",target_document).unbind('submit', ajaxForm);	
	$("[submit_binding='ajax_form']",target_document).bind('submit', ajaxForm);
	$("[click_binding='ajax_link']",target_document).unbind('click', ajaxLink);	
	$("[click_binding='ajax_link']",target_document).bind('click', ajaxLink);
};
function ajaxForm(e){
	our_form = $(e.target);
	our_options = eval(our_form.attr('submit_options'));
	$.ajax({
		type: our_options.request_method,
		data: our_form.serializeArray(),
		dataType: 'html',
		url: our_form.attr('action'),
		beforeSend: function(XMLHttpRequest) {
			if(our_options.before_callback){
				eval(our_options.before_callback);
			};
			if(our_options.confirm) {
				return confirm(our_options.confirm);
			} else {
				return true;
			};
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			if(jquery_error_element = our_form.attr('submit_error_element')){
				switch( our_form.attr('submit_error_placement') ) {
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
			if(jquery_success_element = our_form.attr('submit_success_element')){
				switch( our_form.attr('submit_success_placement') ) {
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
			if(our_options.success_callback){
				eval(our_options.success_callback);
			};
			bindAjaxEvents();
		}
	});
	return false;
};

function ajaxLink(e){
	our_link = $(e.target);
	
	if( our_link.attr('nodeName').toUpperCase() != 'A'){
		our_link = our_link.parents('a');
	};
	
	our_options = eval("(" + our_link.attr('click_options') + ")");
	$.ajax({
		type: our_options.request_method,
		dataType: 'html',
		url: our_link.attr('href'),
		beforeSend: function(XMLHttpRequest) {
			if(our_options.before_callback){
				eval(our_options.before_callback);
			};
			if(our_options.confirm) {
				return confirm(our_options.confirm);
			} else {
				return true;
			};
			
		},
		success: function(data,textStatus) {
			if(jquery_success_element = our_link.attr('click_success_element')){
				switch( our_link.attr('click_success_placement') ) {
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
			if(our_options.success_callback){
				eval(our_options.success_callback);
			};
			bindAjaxEvents();
		}
	});
	return false;
};

$(document).ready(function() {
	bindAjaxEvents();
});
