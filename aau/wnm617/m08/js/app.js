// Instantiate Variables


// Make Functions
function checkLoginForm(){

	if($("#login-username").val() == "boop" &&
		$("#login-password").val() == "beep" ) {
		console.log("yay")
		sessionStorage.userId = 1;
	} else {
		console.log("boo")
		sessionStorage.removeItem("userId");
	}

	checkStorage();
}

function checkStorage(){

	// is NOT logged in
	if(sessionStorage.userId === undefined) {
		if(
			location.hash != "#login-page" ||
			location.hash != "#signup-page" ||
			location.hash != ""
		){
			$.mobile.navigate("#login-page");
		}
	} else
	// is Logged in
	{
		if(
			location.hash == "#login-page" ||
			location.hash == "#signup-page" ||
			location.hash == ""
		){
			$.mobile.navigate("#main-page");
		}
	}
}

// Run Code
// Document Ready
$(function(){

	checkStorage();

	$(document)
	// Event Delegation
	.on("submit","#login-form",function(e){
		e.preventDefault();

		checkLoginForm();
	})
	.on("click",".js-logout",function(e){
		e.preventDefault();

		sessionStorage.removeItem("userId");
		checkStorage();
	})

	.on("click","[data-activate]",function(e){
		$($(this).data("activate")).addClass("active");
	})
	.on("click","[data-deactivate]",function(e){
		$($(this).data("deactivate")).removeClass("active");
	})


	.on("click",".animal-jump",function(e){
		$.mobile.navigate("#animal-profile-page")
	})





	// Run On Each Template
	$("[data-template]").each(function(){
		$(this).html($($(this).data("template")).html())
	})



});