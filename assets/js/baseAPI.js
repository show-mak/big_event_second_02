$(function () {
    let baseUrl = 'http://api-breakingnews-web.itheima.net';
    $.ajaxPrefilter(function (options) {
        // console.log(options);
        options.url = baseUrl + options.url
    })

    // 统一为有权限的接口设置`headers`请求头
    $.ajaxPrefilter(function (options) {
        // console.log(options);
        if (options.url.indexOf('/my/')) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }

        // console.log(options); options 包含了ajax内部所有的数据 url 等
        //统一全局挂载complete回调函数
        options.complete = function (res) {
            // console.log(res);  res中有responseJSON属性来判断服务器响应是否成功
            //判断不成功即可
            if (res.responseJSON.status != 0 && res.responseJSON.message == '身份认证失败！') {
                // 设置定时器自动进行跳转页面至登陆界面 并且清除token数据
                localStorage.removeItem('token')
                setTimeout(() => {
                    location.href = '/login.html'
                }, 200);
            }

        }
    })
})

