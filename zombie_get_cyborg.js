var Browser = require("zombie");
var assert = require("assert");
var $ = require("cheerio");


//Load the gateway
//

var repeateme = function(){
		var browser = Browser.create();
		browser.visit('http://10.0.0.1', function(err){
		var html_doc = browser.resources[0].response.body;
		//console.log(html_doc);
		
		var parsed_html = $.load(html_doc);
		console.log(parsed_html('h1').text());
		if (parsed_html('h1').text() == "Login"){
			console.log("In login");
			browser.fill('username', 'admin')
			.fill('password', 'password')
			.pressButton('Login', function(error){
				if (error){}
				var html_doc = browser.resources[0].response.body;
				var parsed_html = $.load(html_doc);
				find_my_phone(parsed_html);
			});
		}
		else{
			find_my_phone(parsed_html);
		}
	});
}

var find_my_phone = function(parsed_html){
	tmp = parsed_html('.form-row')	
	for ( i = 2; i < tmp.length; i++){
		computer = (tmp[i]['children'][2]['children'][0]['data']);
		if(computer == 'android-f3c4335b8a6a32f Computer' ){
			console.log('Found it');
			if(tmp[i]['attribs']['class'] == 'form-row  off'){
				console.log("Your android is not connected to the router");
			} else {
				console.log("It is connected to the router");
			}
		}
	}
}

repeateme();
