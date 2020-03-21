// Page Show Functions

const showListPage = () => {
  if (!waitForDB(showListPage)) return

  // console.log("Page Loading",db)
  $("#page-list [data-role='main']").html(makeAnimalList(currentUser().animals))
}
