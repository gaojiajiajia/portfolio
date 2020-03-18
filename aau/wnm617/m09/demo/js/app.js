let db = [];



const checkLoginForm = () => {
	const username = $("#form-login-username").val();
	const password = $("#form-login-password").val();

	const user = db.find(o=>
		o.username==username &&
		o.password==password);

	if(user) {
		sessionStorage.userId = user.id;
	} else {
		sessionStorage.removeItem("userId");
	}

	checkStorage();
}

const checkStorage = () => {
	const allowedpages = ["#page-login","#page-signup",""];

	// Not Logged in
	if(sessionStorage.userId===undefined) {
		if(!allowedpages.some(o=>o==location.hash)) {
			$.mobile.navigate("#page-login");
		}
	}
	// Logged in
	else {
		if(allowedpages.some(o=>o==location.hash)) {
			$.mobile.navigate("#page-map");
		}
	}
}




// HELPERS
const waitForDB = fn => {
	if(!db.length) {
		setTimeout(()=>fn(),150);
		return false;
	} return true;
}

const getUser = id => db.find(o=>o.id==id);
const getAnimal = (u,id) => u.animals.find(o=>o.id==id);

const currentUser = () => getUser(sessionStorage.userId);
const currentAnimal = () => getUser(currentUser(),sessionStorage.animalId);




$.ajax({
	url:'data/data.json',
	dataType:'json'
})
.done(d=>{
	console.log(d);
	db = d;
})


// Document Ready
$(()=>{

	checkStorage();

	// Event Delegate
	$(document)

	.on("pagecontainerbeforeshow",(e,ui)=>{
		console.log(e, ui, ui.toPage[0].id);

		switch(ui.toPage[0].id) {
			case "page-map":
				// do some code
				break;
			case "page-list":
				showListPage();
				break;
		}
	})

	// Form Submissions
	.on("submit","#form-login",e=>{
		e.preventDefault();

		checkLoginForm();

		e.target.reset();
		$("#form-login-username")[0].focus();
	})

	// Clicks
	.on("click",".js-logout",e=>{
		e.preventDefault();

		sessionStorage.removeItem("userId");
		checkStorage();
	})




	.on("click","[data-activate]",e=>{
		$($(e.target).data("activate"))
			.addClass("active");
	})
	.on("click","[data-deactivate]",e=>{
		$($(e.target).data("deactivate"))
			.removeClass("active");
	})
	.on("click","[data-toggle]",e=>{
		$($(e.target).data("toggle"))
			.toggleClass("active");
	})



	$("[data-template]").each((i,o)=>{
		$(o).html( $( $(o).data("template") ).html() );
	})

})