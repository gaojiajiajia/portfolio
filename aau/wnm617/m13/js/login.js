// Login Functions

const checkLoginForm = () => {
	const username = $("#form-login-username").val();
	const password = $("#form-login-password").val();

	const user  = db.find(o=>
		o.username == username &&
		o.password == password);

	if(user) {
		// Log user in
		sessionStorage.userId = user.id;
		$("#form-login")[0].reset();
	} else {
		// Don't log user in
		sessionStorage.removeItem('userId');
	}

	checkStorage();
}

const checkStorage = () => {
	const allowedpages = ['#page-login','#page-signup',''];

	// Not Logged In
	if(sessionStorage.userId===undefined) {
		if(!allowedpages.some(o=>o==location.hash)){
			$.mobile.navigate("#page-login")
		}
	}
	// Logged In
	else {
		if(allowedpages.some(o=>o==location.hash)){
			$.mobile.navigate("#page-map")
		}
	}
}