$(function(){

	$(".accordion dt").on("click", function(e){
		$(this).next().slidDown()
		.siblings("dd").slideUp();
	});



	$(."tap-component.tab").on("click", function(e){
		var i = $(this).index();

		$(this).addClass("active")
		.siblings().removeClass("active");

		$(this). closest(".tapgroup")
		.find(".content").eq(i).addClass("active")
		.siblings().removeClass("active");
	})

});





//document ready
$(function(){
	$(".accordion dt").on("click",function(){
		console.log("honk")
	});
	});
