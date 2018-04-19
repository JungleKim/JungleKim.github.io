/* global window */
(function (window, document, $) {
    'use strict';
    $(function () {
        // by default, blog menu is active unless page
        var activeMenu = $('#menu > li.active');
        if (activeMenu.length === 0) {
            activeMenu.removeClass('active');
            if ($(document.body).hasClass('page')) {
                $('#menu > li:nth-child(2)').addClass('active');
            } else {
                $('#menu > li:first-child').addClass('active');
            }
        }


        // 뒤로가기
        $('#link-back').click(function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (document.referrer && document.referrer.indexOf("junglekim.github.io") != -1) {
              window.history.back();
            } else {
              window.location.href = "https://junglekim.github.io/";
            }
        });
        //


        // 모바일 토글
        $('#search-toggle').click(function (e) {
            e.stopPropagation();
            e.preventDefault();
            window.location.href = "/search/";
        });

        $('#menu-toggle').click(function (e) {
            e.stopPropagation();
            e.preventDefault();
            if ($('#menu').is(':visible')) {
                $('#menu').hide();
            } else {
                $('#menu').show();
            }
        });
        //

        $(window).scroll(function () {
            var viewportTop = $(window).scrollTop();
            if (viewportTop) {
                var viewportBottom = viewportTop + $(window).height();
                var footerTop = $('#footer').offset().top;
                if ((footerTop <= viewportBottom) && (footerTop >= viewportTop)) {
                    // footer is visible: static above footer
                    $('#back-to-top').css({ display: 'block' });
                } else {
                    // footer is invisible: fixed on bottom-right of viewport
                    $('#back-to-top').css({ display: 'none' });
                }
            } else {
                // already top: hide
                $('#back-to-top').css({ display: 'none' });
            }
        });

        // 이미지 크게보기
        $('#post-content > p > img[alt]').replaceWith(function () {
            return '<figure>'
                + '<a href="' + $(this).attr('src') + '" class="mg-link">'
                + '<img src="' + $(this).attr('src') + '"/></a>'
                + '<figcaption class="caption">' + $(this).attr('alt') + '</figcaption>'
                + '</figure>';
        });

        $('#post-content .mg-link').magnificPopup({
            type: 'image',
            closeOnContentClick: true
        });
        //
    });
}(window, window.document, window.jQuery));
