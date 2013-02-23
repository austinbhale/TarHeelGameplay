/* page.js manage multiple pages in the DOM */

define(["state"], function(state) {

    // find or create an inactive page of the indicated type
    function getInactive(type) {
        var selector = 'body > .' + type + ':not(.active-page):first',
            $page = $(selector).removeClass().addClass(type).addClass('page-wrap');
        if ($page.length === 0) {
            // not found create it and add it to the body
            $page = $('<div class="' + type + ' page-wrap"></div>').appendTo('body');
        }
        return $page;
    }

    // simple minded fade transition to a new page, returns a promise that is fulfilled when the new page is active
    function transitionTo($page, options) {
        // fade out, deactive old, then activate new and fade it in
        // Update the title
        var defaults = {
            title: null,
            effect: 'fade',
            colors: false
        };
        var $def = $.Deferred();
            options = $.extend({title:null, effect:'fade'}, options),
            $oldpage = $('.active-page');
        $oldpage.fadeOut(0, function() {
            $oldpage.attr('aria-hidden', 'true');
            $oldpage.removeClass('active-page');
            $page.addClass('active-page').css('display', 'block');
            $page.attr('aria-hidden', 'false');
            $page.find('.thr-well-icon').focus();
            var title = options.title || $page.attr('data-title');
            $def.resolve($page, title);
        });
        return $def;
    }

    return {
        getInactive: getInactive,
        transitionTo: transitionTo
    };
});
