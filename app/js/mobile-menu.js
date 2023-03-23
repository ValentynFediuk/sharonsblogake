$(function () {
    const menuBtn = $('.mobile-menu')
    const menu = $('.nav')

    menuBtn.click(function() {
        menu.toggleClass('nav--active')
        $("body").toggleClass('overflow-hidden')
        
    })

    menu.children().click(function() {
        $("body").removeClass('overflow-hidden')
        menu.removeClass('nav--active')
    })

})