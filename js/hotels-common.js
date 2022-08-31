updateCountData();
let countitems = $('.h1-def').data('count');
$('#reservation-form').submit(function () {
    let url = $(this).attr('action');
    let data = $(this).serialize();
    let target = $(this).attr('target');

    $.post(url, data, function (response) {
        if (response.url) {
            if (target === '_blank') {
                window.open(response.url, '_blank').focus();
            } else {
                window.location.href = response.url;
            }
        }
    });

    return false;
});

$(document).on('input', '.search-text', function () {
    let url = $('#reservation-form').data('url');
    let q = $(this).val();

    $.get(url, {q: q}, function (response) {
        if (response) {
            let html = "";
            $.each(response, function (i, e) {
                let li = '<li data-type="' + e.type + '" data-id="' + e.id + '">' + e.name + '</li>';
                html += li;
            });
            if (html) {
                $('#search-results')
                    .slideDown(100)
                    .find('ul')
                    .html(html);
            }

        }
    });

    return false;
});
$(document).on('click', '.hotels-search__child svg', function () {
    let el = $(this).parents('.dropdown');
    $(this).parents('.hotels-search__child').remove();
    updateCountData(null, el);
});

$(document).on('click', '.children-selector', function () {
    let chCount = $('#reservation-form .hotels-search__child').length;
    let sm = $(this).hasClass('sm');
    let name = "h[childrenAge][]";

    if (sm) {
        chCount = $('.sm-form.hotels-search__child').length;
        name = "childrenAge[]";
    }
    if (chCount <= 4) {
        let _this = $(this);
        let val = _this.data('val');
        let text = _this.text();
        let html = '<div class="hotels-search__child">\n' + text +
            '<svg fill="none" width="10" height="10">\n' +
            '<use href="/images/icons/sprite.svg#close"></use>\n' +
            '</svg>\n' +
            '<input type="hidden" name="' + name + '" value="' + val + '"></div>';

        $(html).insertBefore('.hotels-search__add-child');
        updateCountData(sm, this);
    }
});

function updateCountData(sm, inputObj) {
    let form = $(inputObj).parents('form');
    let chCount = parseInt($(form).find('.hotels-search__child').length);
    let adCount = parseInt($(form).find('.input-number input').val());
    let adText = '';
    let chText = '';
    let container = $('.rc-count-data', $(inputObj).parents('form'));

    if (sm) {
        chCount = parseInt($('.sm-form .hotels-search__child').length);
        adCount = parseInt($('.sm-form .adultscount').val());
        container = $('.sm-form .rc-count-data');
    }

    if (adCount === 1) {
        adText = "1 взрослый"
    } else {
        adText = adCount + " взрослых"
    }

    if (chCount === 0) {
        chText = "0 детей";
    } else if (chCount === 1) {
        chText = "1 ребенок";
    } else {
        chText = chCount + " детей";
    }

    let html = '<span class="text-nowrap">' + adText + ', </span><span class="text-nowrap">' + chText + '</span>';

    container.html(html)

}

$(document).on('click', '#search-results li', function () {
    let data = $(this).data();
    $('.search-text').val($(this).text());
    $('#h-regiontype').val(data.type);
    $('#h-region').val(data.id);
    $('#search-results')
        .slideUp(100);
});

$(".input-minus").on('click', function () {
    let that = $(this), input = $(this).parents('.input-number').find('input');
    let sm = $(that).hasClass('sm');

    if (parseInt(input.val()) > 1) {
        input.val(parseInt(input.val()) - 1);
    }

    if (parseInt(input.val()) === 1) {
        that.addClass('dis');
    }
    updateCountData(sm, that);

});

$(".input-plus").on('click', function () {
    let that = $(this), input = $(this).parents('.input-number').find('input');
    let sm = $(that).hasClass('sm');

    input.val(parseInt(input.val()) + 1);

    if (parseInt(input.val()) > 1) {
        $(".input-minus").removeClass('dis');
    }
    if (parseInt(input.val()) >= 5) {
        input.val(5);
        $(this).addClass('dis');
    } else {
        $(this).removeClass('dis');
    }
    updateCountData(sm, that);

});


$('.sm-form').submit(function (e) {
    let data = $(this).serialize();
    let url = $(this).attr('action');
    $('.hotels-notification--progress').show();
    $('#rooms-prop').html('');
    $.post(url, data, function (response) {
        if (response.html) {
            $('.hotel-price-item').remove();
            $('#rooms-prop').html(response.html);
            initAllData();
            $('.hotels-notification--progress').fadeOut();
            if (response.minPrice) {
                $('.hotel-price-options').html(response.minPrice);
            }
            if (response.bookingUrl) {
                $('.hotel-header__placement a')
                    .text('Забронировать')
                    .attr('target', '_blank')
                    .attr('href', response.bookingUrl);
            }

            $('.is-close').trigger('click');
        }
        if (response.hasRooms === false) {
            $('#rooms-prop').html("<p style='color: red; padding-top: 20px'>" + response.countData + "</p>");
        }
    });
    return false;
});

