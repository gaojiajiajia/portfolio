// SHOW PAGE FUNCTIONS

// const showListPage = async () => {
// 	await checkData(()=>db.length);

// 	$("#page-list [data-role='main']")
// 		.html(makeAnimalList(currentUser().animals));
// }

const showListPage = async (arr) => {
	await checkData(()=>db.length);

	arr = arr||currentUser().animals;

	$("#page-list .filterbox")
		.html(!arr.length?"No animals. Add one?":
			`<div class="filterlist">
			<span data-filter="breed" data-value="">All</span> |
			${makeFilterList(arr,'size')} | 
			${makeFilterList(arr,'gender')}
			</div>`)

	$("#page-list [data-role='main']")
		.html(makeAnimalList(currentUser().animals));
}




const showMapPage = async () => {
	await checkData(()=>db.length);

	let locs = currentUser().animals.map((animal)=>{
		let animalLoc = animal.locations.slice(-1)[0];
		animalLoc.icon = animal.img;
		animalLoc.animalId = animal.id;
		return animalLoc;
	});

	// console.log(db,window.google)
	showMap(
		locs,
		"#page-map .map",
		t=>{
			const tm = $(t);

			tm.data("markers").forEach((o,i)=>{
				o.addListener("click",e=>{
					// console.log(o,e);
					// $("#page-map .menu").addClass("active")

					tm.data("infoWindow")
						.setContent(
							makeMapInfoTemplate(
								getAnimal(
									currentUser(),
									locs[i].animalId
								)
							)
						);
					tm.data("infoWindow")
						.open(tm[0],o)
				});
			});
		}
	);
}


const showAnimalProfilePage = async () => {
	await checkData(()=>db.length);

	$("#dog_page-profile h1")
		.html(currentAnimal().name);
		
	$("#dog_page-profile .dog-profile-top")
		.html(makeAnimalProfile(currentAnimal()));

	let locs = currentAnimal().locations.map((location)=>{
		let animalLoc = location;
		animalLoc.icon = currentAnimal().img;
		animalLoc.animalId = currentAnimal().id;
		return animalLoc;
	});

	showMap(
		locs,
		"#dog_page-profile .map",
		t=>{
			const tm = $(t);

			tm.data("markers").forEach((o,i)=>{
				o.addListener("click",e=>{
					// console.log(o,e);
					// $("#page-map .menu").addClass("active")
					tm.data("infoWindow")
						.setContent(
							makeAnimalMapInfoTemplate(
								locs[i]
							)
						);
					tm.data("infoWindow")
						.open(tm[0],o)
				});
			});
		}
	);
}

const showUserProfilePage = async () => {
	await checkData(()=>db.length);

	$(".user-profile")
		.html(makeUserProfile(currentUser()));
}



// const showMapPage = async () => {
//     // if(!waitForDB(showMapPage)) return false;
//     await checkData(()=>db.length);

//     let locs = currentUser().animals.reduce((r,o)=>{
//         if(o.locations.length) {
//             let last = o.locations.slice(-1)[0];
//             last.icon = o.img;
//             last.animalId = o.id;
//             r.push(last);
//         }
//         return r;
//     },[])

//     showMap(
//         locs,
//         "#page-map .map",
//         t=>{
//             console.log(t);
//             let tm = $(t);

//             tm.data("markers").forEach((o,i)=>{

//                 let animal = getAnimal(
//                     currentUser(),
//                     locs[i].animalId);

//                 o.addListener("click",e=>{
//                     // console.log(e);

//                     tm.data("infoWindow")
//                         // ${locs[i].lat} x ${locs[i].lng}<br>

//                         .setContent(`
//                         <div class="flex-parent animal-jump" data-id="${animal.id}">
//                         <div class="noclick">
//                             <img src="${animal.img}" style="width:75px">
//                         </div>
//                         <div class="noclick" style="padding-left:1em">
//                             <strong>${animal.name}</strong><br>
//                             <strong>Type</strong> ${animal.type}<br>
//                             <strong>Breed</strong> ${animal.breed}<br>
//                             <strong>Locations</strong> ${animal.locations.length}
//                         </div>
//                         </div>
//                         `);

//                     tm.data("infoWindow")
//                         .open(tm[0],o);

//                     // $("#page-map .menu").addClass("active")
//                 })
//             })
//         }
//     );
// }




// const showAnimalProfilePage = async () => {
//     await checkData(()=>db.length);


//     $("#page-animal-profile .animal-profile-top")
//         .html(makeAnimalProfile(currentAnimal()));

//     showMap(
//         currentAnimal().locations.map(o=>{
//             o.icon = currentAnimal().img;
//             return o;
//         }),
//         "#page-animal-profile .map",
//         t=>{
//             console.log(t);
//             let tm = $(t);

//             tm.data("map").addListener("click",e=>{
//                 console.log(e.latLng.lat(),e.latLng.lng());
//                 console.log("center of map",tm.data("map").getCenter())

//                 $("#add-location-lat").val(e.latLng.lat());
//                 $("#add-location-lng").val(e.latLng.lng());
//                 $("#add-location-modal").addClass("active");
//             })

//         }
//     );
// }




// const showUserProfilePage = async () => {
//     await checkData(()=>db.length);

//     console.log("User Profile Page");
//     $(".user-profile")
//         .html(makeUserProfile(currentUser()))
// }