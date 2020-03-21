// peterchangsite.com
$(function() {
  $(window).load(function() {
    $("body").show()
  })

  $(".link").click(function(e) {
    e.preventDefault()
    $link = $(this).attr("href")
    $("body").fadeOut(800, function() {
      window.location = $link
    })
  })

  $("img").addClass("lazy")

  $("img").bind("dragstart", function() {
    return false
  })

  $(window).scroll(function() {
    if ($(window).scrollTop() > 200) {
      $(".go_top").css("display", "block")
    } else {
      $(".go_top").fadeOut(500, function() {
        $(".go_top").css("display", "none")
      })
    }
  })

  $(".go_top").on("click", function() {
    $("html,body").animate({ scrollTop: $(".header_space").offset().top }, 500)
  })

  $(".lazy").lazy()
})
