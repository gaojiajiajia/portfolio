

// function templater(tf) {
// 	return function(oa) {
// 	}
// }

// Currying
// tf = templatefunction, oa = objectarray
const templater = tf => oa =>
	(Array.isArray(oa)?oa:[oa])
	.reduce((r,o,i,a)=>r+tf(o,i,a),'');

// javascript backtick template literals
const makeUserList = templater(o=>`
	<div class="user">
		<div class="user-name">${o.name}</div>
	</div>
`);
const makeAnimalList = templater(o=>`

	      <a href="#dog_page-profile" data-id="${o.id}">
            <div class="card_list flex-parent flex-align-center animal-jump" data-id="${o.id}">
                <div style="flex: 25%;" data-id="${o.id}">
                    <img src="${o.img}" class="dog-icon" alt="dog_img" data-id="${o.id}">
                </div>
                <div style="flex: 65%; padding-left: 2em;" data-id="${o.id}" >
                        <span class="large_title" data-id="${o.id}">${o.name}<br>
                        <span class="small_title" data-id="${o.id}">${o.breed}</span><br>
                </div>
                <div class="flex-none list-button" data-id="${o.id}">&gt;</div>
                              
            </div>
          </a>
`);
const makeLocationsList = templater(o=>`
	<div class="location" style="padding-left:1em">
		${o.lat} x ${o.lng}
	</div>
`);


// single dog profile---------------------------------------------------------------------------------------------
const makeAnimalProfile = templater(o=>`

	            <div class="flex-wrap fill-parent-height">
                    <div class="dog_single_profile">
                        <div class="flex-none fill-parent-height">                   
                            <div>${makeDogProfileImage(o)}</div>
                        </div>
                        <div class="flex-child" style="padding-top: 10px;">
                            <div class="dog_name" style="text-align:center;">Name: ${o.name}</div>
                            <div class="dog_breed" style="text-align:center;">Breed: ${o.breed}</div>
                            <div class="dog_location" style="text-align:center;">Locations: ${o.locations.length}</div>
                        </div>
                    </div>
                </div>
`);


	// <div class="flex-parent">
	// 	<div>${makeProfileImage(o)}</div>
	// 	<br>
	// 	<div class="flex-child">
	// 		<strong>Name: ${o.name}</strong><br>
	// 		<light>Breed: ${o.breed}</light><br>
	// 		<light>Size: ${o.size}</light><br>
	//         <light>Locations: ${o.locations.length}</light><br>
	// 	</div>
	// </div>

//user profile page connects to HTML------------------------------------------------------------------------------

const makeUserProfile = templater(o=>`
	        
              <div class="avatar">
                ${makeProfileImage(o)}                
              </div>
              <h2>${o.name}</h2>
              <h4>${o.email}</h4>
              <h4>Animals:${o.animals.length}</h4>
              <p>Dogs are our best friend for good reason; To sit with a dog on a hillside on a glorious afternoon is to be back in Eden, where doing nothing was not boring - it was peace.</p>
              <a href="#" class="js-logout ui-link" style="color: coral;">Logout</a>
           

`);

const makeProfileImage = templater(o=>`
	<div class="profile-image">
	<img src="${o.img}"></div>
`);

const makeDogProfileImage = templater(o=>`
	<div class="dog_profile-image">
	<img src="${o.img}" style="padding-left: 10%;"></div>
`);


// dog details in map page--------------------------------------------------------------------------------------------
const makeMapInfoTemplate = templater(o=>`
<div class="flex-parent">
	<div>
		<img src="${o.img}" style="width:75px">
	</div>
	<div style="padding-left:0.5em">
		<strong>${o.name}</strong><br>
		<strong>Breed</strong> ${o.breed}<br>
		<strong>Locations</strong> ${o.locations.length}<br>
	</div>
</div>
`);

const makeAnimalMapInfoTemplate = templater(o=>`
<div class="flex-parent">
	<div>
		<img src="${o.icon}" style="width:75px">
	</div>
	<div style="padding-left:0.5em">
		<strong>Coordinates</strong> ${o.lat} X ${o.lng}<br>
	</div>
</div>
`);

const makeAnimalSlidesList = templater(o=>`
    <div id="slide">
      <img src=${o.img} class="img_slide" style="width: 60%">
    </div>
`);

const makeAnimalDropdownList = templater(o=>`
	<option data-index=${o.scrollIndex} value=${o.id}>${o.breed}</option>
`);

