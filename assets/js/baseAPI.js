$(function () {
    let baseUrl = 'http://api-breakingnews-web.itheima.net';
    $.ajaxPrefilter(function (options) {
        console.log(options);
        options.url = baseUrl + options.url
    })

})