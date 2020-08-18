(function(){
    // //页面加载完毕，跳转至锚点
    // $(window).scrollTop(100);
    // console.log($(window).scrollTop());

    //切换登陆模式
    var $userLogin = $('.user-login');
    var $MaLogin = $('.Ma-login');
    var $userMessage = $('.user-message');
    var $MaMessage = $('.Ma-message');
    //账号密码输入 
    var $loginForm = $('.login-form');
    var $redTip = $('.redTip');
    var $tip = $('.tip');
    // 登录/注册
    var $loginMethod = $('.login-method');
    var $login = $('.login');
    var flage = true;//登录 注册状态判断
    var $replaceBox = ('.replaceBox');
    
    //登录输入框状态判断
    function inputCheck(usermessage,passmessage) {
        var $user = $('.user');
        var $passW = $('.passW');
        $user.focus(()=>{
            if($user.val()==usermessage){
                $user.val('');
            }else return;
            
        });
        $passW.focus(()=>{
            if($passW.val()==passmessage){
                $passW.val('');
            }else return;
            
        });
        $user.blur(()=>{
            if($user.val()==''){
                $user.val(usermessage);
            }
        });
        $passW.blur(()=>{
            if($passW.val()==''){
                $passW.val(passmessage);
            }
        });
    }
    inputCheck('账号是 13233334444','密码是 123');
    // 注册输入框状态判断
    function registerCheck(usermessage,passmessage) {
        var $user2 = $('.user2');
        var $passW2 = $('.passW2');
        //空值判断
        $user2.focus(function(){
            if($user2.val()==usermessage) $(this).val('');
            else return;
        });
        $user2.blur(function(){
            if($user2.val()=='') $(this).val(usermessage);
        });
        $passW2.focus(function(){
            if($passW2.val()==passmessage) $(this).val('');
            else return;
        });
        $passW2.blur(function(){
            if($passW2.val()=='') $(this).val(passmessage);
        });
    }

    //判断账号登录还是二维码登录
    $userLogin.click(function(){
        $MaLogin.removeClass('current');
        $userLogin.addClass('current');
        $userMessage.show();
        $MaMessage.hide();
    });
    $MaLogin.click(function(){
        $userLogin.removeClass('current');
        $MaLogin.addClass('current');
        $MaMessage.show();
        $userMessage.hide();
    });
    //注册账号
    var replaceNodes = `<div class="replaceNew">
        <p><i>+86</i><input type="text" class="user2" value="手机号码"></p>
        <p><input type="text" class="passW2" value="短信验证码"><a href="#">获取验证码</a></p>
    </div>`;
    var replaceNodes2 = ` <div class="replaceOld">
        <p><input type="text" class="user" value="账号是 xiaobai"></p>
        <p><input type="text" class="passW" value="密码是 12345"></p>
    </div>`;
    //登录注册界面切换
    $loginMethod.toggle(function(){
        flage = false;
        //跳转至注册
        $login.val('立即登录/注册');
        $loginMethod.text('用户名密码登录');

        //替换元素
        $('.replaceBox').html('');
        $('.replaceBox').html(replaceNodes);
        registerCheck('手机号码','短信验证码');
        $redTip.hide();

    },function(){
        flage = true;
        $login.val('登录');
        $loginMethod.text('手机短信登录/注册');

        $('.replaceBox').html('');
        $('.replaceBox').html(replaceNodes2);
        inputCheck('账号是 xiaobai','密码是 12345');
        $redTip.hide();
    });

    //从账号 json 数据中判断密码，成功则登录
    $.ajax({
        url: '../data/password.json',
        type: 'get',
        data: '',
        dataType: 'json',
        success: function(data) {
            var reg1 = /^(1|\+861)[3-8]{1}\d{9}$/;//匹配手机号
            
            $loginForm.submit(function(){
                var $user = $('.user');
                var $passW = $('.passW');
                var $user2 = $('.user2');
                var $passW2 = $('.passW2');
                console.log("flag有",flage);
                if(flage){//登录验证
                    if(data.user==$user.val()&&data.passW==$passW.val()){
                        $redTip.hide();
                        return true;
                    }
                    if(!reg1.test($user.val())){
                        $redTip.show();
                        $tip.text('手机格式不正确');
                        return false;
                    }else {
                        $redTip.show();
                        $tip.text('账号或密码不正确');
                        return false;
                    }
                }else{
                    if(!reg1.test($user2.val())){
                        $redTip.show();
                        $tip.text('手机格式不正确');
                        return false;
                    }
                    if($passW2.val()=='短信验证码') {
                        $redTip.show();  
                        $tip.text('请输入验证码');
                        return false;
                    }
                }
                
            });
        }
    });
})()