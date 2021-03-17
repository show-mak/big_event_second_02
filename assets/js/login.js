$(function () {
    // 需求1点击a连接进行登录框与注册框的切换
    $('.login a').on('click', function () {
        $('.login').hide();
        $('.reg').show()

    })

    $('.reg a').on('click', function () {
        $('.reg').hide();
        $('.login').show()
    })

    // 表单验证
    console.log(layui);
    let form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value, item) { //value：表单的值、item：表单的DOM对象
            let pwd = $('.reg input[name=password]').val()
            if (value !== pwd) {
                return "密码不一致,重新输入"
            }
        }
    })


    // 注册事件
    let layer = layui.layer;
    $('.reg').on('submit', function (e) {
        // 阻止页面跳转
        e.preventDefault()
        // 引入ajax 
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: {
                username: $('.reg input[name=username]').val(),
                password: $('.reg input[name=password]').val()
            },
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {

                    return layer.msg('注册失败');

                }
                layer.msg('注册成功,跳转至登录界面');
                //切换到登录页面
                $('.reg a').click();
                // 重置当前的form表单
                $('.reg')[0].reset();
            }
        })
    })



    //登陆事件
    $('.login').on('submit', function (e) {
        //组织页面刷新
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg('密码或用户名错误,重新输入');
                }
                layer.msg('登录成功,跳转至后台');
                location.href = '/index.html'
                localStorage.setItem('token', res.token);
            }
        })

    })

})