$(document).on('click', '.hotel-price__reload', function () {
    $(this).parents('#hotel-page-price').find('.sm-form').submit()
    return false;
});

$(document).on('click', '.add-active__item', function () {
    let type = $(this).data('type');
    if (type === 'day') {
        $('.per-week').hide();
        $('.per-day').show();
    } else {
        $('.per-week').show();
        $('.per-day').hide();
    }
});

function getHotelRoomsData(country, city) {
    showLoader();
    let search = location.search.substring(1);

    search += '&country=' + country + '&city=' + city;

    $.get('/hotels-ajax/get-hotels-data?' + search, function (response) {
        if (response) {
            let empty = $(response).find('.empty-result');
            if (empty.length) {
                $('.hotels-list, .hotels-list, .h1-def').html('');
                $('.hotels-sort').hide();
                $(empty).insertAfter('h1');
            } else {
                $('.hotels-sort').show();
                let h1 = $(response).find('.h1-def');
                $('.h1-def').html(h1.html())
                $('.h1-def').attr('data-count', h1.data('count'));
                $('.hotels-list').html($(response).find('.hotels-list').html());
                $('.hotels-pager').html($(response).find('.hotels-pager').html());
            }

            initAllData();
            getFilterData('full');
            hideLoader();
        }
    });
}

try {
    $("[data-range-text]").slider({
        animate: "slow",
        range: "min",
        value: parseInt(document.querySelector('#distance').value),
        step: 1,
        min: parseInt(document.querySelector('.distance-range').dataset.min),
        max: parseInt(document.querySelector('.distance-range').dataset.max),
        slide(event, ui) {
            if (this.dataset.rangeText) {
                let values = document.querySelector('#' + this.dataset.rangeText);
                values.querySelector('mark:first-of-type').innerText = ui.value;
                document.querySelector('#distance').value = ui.value;
            }
        }
    });
} catch (e) {

}


try {
    $("[data-range]").slider({
        range: true,
        min: parseInt(document.querySelector('.price-range').dataset.min),
        max: parseInt(document.querySelector('.price-range').dataset.max),
        values: [parseInt(document.querySelector('.range-cost__from input').value), parseInt(document.querySelector('.range-cost__to input').value)],
        slide(event, ui) {
            if (this.dataset.range) {
                let inputs = document.querySelector('#' + this.dataset.range);

                inputs.querySelector('.range-cost__from input').value = ui.values[0];
                inputs.querySelector('.range-cost__to input').value = ui.values[1];


            }

        }
    });
} catch (e) {

}

$("[data-range]").bind({
    slidestop: function (event, ui) {
        getFilterData('price');
    }
}).slider();
$("[data-range-text]").bind({
    slidestop: function (event, ui) {
        getFilterData('distance');
    }
}).slider();

function getFilterData(currentfiler, withOutFilter) {
    let data = $('#filter-hotels').serialize();
    let city = $('#filterdata').data('city');
    let country = $('#filterdata').data('country');
    let region = $('#filterdata').data('region');
    let search = location.search.substring(1);

    search += '&country=' + country + '&region=' + region + '&city=' + city + '&' + data;

    if (currentfiler == null)
        return false;

    if (withOutFilter !== 1) {
        $.get('/hotels-ajax/get-hotels-filter?' + search, {currentfiler: currentfiler}, function (response) {
            if (response.price) {

                $("[data-range]").slider({
                    range: true,
                    min: parseInt(response.price.min),
                    max: parseInt(response.price.max),
                    values: [parseInt(response.price.min_value), parseInt(response.price.max_value)]
                });

                $('.range-cost__from input').val(response.price.min_value);
                $('.range-cost__to input').val(response.price.max_value);

            }
            if (response.stars) {
                $('#filter_data_stars').html(response.stars);
            }
            if (response.hotel_types) {
                let fblock = $('#filter_data_hotel_types').closest('.hotels-filter__item');

                if (response.hotel_types['visible'] == 2) {
                    fblock.hide();
                } else {
                    fblock.show();
                }
                $('#filter_data_hotel_types').html(response.hotel_types['renderview']);
            }
            if (response.amenities) {
                let fblock = $('#filter_data_amenities').closest('.hotels-filter__item');

                if (response.amenities['visible'] == 2) {
                    fblock.hide();
                } else {
                    fblock.show();
                }

                $('#filter_data_amenities').html(response.amenities['renderview']);
            }
            if (response.short_amenities) {
                let fblock = $('#filter_data_short_amenities').closest('.hotels-filter__item');

                if (response.short_amenities['visible'] == 2) {
                    fblock.hide();
                } else {
                    fblock.show();
                }

                $('#filter_data_short_amenities').html(response.short_amenities['renderview']);

            }
            initAllData();


        });
    }

    $.get('/hotels-ajax/get-hotels?' + search, {currentfiler: currentfiler}, function (response) {
        if (response) {
            let h1 = $(response).find('.h1-def');
            $('.h1-def').html(h1.html())
            $('.h1-def').attr('data-count', h1.data('count'));
            $('.hotels-list').html($(response).find('.hotels-list').html());
            $('.hotels-pager').html($(response).find('.hotels-pager').html());
            $('.hotels-sort').html($(response).find('.hotels-sort').html());
            countitems = h1.data('count');
            initAllData();
            if (withOutFilter) {
                $('html, body').animate({
                    scrollTop: $("#hotels-container").offset().top
                }, 1);
            }
        }
    });
}

