$(document).ready(function(){
	console.log("loading page");

//	window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

//	window.requestFileSystem(type, size, successCallback, opt_errorCallback)
//	window.requestFileSystem(window.TEMPORARY, 1*1024*1024, onInitFs);
	$.ajax({
		url: "./",	
	}).done(function(){
		console.log("done");
	});
});

function onInitFs(fs){
	console.log("opened file system: " + fs.name);
}