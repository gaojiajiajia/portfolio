// Instantiate Variables
var db = [];


// Make Functions
function checkLoginForm(){

	var u = $("#login-username").val();
	var p = $("#login-password").val();

	var user = db.filter(function(o){
		if(o.username!=u) return false;
		if(o.password!=p) return false;
		return true;
	})

	if(user.length) {
		console.log("yay")
		sessionStorage.userId = user[0].id;
	} else {
		console.log("boo");
		$(".login-alert").html("Login Failed");
		setTimeout(function(){
			$(".login-alert").html("");
		},2000);
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
			$.mobile.navigate("#map-page");
		}
	}
}







// Page Functions
function showMapPage(){
	if(!waitForDB(window.google,showMapPage,arguments)) return;

	map = new google.maps.Map(
		$("#map-page .map")[0],
		{
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        }
    );

}

function showListPage(){
	if(!waitForDB(db.length,showListPage,arguments)) return;

	showDataList(
		currentUser().animals,
		$("#animallist-template").html(),
		"#list-page .animallist"
		)
}

function showAnimalProfilePage(){
	if(!waitForDB(db.length,showAnimalProfilePage,arguments)) return;

	showDataList(
		[currentAnimal()],
		$("#animal-profile-template").html(),
		"#animal-profile-page .animal-info"
		);
	showDataList(
		currentAnimal().locations,
		`<div><%= lat %> x <%= lng %></div>`,
		"#animal-profile-page .animal-locations"
		);
}
 currerntAnimal().locations.forEach(
 	o=> 0.icon = currentAnimal().img)
function showProfilePage(){
	if(!waitForDB(db.length,showProfilePage,arguments)) return;

	showDataList(
		[currentUser()],
		$("#profile-template").html(),
		"#profile-page [data-role=main]"
		);
}




// Helper Functions
function currentUser(){
	return db.find(function(o){
		return o.id == sessionStorage.userId;
	})
}
function currentAnimal(){
	return currentUser().animals.find(function(o){
		return o.id == sessionStorage.animalId;
	})
}
function waitForDB(value,fn,args){
	if(!value) {
		setTimeout(function(){
			fn.apply(this,args);
		},50);
		return false;
	}
	return true;
}







// Run Code
$.ajax({
	url:"data/data.json",
	dataType:"json"
})
.done(function(d){
	console.log(d);
	db = d;
})
// Document Ready
$(function(){

	checkStorage();

	$(document)

	.on("pagecontainerbeforeshow",function(e,ui){
		console.log(ui,ui.toPage[0].id);

		switch(ui.toPage[0].id) {
			case "map-page":
				showMapPage();
				break;
			case "list-page":
				showListPage();
				break;
			case "animal-profile-page":
				showAnimalProfilePage();
				break;
			case "profile-page":
				showProfilePage();
				break;
		}
	})

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
		sessionStorage.animalId = $(this).data("id");
		$.mobile.navigate("#animal-profile-page")
	})





	// Run On Each Template
	$("[data-template]").each(function(){
		$(this).html($($(this).data("template")).html())
	})



});