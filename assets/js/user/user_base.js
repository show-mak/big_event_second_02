$(function () {

    let form = layui.form;
    let layer = layui.layer;

    // 1.校验表单数据
    // 1.1 昵称长度必须在 1 ~ 6 个字符之间！
    form.verify({
        nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value.length > 6 && value.length < 1) {
                return "昵称长度必须在 1 ~ 6 个字符之间！"
            }
        }
    });

    // 2.1对页面进行初始化
    initUserInfo()
    // 2.获取用户的信息 ajax请求函数封装
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: (res) => {
                if (res.status != 0) {
                    layer.msg("获取用户信息失败")
                }
                // 获取用户信息成功后进行渲染
                layer.msg(res.message)
                // console.log(res.data);
                form.val("formUserInfo", res.data)
            }
        })
    }
    //3击重置按钮对页面重新渲染
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })
    //4.form表单提交  更新用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        // 发送ajax更新数据请求 
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: {
                id: $('[name=id]').val(),
                nickname: $('[name=nickname]').val(),
                email: $('[name=email]').val(),
            },
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo();
            }
        })
    })



})




