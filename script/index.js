
//轮播图
(function(){
    var $swiper = $('.Banner-swiper a');
    var $turnR = $('.turnR');
    var $turnL = $('.turnL');
    var $bannerTop = $('.bannerTop');
    var $dot = $('.dot span');
    var index=0;
    var timer1 = null;
    var pre = null;

    //更新
    function loadImg() {
        $swiper.eq(index).removeClass('img-current');//移除之前样式
        $dot.eq(index).removeClass('span-current');
        $swiper.eq(index).animate({'opacity':'0.2'});

        index++;
        if(index>5) {
            index = 0;
        }
        $swiper.eq(index).addClass('img-current');
        $dot.eq(index).addClass('span-current');
        $swiper.eq(index).animate({'opacity':'1'},500);
        pre = index;
    }
    //进入页面自动播放
    function auto() {
        clearInterval(timer1);
        timer1 = setInterval(function(){
            loadImg();
        },2000);
    }
    auto();
    //下翻页
    $turnR.click(function(){
        clearInterval(timer1);
        loadImg();
        auto();
    });
    //上翻页
    $turnL.click(function(){
        clearInterval(timer1);
        $swiper.eq(index).removeClass('img-current');//移除之前样式
        $dot.eq(index).removeClass('span-current');
        $swiper.eq(index).animate({'opacity':'0.2'});
        index--;
        if(index<0) {
            index = 5;
        }
        $swiper.eq(index).addClass('img-current');
        $dot.eq(index).addClass('span-current');
        $swiper.eq(index).animate({'opacity':'1'},500);
        pre = index;
        auto();
    });
    //鼠标进入暂停播放
    $swiper.mouseenter(function(){
        clearInterval(timer1);
    });
    //鼠标移除开始播放
    $swiper.mouseleave(function(){ 
        auto();
    });
    //点击圆点，切换图片
    $bannerTop.on('click','.dot span',function(){
        clearInterval(timer1);
        $swiper.eq(pre).removeClass('img-current');//移除之前样式
        $dot.eq(pre).removeClass('span-current');
        $swiper.eq(pre).animate({'opacity':'0.2'});

        var num =  $(this).attr('index');
        $swiper.eq(num).addClass('img-current');
        $dot.eq(num).addClass('span-current');
        $swiper.eq(num).animate({'opacity':'1'},500);
        pre = num;
    })
})();

//主菜单数据渲染
(function(){
    var $bannerTop = $('.bannerTop');
    var $list = $('.menu li');
    var $menuList = $('.menuList');
    var $show = $('.menuList ul');
    $.ajax({
        url: '../data/banner.json',
        type: 'get',
        data: '',
        dataType: 'json',
        success: function(data) {
            $bannerTop.on('mouseenter','.menu li',function(){
                $menuList.show();
                $.each(data,(idx,itm)=>{
                    if($(this).attr('index')==idx){
                        $show.html('');
                        $.each(itm,(idx2,itm2)=>{
                            $show.append(`<li><a href="../pages/goodsList.html"><img src="${itm2.imgUrl}" alt="loadFail">${itm2.title}</a></li>`);
                        })
                    }
                })
            })
        }
    });
    $('.bannerWrap').on('mouseleave','.bannerTop',function(){
        $show.html('');
        $menuList.hide();
    })
})();

// 小米闪购 
(function(){
    // 轮播图
    var $mainR = $('.main-r');
    var $list = $('.main-r ul');
    var $main1L = $('.main1-L');
    var $main1R = $('.main1-R');
    var scrollL = $mainR[0].clientWidth;
    var index = 0;
    var timer2 = null;

    auto();
    //下翻页
    $main1R.click(function(){
        clearInterval(timer2);
        turnRight();
        auto();
    });
    function turnRight() {
        index++;
        //上一个状态
        $main1L.attr('disabled',false);//按钮使能
        $main1L.css('color','#b0b0b5');

        //目前状态
        if(index>5){
            $main1R.attr('disabled',true);//按钮失效
            $main1R.css('color','#eec');
            index = 5;
        }
        $mainR.animate({'scrollLeft':scrollL*index});
    }
    //上翻页
    function turnLeft() {
        index--;
        //上一个状态
        $main1R.attr('disabled',false);//按钮使能
        $main1R.css('color','#b0b0b5');

        //目前状态
        if(index<0){
            $main1L.attr('disabled',true);//按钮失效
            $main1L.css('color','#eec');
            index = 0;
        }
        $mainR.animate({'scrollLeft':scrollL*index});
    }
    $main1L.click(function(){
        clearInterval(timer2);
        turnLeft();
        auto();
    });
    //自动轮播
    function auto() {
        clearInterval(timer2);
        timer2 = setInterval(function(){
            turnRight();
            if(index==5){
                clearInterval(timer2);
            };
        },3000);
    }
    // 倒计时
    var $h = $('.h');
    var $m = $('.m');
    var $s = $('.s');
    setInterval(function(){
        var nowTime = Date.now();
        var futureTime = Date.parse('2021/08/15 08:00:00');
    
        var num = (futureTime - nowTime)/1000 ;
        var day = parseInt(num/60/60/24);
        var hours = parseInt((num/60/60-day*24));
        var minutes = parseInt(num/60-day*24*60-hours*60);
        var seconds = parseInt(num-day*24*60*60-hours*60*60-minutes*60);
        
        hours = hours<10? "0"+hours : hours;
        minutes = minutes<10? "0"+minutes : minutes;
        seconds = seconds<10? "0"+seconds : seconds;

        $h.text(hours);
        $s.text(seconds);
        $m.text(minutes);
    },1000)
})();

//手机数据渲染
(function(){
    var $list = $('.main2R ul');
    $.ajax({
        url: '../data/phone.json',
        type: 'get',
        data: '',
        dataType: 'json',
        success(data){
            $.each(data,(index,item)=>{
                // console.log(item.title);
                $list.append(` <li>
                    <a href="../pages/goodsList.html">
                        <img src="${item.imgUrl}" alt="">
                        <h5>${item.title}</h5>
                        <p>${item.tip}</p>
                        <span>${item.price} <del>${item.del}</del></span>
                    </a>
                </li>`);
            })
        }
    });
})();

//共用部分  引入头部+导航栏   页脚
(function(){
    var $commonHead = $('.common-header');
    var $commonFoot = $('.common-footer');
    $commonHead.load('../pages/header.html');//不会引入事件
    // $.getScript('../script/common.js');//引入共用js
    $commonFoot.load('../pages/footer.html');//不会引入事件
})()


