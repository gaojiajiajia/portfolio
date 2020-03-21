// Instantiate Variables
var db = []

// Make Functions
function checkLoginForm() {
  var u = $("#login-username").val()
  var p = $("#login-password").val()

  var user = db.filter(function(o) {
    if (o.username != u) return false
    if (o.password != p) return false
    return true
  })
  // o = current object
  // i = current index
  // a = current array

  if (user.length) {
    console.log("yay")
    sessionStorage.userId = user[0].id
  } else {
    console.log("boo")
    $(".login-alert").html("Login Failed")
    setTimeout(function() {
      $(".login-alert").html("")
    }, 2000)
    sessionStorage.removeItem("userId")
  }

  // if($("#login-username").val() == "boop" &&
  // 	$("#login-password").val() == "beep" ) {
  // 	console.log("yay")
  // 	sessionStorage.userId = 1;
  // } else {
  // 	console.log("boo")
  // 	sessionStorage.removeItem("userId");
  // }

  checkStorage()
}

function checkStorage() {
  // is NOT logged in
  if (sessionStorage.userId === undefined) {
    if (
      location.hash != "#login-page" ||
      location.hash != "#signup-page" ||
      location.hash != ""
    ) {
      $.mobile.navigate("#login-page")
    }
  }
  // is Logged in
  else {
    if (
      location.hash == "#login-page" ||
      location.hash == "#signup-page" ||
      location.hash == ""
    ) {
      $.mobile.navigate("#map-page")
    }
  }
}

// Page Functions

function showMapPage() {
  if (!waitForDB(db.length, showMapPage, arguments)) return
  var lastLocArr = []

  currentUser().animals.forEach(o => {
    let lastloc = o.locations.slice(-1)[0]
    // slice(-1) returns the last item from an array
    // slice(-1)[0] gets the first item, which is the last item above

    if (lastloc) {
      lastloc.icon = o.img
      lastloc.animalId = o.id
      lastLocArr.push(lastloc)
    }
  })

  showMap(lastLocArr, "#map-page .map", function(targetMap) {
    // targetMap shows up the markers of animals' last location
    console.log(targetMap.data())

    targetMap.data("markers").forEach((o, i) => {
      o.addListener("click", e => {
        // Google method to do something regarding to a click
        console.log(o, i, e)

        targetMap
          .data("infoWindow")
          .setContent(
            showDataList(
              [animalById(lastLocArr[i].animalId)],
              $("#map-animal-template").html()
            )
          )

        targetMap.data("infoWindow").open(targetMap, o)
      })
    })
  })
}

function showListPage() {
  if (!waitForDB(db.length, showListPage, arguments)) return

  showDataList(
    currentUser().animals,
    $("#animallist-template").html(),
    "#list-page .animallist"
  )
}

//arguments = what values passed in a function
//fn.apply = put values seperately from a array into the function
//js vs jquery selections are different
//whenver you use API, you need to use js selections, jquery does not work

function showAnimalProfilePage() {
  if (!waitForDB(db.length, showAnimalProfilePage, arguments)) return

  showDataList(
    [currentAnimal()],
    $("#animal-profile-template").html(),
    "#animal-profile-page .animal-info"
  )

  showDataList(
    currentAnimal().locations,
    `<div><%= lat %> x <%= lng %></div>`,
    "#animal-profile-page .animal-locations"
  )

  // currentAnimal().locations.forEach(function(o){
  // 	return true;
  // })
  currentAnimal().locations.forEach(o => (o.icon = currentAnimal().img))

  showMap(currentAnimal().locations, "#animal-profile-page .map", function(
    targetMap
  ) {
    if (!targetMap.data("hasClick")) {
      targetMap.data("hasClick", true)
      targetMap.data("map").addListener("click", e => {
        console.log(e.latLng.lat(), e.latLng.lng())
        console.log("center of map", targetMap.data("map").getCenter())

        $("#add-location-lat").val(e.latLng.lat())
        $("#add-location-lng").val(e.latLng.lng())

        $("#add-location-modal").addClass("active")
      })
    }

    targetMap.data("markers").forEach((o, i) => {
      o.addListener("click", e => {
        console.log(o, i, e)

        targetMap.data("infoWindow").setContent(`
						${o.position.lat()} x
						${o.position.lng()}
					`)
        targetMap.data("infoWindow").open(targetMap, o)
      })
    })
  })
}

