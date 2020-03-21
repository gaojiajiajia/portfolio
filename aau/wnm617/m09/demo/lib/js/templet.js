// List Template Functions

// curried function
// const templater =
// 	tf => {
// 		return oa => {
// 			return oa.reduce((r,o,i,a)=>r+tf(o,i,a),'');
// 		}
// 	}
const templater = tf => oa =>
  (Array.isArray(oa) ? oa : [oa]).reduce((r, o, i, a) => r + tf(o, i, a), "")

const makeUserList = templater(
  (o, i, a) =>
    `
	<div>${o.name}</div>
	<div style="padding-left:1em">
		${makeAnimalList(o.animals)}
	</div>
	<hr>
	`
)

const makeAnimalList = templater(
  (o, i, a) =>
    `
	<div class="animal-item flex-parent flex-align-center" data-id="${i}">
		<div class="flex-none animal-image"><img src="${o.img}"></div>
		<div class="flex-child animal-name">${o.name}</div>
		<div class="flex-none animal-icon animal-jump">&gt;</div>
	</div>
	`
)

const makeLocationList = templater(
  (o, i, a) =>
    `
	<div class="location" data-id="${i}">
		${o.lat} x ${o.lng}
	</div>
	`
)

// console.log(makeUserList([{name:'Me'},{name:'You'}]))
