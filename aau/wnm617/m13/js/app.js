function searchDB(arr, str, props) {
  return arr.filter(o => {
    return props.some(i => {
      return RegExp(str, "i").test(o[i])
    })
  })
}

let db = []

$.ajax({
  url: "data/data.json",
  dataType: "json"
}).done(d => {
  console.log(d)
  db = d
})

let breedsToImages = {
  Golden_Retriever: {
    img: "img/dog_icon/golden.png",
    breed: "Golden Retriever",
    id: "Golden_Retriever",
    scrollIndex: 0
  },
  Brittany: {
    img: "img/dog_icon/brittany.png",
    breed: "Brittany",
    id: "Brittany",
    scrollIndex: 200
  },
  Pharaoh_Hound: {
    img: "img/dog_icon/pharaoh.png",
    breed: "Pharaoh Hound",
    id: "Pharaoh_Hound",
    scrollIndex: 400
  },
  Australian_Cattle: {
    img: "img/dog_icon/Australian.png",
    breed: "Australian Cattle",
    id: "Australian_Cattle",
    scrollIndex: 600
  },
  Coton_De_Tulear: {
    img: "img/dog_icon/Coton%20De%20Tulear.png",
    breed: "Coton De Tulear",
    id: "Coton_De_Tulear",
    scrollIndex: 800
  },
  Dalmatian: {
    img: "img/dog_icon/dalmatian.png",
    breed: "Dalmatian",
    id: "Dalmatian",
    scrollIndex: 1000
  },
  Miniature_Schnauzer: {
    img: "img/dog_icon/miniature.png",
    breed: "Miniature Schnauzer",
    id: "Miniature_Schnauzer",
    scrollIndex: 1200
  },
  German_Shorthaired_Pointer: {
    img: "img/dog_icon/German.png",
    breed: "German Shorthaired Pointer",
    id: "German_Shorthaired_Pointer",
    scrollIndex: 1400
  },
  Basenji: {
    img: "img/dog_icon/Basenji.png",
    breed: "Basenji",
    id: "Basenji",
    scrollIndex: 1600
  },
  Bull_Terrier: {
    img: "img/dog_icon/Bull%20Terrier.png",
    breed: "Bull Terrier",
    id: "Bull_Terrier",
    scrollIndex: 1800
  },
  Alano_Espanol: {
    img: "img/dog_icon/Alano%20Espanol.png",
    breed: "Alano Espanol",
    id: "Alano_Espanol",
    scrollIndex: 2000
  },
  Pug: {
    img: "img/dog_icon/pug.png",
    breed: "Pug",
    id: "Pug",
    scrollIndex: 2200
  }
}

// Document Ready
$(() => {
  checkStorage()

  $(".slider").html(`
		<div class="slides">
			${makeAnimalSlidesList(Object.values(breedsToImages))}
		</div>
	`)

  $("#form-add-animal-breed").html(`
		${makeAnimalDropdownList(Object.values(breedsToImages))}
	`)

  $("select").on("change", function() {
    $(".slides").animate({ scrollLeft: breedsToImages[this.value].scrollIndex })
  })

  // Event Delegation
  $(document)
    .on("pagecontainerbeforeshow", (e, ui) => {
      console.log(e, ui, ui.toPage[0].id)

      switch (ui.toPage[0].id) {
        case "page-map":
          showMapPage()
          break
        case "page-list":
          showListPage()
          break
        case "dog_page-profile":
          showAnimalProfilePage()
          break
        case "page-profile":
          showUserProfilePage()
          break
      }
    })

    // Form Submissions
    .on("click", "#form-login", e => {
      e.preventDefault()
      // $.mobile.navigate("#page-map")

      checkLoginForm()
    })
    .on("submit", "#add-location-form", e => {
      e.preventDefault()

      let newid = currentAnimal().locations.length
        ? currentAnimal().locations.slice(-1)[0].id + 1
        : 0

      currentAnimal().locations.push({
        id: newid,
        lat: +$("#add-location-lat").val(),
        lng: +$("#add-location-lng").val(),
        img: "https://via.placeholder.com/400/790/fff",
        description: $("#add-location-description").val()
      })

      e.target.reset()
      showAnimalProfilePage()
    })
    .on("submit", "#edit-user-form", e => {
      e.preventDefault()

      currentUser().name = $("#edit-user-name").val()
      currentUser().email = $("#edit-user-email").val()
      currentUser().password = $("#edit-user-password").val()

      showUserProfilePage()
    })

    .on("input", "#page-list .search", e => {
      console.log(e.target.value)
      let result = search(e.target.value, currentUser().animals, [
        "name",
        "size",
        "breed"
      ])
      console.log(result)
      showListPage(result)
    })

    // Clicks
    .on("click", ".js-logout", e => {
      e.preventDefault()
      sessionStorage.removeItem("userId")
      checkStorage()
    })
    .on("click", ".animal-jump", e => {
      sessionStorage.animalId = $(e.target).data("id")
      $.mobile.navigate("#page-animal-profile")
    })
    .on("click", ".edit-user", e => {
      $("#edit-user-form .modal-body").html(makeEditUserTemplate(currentUser()))
    })
    .on("click", ".rem-animal", e => {
      currentUser().animals = currentUser().animals.filter(
        o => o.id != $(e.target).data("id")
      )
      $.mobile.navigate("#page-list")
    })

    .on("click", "[data-filter]", e => {
      console.log("hi data-filter")

      // console.log(e.target.value);
      let result = search($(e.target).data("value"), currentUser().animals, [
        $(e.target).data("filter")
      ])
      // console.log(result)
      showListPage(result)
    })

    // <div data-activate="#form-login">
    .on("click", "[data-activate]", e => {
      $($(e.target).data("activate")).addClass("active")
    })
    .on("click", "[data-deactivate]", e => {
      $($(e.target).data("deactivate")).removeClass("active")
    })
    .on("click", "[data-toggle]", e => {
      $($(e.target).data("toggle")).toggleClass("active")
    })

  $("[data-template]").each((i, o) => {
    $(o).html($($(o).data("template")).html())
  })
})
