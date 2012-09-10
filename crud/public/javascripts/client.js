$(function() {
	var $document = $(document);
	
	$document.on('submit', '#tweetForm', function(ev) {
		var textarea = $('#tweetForm').find('textarea');
		$.ajax({
			url: '/tweet',
			type: 'POST',
			dataType: 'json',
			data: {text: textarea.val()}
		}).done(function(res) {
			if (res.status === 'fail') {
				return;
			}
			textarea.val('');
			
		}).fail(function() {

		});
		return false;
	});
	
	$document.on('click', 'span.edit', function(ev) {
		var target = $(this).parent();
		var deleteLink = target.find('span.postDelete');
		var displayText = target.find('span.text');
		var originalText = displayText.text();
		target.prepend('<input type="text" name="text" value="' + displayText.text() + '" />');
		deleteLink.before('<input type="button" name="postUpdate" value="update" />');
		deleteLink.before('<input type="button" name="endEdit" value="end" />');
		deleteLink.after('<input type="hidden" name="originalText" value="' + originalText + '" />');
		displayText.hide();
		$(this).hide();
	});
	
	$document.on('click', 'input[name=endEdit]', function(ev) {
		
	});
	
	$document.on('click', 'span.update', function(ev) {
		var target = $(this).parent();
		var id = target.find('input[name=_id]').val();
		$.ajax({
			url: '/update',
			type: 'POST',
			dataType: 'json',
			data: {_id: id, text: target.find('input[name=text]').val()}
		}).done(function(res) {
			
		}).fail(function() {
		
		});
	});
	
	$document.on('click', 'span.postDelete', function(ev) {
		var target = $(this).parent();
		var id = target.find('input[name=_id]').val();
		$.ajax({
			url: '/delete',
			type: 'POST',
			dataType: 'json',
			data: {_id: id}
		}).done(function(res) {
			target.remove();
		}).fail(function() {
		
		});
	});
});