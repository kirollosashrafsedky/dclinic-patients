$(document).ready(function() {
    // very important - solve chrome mobile height issue -- start
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    $(window).on('resize', function() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    // very important - solve chrome mobile height issue -- end
    
    //menu 

    let menuState = "closed";

    $('#menu-toggler').on('click', function(){
        if( menuState == "closed" ){
            openMenu();
        }else{
            closeMenu();
        }
    })

    $('[data-menu="close"]').on('click', function(e){
        e.preventDefault();
        if( menuState == "opened" ){
            closeMenu();
        }
    })

    function openMenu(){
        closeSidePopup();
        $('.body-wrapper').addClass('nav-opened');
        $('#menu-toggler').addClass('nav-opened')
        menuState = 'opened';
        $('.app-content').addClass('overflow-hidden')
    }

    function closeMenu(){
        $('.body-wrapper').removeClass('nav-opened');
        $('#menu-toggler').removeClass('nav-opened')
        menuState = "closed";
        $('.app-content').removeClass('overflow-hidden')
    }

    // splash screen

    setTimeout(function(){
        $('#splash-screen').removeClass('open');
    },1000)

    //home map

    let branches = [
        {
            "branch-id": "1",
            "branch-name": "فرع مدينة نصر",
            "branch-address": "20 شارع احمد كمال متفرع من مصطفي النحاس مدينة نصر",
            "branch-location-link": "#",
            "branch-numbers": "0227365748 - 0227345362",
            "branch-position-top": "50%",
            "branch-position-left": "50%",
            "branch-color-code": "#c1a7f2"
        },
        {
            "branch-id": "2",
            "branch-name": "فرع مدينة نصر",
            "branch-address": "20 شارع احمد كمال متفرع من مصطفي النحاس مدينة نصر",
            "branch-location-link": "#",
            "branch-numbers": "0227365748 - 0227345362",
            "branch-position-top": "20%",
            "branch-position-left": "20%",
            "branch-color-code": "#64ced8"
        },
        {
            "branch-id": "3",
            "branch-name": "فرع مدينة نصر",
            "branch-address": "20 شارع احمد كمال متفرع من مصطفي النحاس مدينة نصر",
            "branch-location-link": "#",
            "branch-numbers": "0227365748 - 0227345362",
            "branch-position-top": "60%",
            "branch-position-left": "90%",
            "branch-color-code": "#f7b898"
        },
    ]

    if($('.map-section').length > 0){ //make sure we are in homepage "map-section" is available
        branches.forEach(function(branch){
            let liHtml = `
            <li class="nav-item">
                <a 
                    class="nav-link" style="background-color:${branch['branch-color-code']};"
                    href="#branch-${branch['branch-id']}">
                    ${branch['branch-name']}
                </a>
            </li>`;
            $('.map-section .nav-tabs').append(liHtml);
            let pinHtml = `
            <a class="pin" id="branch-${branch['branch-id']}" target="_blank" href="${branch['branch-location-link']}" style="top:${branch['branch-position-top']}; left:${branch['branch-position-left']};"
            data-toggle="tooltip" data-html="true" title="<p class='location-address mb-2'>${branch['branch-address']}</p><div class='d-flex'><img src='imgs/svg/home/phone.svg' alt='phone numbers' class='img-fluid ml-2'/><span class='location-numbers'>${branch['branch-numbers']}</span></div>">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44.778"
                    height="67.166"
                    viewBox="0 0 44.778 67.166"
                >
                    <path
                        d="M107.722,0a22.391,22.391,0,0,0-19.7,33.028L106.5,66.445a1.4,1.4,0,0,0,2.449,0l18.483-33.427A22.393,22.393,0,0,0,107.722,0Zm0,33.583a11.194,11.194,0,1,1,11.194-11.194A11.207,11.207,0,0,1,107.722,33.583Z"
                        transform="translate(-85.333)"
                        fill="${branch['branch-color-code']}"
                    />
                </svg>
            </a>
            `
            $('.map-wrapper').append(pinHtml)
        })

        $('.pin[data-toggle="tooltip"]').tooltip({
            placement: 'left',
            template:'<div class="tooltip pin-tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
            offset: 0,
        })

        $('.map-section .nav-tabs .nav-link').on('mouseenter', function(){
            let href = $(this).attr('href');
            $('.map-section .nav-tabs .nav-link').removeClass('active')

            $('.map-section').find(href).addClass('active').tooltip('show').attr('data-triggered-by','mouseenter');
        })

        $('.map-section .nav-tabs .nav-link').on('mouseleave', function(){
            let href = $(this).attr('href');
            if($('.map-section').find(href).attr('data-triggered-by') == 'mouseenter'){
                $('.map-section .pin').removeClass('active').tooltip('hide')

            }
        })

        $('.map-section .nav-tabs .nav-link').on('click', function(){
            let href = $(this).attr('href');
            $('.map-section').find(href).addClass('active').tooltip('show').attr('data-triggered-by','click');
            $(this).addClass('active')
        })

        $('.map-section .pin').on('show.bs.tooltip', function () {
            $('.map-section .pin').removeClass('active').tooltip('hide')
            $(this).addClass('active')
            $('.map-section .nav-tabs').find(`[href="#${$(this).attr('id')}"]`).addClass('active')
        })
        
        $('.map-section .pin').on('hide.bs.tooltip', function () {
            $('.map-section .pin').removeClass('active')
            $('.map-section .nav-tabs .nav-link').removeClass('active')
        })

    }



    const reservationSwiper = new Swiper('.reservation-swiper.swiper-container', {
        slidesPerView: "auto",
        watchSlidesVisibility: true,
        // freeMode: true,
        mousewheel: true,
        updateOnWindowResize: true,
        observer: true,
observeParents: true,
        breakpoints: {
            1200: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 3,
            }
        },
        pagination: {
            el: '.reservation-swiper .swiper-pagination',
            type: 'bullets',
            dynamicBullets: true,
            clickable: true,
          },
    });

    $('#confirmation-code-modal').on('show.bs.modal',function(){
        setTimeout(function(){
            $('.modal-backdrop').addClass('darkblue');
        },50)
    })



    //side popup
    let sidePopupState = "closed";

    function openSidePopup(el){
        // close all modals first
        $('.modal').modal('hide')
        $('.side-popup').removeClass('show');
        $('.app-content').addClass('overflow-hidden')

        setTimeout(function(){
            el.addClass('show');
            sidePopupState = "opened";
        },50)
    }

    function closeSidePopup(){
        $('.side-popup').removeClass('show');
        $('.side-popup').attr('data-opened-by','')
        sidePopupState = "close";
        $('.app-content').removeClass('overflow-hidden')
    }

    $('.close-popup').on('click', function(){
        closeSidePopup();
    });

    $("#reservation-modal input[type='radio']").on('change',function(){
        $('#reservation-modal .form-check-label').removeClass('radio-active');
        $(this).parent('label').addClass('radio-active');
        $('#reservation-modal').modal('hide');
        openSidePopup($('#reservation-side-popup'));
    })

    $('.modal').on('show.bs.modal',function(){
        $('.modal').not(this).modal('hide');
        closeSidePopup();
    })
});