function showProfilePage() {
  if (!waitForDB(db.length, showProfilePage, arguments)) return

  showDataList(
    [currentUser()],
    $("#profile-template").html(),
    "#profile-page [data-role=main]"
  )
}

// MAPS
function showMap(arr, target, fn) {
  if (!waitForDB(window.google, showMap, arguments)) return

  //maps api examples use a "map" variable
  //we use a $(target).data("map")
  if (!$(target).data("map")) {
    $(target).data({
      map: new google.maps.Map($(target)[0], {
        center: {
          lat: 37.749876,
          lng: -122.442401
        },
        zoom: 11
      }),
      infoWindow: new google.maps.InfoWindow({
        content: ""
      })
    })
  }

  if ($(target).data("markers")) {
    for (let i in $(target).data("markers")) {
      $(target)
        .data("markers")
        [i].setMap(null)
    }
  }

  removeMarkers(target)

  let bounds = new google.maps.LatLngBounds(null)
  for (let i in arr) {
    let marker = new google.maps.Marker({
      position: arr[i],
      map: $(target).data("map"),
      icon: {
        url: arr[i].icon,
        scaledSize: {
          width: 40,
          height: 40
        }
      }
    })
    $(target)
      .data("markers")
      .push(marker)
    bounds.extend(marker.getPosition())
  }
  setTimeout(() => {
    $(target)
      .data("map")
      .fitBounds(bounds)
    if (fn) fn($(target))
  }, 150)

  // it finds the last location of the animals
}
// html element of map and use jquery method to apply google objects on html elements

function removeMarkers(target) {
  if ($(target).data("markers")) {
    for (let i in $(target).data("markers")) {
      $(target)
        .data("markers")
        [i].setMap(null)
    }
  }

  $(target).data("markers", [])
}

// Helper Functions
function currentUser() {
  return db.find(function(o) {
    //find returns one object, not an array
    //filter finds one array and still keep looking for the rest
    return o.id == sessionStorage.userId
  })
}

function currentAnimal() {
  return currentUser().animals.find(function(o) {
    return o.id == sessionStorage.animalId
  })
}

function animalById(id) {
  return currentUser().animals.find(function(o) {
    return o.id == id
    // this is the id of the animals
  })
}

function waitForDB(value, fn, args) {
  if (!value) {
    setTimeout(function() {
      fn.apply(this, args)
    }, 50)
    return false
  }
  return true
}

// Run Code
$.ajax({
  url: "data/data.json",
  dataType: "json"
}).done(function(d) {
  console.log(d)
  db = d
})

// Document Ready
$(function() {
  checkStorage()

  //jquery selections are technically arraies of js selections
  //use arrady index notition of the jquery selections to choose the js selection
  //jquery mobile use e and ui as two variables to retrive data from the database
  //ui refers to the previous page and the page we are going to that are linked by the same index

  $(document)
    .on("pagecontainerbeforeshow", function(e, ui) {
      console.log(ui, ui.toPage[0].id)

      switch (ui.toPage[0].id) {
        case "map-page":
          showMapPage()
          break
        case "list-page":
          showListPage()
          break
        case "animal-profile-page":
          showAnimalProfilePage()
          break
        case "profile-page":
          showProfilePage()
          break
      }
    })

    // Event Delegation

    //Forms
    .on("submit", "#login-form", function(e) {
      e.preventDefault()

      checkLoginForm()
    })
    .on("submit", "#add-location-form", function(e) {
      e.preventDefault()

      currentAnimal().locations.push({
        id: currentAnimal().locations.length,
        lat: +$("#add-location-lat").val(),
        lng: +$("#add-location-lng").val(),
        description: $("#add-location-description").val(),
        date: new Date()
      })

      $("#add-location-modal").removeClass("active")
      showAnimalProfilePage()
    })

    //Clicks

    .on("click", ".js-logout", function(e) {
      e.preventDefault()

      sessionStorage.removeItem("userId")
      checkStorage()
    })

    .on("click", "[data-activate]", function(e) {
      $($(this).data("activate")).addClass("active")
    })
    .on("click", "[data-deactivate]", function(e) {
      $($(this).data("deactivate")).removeClass("active")
    })

    .on("click", ".animal-jump", function(e) {
      sessionStorage.animalId = $(this).data("id")
      $.mobile.navigate("#animal-profile-page")
    })

  // Run On Each Template
  $("[data-template]").each(function() {
    $(this).html($($(this).data("template")).html())
  })
})
