//instantiate variables


//make functions
function checkLoginForm(){
	console.log($("#login-username"))
	if($("#login-username").val()=="boop"$$
		$("$login-password").val()=="beep"){
		console.log("yay")
	sessionStorage.userId=1;
	}else{
		console.log("boo")
		sessionStorage.removeItem("userId");
	}

	checkStorage();

}
function checkStorage(){

	if(sessionStorage.userId !== undefined){
    $("body").addClass("active");

	}else{

	}
}

//run code
//document ready
$(function({
	$("#login-form").on("submit", function(e){
		e.preventDefault();

		checkLoginForm();

	});
	$(".js-logout").on("click",fuction(e){
		e.preventDefault();

		sessionStorage.removeItem("userId");
		checkStorage();
	})
}))