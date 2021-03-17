$(function () {
    let form = layui.form;
    let layer = layui.layer

    //进行密码的校验
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 新密码和原密码不能一样
        newPwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码和原密码不能一样'
            }
        },
        //新密码和确认密码必须一致
        rePwd: function (value) {
            if (value != $('[name=newPwd]').val()) {
                return '两次密码输入不一致'
            }
        }
    })

    // 点击修改密码按钮提交发送ajax修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                if (status != 0) {
                    return layer.msg("密码修改失败")
                }
                layer.msg("密码修改成功")
                // 清空表单 
                $('.layui-form')[0].reset();
                // 页面跳转回登录界面
                setTimeout(() => {
                    location.href = '/login.html'
                }, 1000);
            }
        })
    })

    // 点击重置按钮 清空表单
    $('.btnResetPwd').on('click', function (e) {
        e.preventDefault();
        $('.btnResetPwd')[0].reset()
    })



})