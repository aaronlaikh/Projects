$(document).ready(function(){
	$('#works').on('click', function(){
		window.location.replace('works.html');
	});

	$('#about').on('click', function(){
		window.location.replace('about.html');
	});

	$('#contact').on('click', function(){
		window.location.replace('contact.html');
	});
	
	$('.top-name').on('click', function(){
		window.location.replace('index.html');
	});
	
	$('#condes').on('click', function(){
		$('#icont').prop('src', 'concept-design.html'); 
	});
	
	$('#illusts').on('click', function(){
		$('#icont').prop('src', 'illustration.html');
	});
});