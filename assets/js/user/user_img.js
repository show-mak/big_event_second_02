$(window).on('load', function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    let layer = layui.layer
    //2.点击删除按钮 激活file的点击事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    })

    //3.- 给文件选择框绑定 change 事件
    $('#file').on('change', function (e) {
        e.preventDefault();
        // 3.1获取用户选择的文件
        //console.log(e.target);//这里是input file 标签
        let fileList = e.target.files
        console.log(fileList); //这里是新文件的信息 
        if (fileList.length !== 1) {
            return layer.msg("请选择照片!")
        }
        // 3.2拿到用户选择的文件
        let file = e.target.files[0];
        // 3.3 将文件，转化为路径
        let imgURL = URL.createObjectURL(file)
        // 3.4 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })

    // 4.给确定按钮绑定事件 发送ajaxq请求
    $('#btnSure').on('click', function (e) {
        e.preventDefault()
        let dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        // console.log(1);
        $.ajax({
            url: '/my/update/avatar',
            type: 'POST',
            data: { avatar: dataURL },
            success: (res) => {
                if (res.status != 0) {
                    return "上传头像失败"
                }
                layer.msg('上传头像成功')
                window.parent.getUserInfo();
            }
        })
    })

})