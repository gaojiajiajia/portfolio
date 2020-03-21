// HELPERS FUNCTIONS

// const waitForDB = fn => {
// 	if(!db.length) {
// 		console.log("trying")
// 		setTimeout(()=>fn(),150);
// 		return false;
// 	} return true;
// }

const checkData = checker =>
  new Promise((resolve, reject) => {
    const check = () => (checker() ? resolve() : setTimeout(check, 10))
    check()
  })

const getUser = id => db.find(o => o.id == id)
const getAnimal = (u, id) => u.animals.find(o => o.id == id)

const currentUser = () => getUser(sessionStorage.userId)
const currentAnimal = () => getAnimal(currentUser(), sessionStorage.animalId)

const search = (str, arr, props) => {
  let r = RegExp(str, "i")
  return arr.filter(o => {
    return props.some(p => r.test(o[p]))
  })
}
const makeFilterList = (arr, prop) => {
  return arr
    .reduce((r, a) => {
      if (!r.some(b => b == a[prop])) r.push(a[prop])
      return r
    }, [])
    .reduce((r, o) => {
      return r + `<span data-filter="${prop}" data-value="${o}">${o}</span>`
    }, "")
}

// https://codepen.io/bronkula/pen/bvrgxQ
const readFiles = (files, callback, index = 0) => {
  if (files && files[0]) {
    let file = files[index++],
      reader = new FileReader()
    reader.onload = e => {
      callback(e)
      if (index < files.length) readFiles(files, callback, index)
    }
    reader.readAsDataURL(file)
  }
}

const newId = arr => (arr.length ? arr.slice(-1)[0].id + 1 : 0)
