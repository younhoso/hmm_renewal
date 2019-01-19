var es_step = "Expo.ease";

$(document).ready(function () {
    var bHeight = $("body").height();
    $(window).resize(function(){
        if ( $(window).width() <= 1040 ){
            $(".top-btn button").addClass("w1040")
        } else {
            $(".top-btn button").removeClass("w1040")
        }

        if ( $(window).width() >= 752 ){
            $(".mo-util-bt").fadeOut(0);
        }
    })

    var $scrollTop = $("#scroll_top");
    $(window).on("scroll", function(){
        bHeight = $("body").height();
        if( $(window).scrollTop() >= bHeight - 1170 ){
            $scrollTop.addClass("po-abs");
        } else if($(window).scrollTop() >= 90 ) {
            $scrollTop.removeClass("po-abs");
            $scrollTop.fadeIn(200);
        } else {
            $scrollTop.fadeOut(200);
        }

        if ( $(window).width() <= 752 ){
            if( $(window).scrollTop() >= bHeight - 1170 ){
                $(".mo-util-bt").fadeOut(200);
            } else if($(window).scrollTop() >= 90 ) {
                $(".mo-util-bt").fadeIn(200);
            } else {
                $(".mo-util-bt").fadeOut(200);
            }
        }
    });
    // 페이지 상단으로 가기
    $scrollTop.on("click", function() {
        TweenMax.to($("html, body"), 0.5, {scrollTop: 0, ease: es_step, onComplete:function(){
            $scrollTop.fadeOut(200);
        }});
    });

    // 퀵메뉴 오버 효과
    $(".quick-list li").on("mouseenter", function(){
        TweenMax.to( $(this).find("a"), .2, {right:0, ease:es_step});
    });
    $(".quick-list li").on("mouseleave", function(){
        TweenMax.to( $(this).find("a"), .2, {right:-141, ease:es_step});
    });

    // 평가하기 (좋아요, 최고예요 etc)
    $(".eval-wrap button").on("click", function(){
        $(this).parent("li").siblings().removeClass("active");
        $(this).parent("li").toggleClass("active");
    })

    // 댓글 열림 아코디언
    $(".reply-view-bt").on("click", function(){
        $(".view-area").slideToggle();
        $(this).toggleClass("active");

        $(".write-area").hide();
        $(".reply-write-bt").removeClass("active");

        return false;
    })
    $(".reply-write-bt").on("click", function(){
        $(".write-area").slideToggle();
        $(this).toggleClass("active");

        $(".view-area").hide();
        $(".reply-view-bt").removeClass("active");

        return false;
    })
});


var $pdimmed = $(".p-dimmed");

$(window).load(function () {
    var $btn;
    var id;
    $('.pop-btn').on('click', function (e) {
        $btn = $(this);
        id = $btn.attr('href');

        e.preventDefault();
        openLayerPopup(id, $btn);

        if ( $(window).width() <= 752 ){
            $("html, body").stop().animate({scrollTop:0},400)
        }
    });

    $(window).resize(function(){
        if ( $(window).width() >= 752 ){
            $(id).css({
                left: ($(window).width() / 2) - ($(id).outerWidth() / 2),
                top: ($(window).height() / 2) - ($(id).outerHeight() / 2) + $(window).scrollTop()
            });
        } else {
            $(id).css({
                left: ($(window).width() / 2) - ($(id).outerWidth() / 2),
                top: 50
            });
        }
    });
});

// 레이어팝업 열기
function openLayerPopup (selector, $opener) {
    var $popup = $(selector);
    var $dimmed = $('.p-dimmed');
    var $btnClose = $popup.find('.btn_close');
    var $windowWidth = $(window).width();
    var $windowHeight = $(window).height();
    var $popupWidth = $popup.outerWidth();
    var $popupHeight = $popup.outerHeight();

    $dimmed.addClass('active');

    if ( $(window).width() >= 752 ){
        $popup.css({
            left: ($windowWidth / 2) - ($popupWidth / 2),
            top: ($windowHeight / 2) - ($popupHeight / 2) + $(window).scrollTop()
        });
    } else {
        $popup.css({
            left: ($windowWidth / 2) - ($popupWidth / 2),
            top: 50
        });
    }
    $popup.show();
    $("html").css({
        height: "auto",
        overflow:"visible"
    });
    $(".m_quick_open, .m_quick_open2").css("display","none");
    // 닫기 버튼 클릭 시
    $btnClose.on('click.layerClose', function () {
        closeLayerPopup(selector, $opener);

        return false;
    });

    // 딤드 클릭 시
    $pdimmed.on("click", function(){
        closeLayerPopup(selector, $opener)
    });
}

// 레이어팝업 닫기
function closeLayerPopup (selector, $opener) {
    var $popup = $(selector);
    var $dimmed = $('.p-dimmed');
    var $btnClose = $popup.find('.btn_close');

    $popup.hide();
    $dimmed.removeClass('active');

    $btnClose.off('click.layerClose');

    //$("html").removeClass("no-scroll");

    // 레이어팝업에 포커스 못받게 처리
    $popup.removeAttr('tabindex');

    // esc를 눌렀을 때 이벤트 핸들러 제거
    $popup.off('keydown.esc');

    // 레이어를 연 버튼으로 포커스 이동
    $opener.focus();
}