let currentfiler = null;
$('.hotels-filter__item').on('click', function () {
    currentfiler = $(this).data('namefilter');
})


$(document).on('change', '#filter-hotels', function () {
    $('input[name=page]').val(1);
    getFilterData(currentfiler);
});
$(document).on('click', '.hotels-rating div', function () {
    $('input[name=page]').val(1);
    getFilterData(currentfiler);
});
$(document).on('reset', '#filter-hotels', function () {
    $('input[name=page]').val(1);
    getFilterData('full');
});
$(document).on('click', '.hotel-pager a', function () {
    let page = parseInt($(this).data('page')) + 1;
    $('input[name=page]').val(page);
    getFilterData(1, 1);
    return false;
});
$(document).on('click', '.hotels-sort a', function () {
    let sort = $(this).data('sort');
    $('input[name=sort]').val(sort);
    getFilterData(1, 1);

    return false;
});

$(document).on('click', 'a.faq-action', function () {
    let url = $(this).attr('href');
    let _this = $(this);
    $.get(url, function (response) {
        if (response) {
            $(_this).parents('.hotels-question__value').find('.count').text(response).fadeOut().fadeIn();
        }
    });
    return false;
});

function showLoader() {
    $('.hotels-notification--progress').fadeIn();
}

function hideLoader() {
    $('.hotels-notification--progress').fadeOut();
}

$('#reviews-create').on('beforeSubmit', function () {
    let data = $(this).serialize();
    let url = $(this).attr('action');
    $.post(url, data, function (response) {
        if (response) {
            $('.reviewwrap').html(response);
            $('.reviewsclose').on('click', function () {
                $('.is-close').trigger('click');
                location.reload(true);
            });
        }
    });
    return false;
})


$(document).ready(function () {
    let ds = $('.district');
    let ds1 = $('.district1');
    let w = $(window).width();
    if (w <= 996) {
        if (ds.length) {
            ds.insertAfter(".hotel-card:eq(2)");
        }
        if (ds1.length) {
            ds1.insertAfter(".hotel-card:eq(3)");
        }
    }


    if ($("#hotels-page-loading").length) {
        var page = 1;
        var pages = $('#hotels-page-loading').data('itemcount');
        var pageurl = $('#hotels-page-loading').data('url');
        var loading = false;


        var hDoc = 1000;
        //
        // $(window).scroll(function () {
        //
        //     if (countitems <= 20) {
        //         $('#pageloading').css("display", "none");
        //         return false;
        //     }
        //     if ($(window).scrollTop() + $(window).height() > $(document).height() - hDoc) {
        //         if (loading == false) {
        //             loading = true;
        //
        //             page++;
        //
        //             $("input[name=\'page\']").val(page);
        //             let data = $("#filter-hotels").serialize();
        //             if (page <= pages) {
        //                 $('#pageloading').css("display", "grid");
        //                 $.get(pageurl, data, function (res) {
        //                     if (res) {
        //                         setTimeout(function () {
        //                             $('.hotels-section-pgnt').remove();
        //                             $(".hotels-list").append(res);
        //                             $('#pageloading').css("display", "none");
        //                             loading = false;
        //                             initAllData();
        //                             $(window).trigger("scroll");
        //                         }, 1000);
        //                         initAllData();
        //                     }
        //                 });
        //             }
        //         }
        //     }
        // });
    }
});

document.addEventListener('click', event => {
    if (!event.target.closest('#search-results') && document.querySelector('#search-results')) {
        document.querySelector('#search-results').style.display = "none";
    }
});