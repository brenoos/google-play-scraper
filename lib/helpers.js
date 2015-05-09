
module.exports.requestError = function() {
    //TODO improve details
    throw Error('Error requesting Google Play');
};

module.exports.parseList = function($) {
    var apps = [];

    $('.card').each(function(i, v){
        apps.push(parseApp($, v));
    });

    return apps;
};

function parseApp($, app) {
    var price = $(app).find('.display-price').first().text();
    var free = price === 'Free';
    if (free) {
        price = '0';
    }

    var scoreText = $(app).find(".tiny-star").attr("aria-label");
    var score = parseFloat(scoreText.match(/[\d.]+/)[0]);

    return {
        url: 'https://play.google.com' + $(app).find('a').attr('href'),
        appId: $(app).attr('data-docid'),
        title: $(app).find('.title').attr('title'),
        developer: $(app).find('.subtitle').text(),
        icon: $(app).find('.cover-image').attr('data-cover-large'),
        score: score,
        price: price,
        free: free
    };
}