$(function () {
    getUserInfo()


    // 4 实现退出功能
    $('#btnLogout').on('click', function (e) {
        // 4.1阻止页面刷新
        e.preventDefault();
        //4.2弹出询问框
        layer.confirm('是否注销当前账户?', { icon: 3, title: '提示' }, function (index) {
            //do something 
            //4.3在该函数中清除token里面的数据
            localStorage.removeItem('token');
            //4.4跳转会登陆界面
            location.href = '/login.html'
            // 关闭当前弹出框
            layer.close(index);
        });
    })

    //5控制用户的访问权限


})

// 封装函数getUserInfo()渲染页面
let layer = layui.layer;
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'GET',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: (res) => {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            //调用另一个函数 渲染用户的头像
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    // 1. 获取用户的名称
    let name = user.nickname;
    //2.设置欢迎文本
    $('#welcome').html("欢迎主人&nbsp:" + name)
    console.log(name);
    // 3.  按需渲染用户的头像
    if (user.user_pic != null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
        return
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide();
        let frist = name[0].toUpperCase();
        $('.text-avatar').html(frist).show()
    }


}