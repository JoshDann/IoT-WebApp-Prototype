
const modalWrapper = document.getElementById("help_modal_wrapper")
const modal = document.getElementById("help_modal")
const showModal = document.getElementById("btn_showModal")




modalWrapper.addEventListener( "click", (ev) => {
    if ( ev.target === modal ) return
    modalWrapper.style.display = "none"
} )

showModal.addEventListener( "click", (ev) => {
    modalWrapper.style.display = "flex"
} )


