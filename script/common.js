// 导航栏 下载app
(function(){
    var $downloadMa = $('.downloadMa');
    var $download = $('.download');
    var $downloadA = $('.download a');
    $download.mouseenter(function(){
        $downloadMa.stop(true,true);
        $downloadA.css('color','#fff');
        $downloadMa.slideDown(220);//拉下二维码
    });
    $download.mouseleave(function(){
        $downloadMa.stop(true,true);
        $downloadMa.slideUp(220);//展开二维码
        $downloadA.css('color','');
    });
})();

//购物车
(function(){
    var $storeCart = $('.storeCart')
    $('.shopCart').mouseenter(function(){
        $storeCart.stop(true,true);
        $('.shopCart a').css({
            'color':'#ff6700',
            'backgroundColor': '#fff',
        });
        $('.shopCart img')[0].src = '../image/shopCart2.png';
        $storeCart.slideDown(220);//拉下
    });
    $('.shopCart').mouseleave(function(){
        $storeCart.stop(true,true);
        $('.shopCart a').css({
            'color':'',
            'backgroundColor': '',
        });
        $('.shopCart img')[0].src = '../image/shopCart1.png';
        $storeCart.slideUp(220);//收起
    });
})();

//header 数据渲染
(function(){
var $header = $('.header');
var $showHeader = $('.header-showWrap');
var $show = $('.header-show');
var $nav = $('.nav');

$header.on('mouseenter','.headContent a',function(){
    var $that = $(this);
    $showHeader.stop(true,true);
    //频闭 服务和社区
    if($(this)[0]==$('.headContent a:contains("服务")')[0] ) {
        $showHeader.slideUp(220);
    }else if( $(this)[0]==$('.headContent a:contains("社区")')[0]){
        $showHeader.slideUp(220);
    }else{
        $showHeader.slideDown();
        $show.html('');
        $.ajax({
            url: '../data/header.json',
            type: 'get',
            data: '',
            dataType: 'json',
            success: function(data) {
                var num = $that.attr('index')
                $.each(data,function(index,item){
                    if(num==index){
                        $.each(item,function(idx,ite){
                            $show.append(`<div>
                                <a href="./goodsList.html">
                                    <img src="${ite.imgUrl}" alt="loadFail">
                                    <p class="title">${ite.title}</p>
                                    <p class="price">${ite.price}</p>
                                </a> 
                            </div>`);
                        });
                    }
                });
            }
        });
    }
})
$nav.mouseenter(function(){
    $showHeader.slideUp(220);
});
$showHeader.mouseleave(function(){
    $showHeader.slideUp(220);
});

// header 输入框
var $searchL = $('.searchL');
$searchL.mouseenter(function(){
    $searchL.next().css('border-color','#919191');
});
$searchL.mouseleave(function(){
    $searchL.next().css('border-color','');
});
})();

//页脚
(function(){
    var $weibo = $('.weibo');
    var $wechat = $('.wechat');
    $weibo.mouseenter(()=>{$weibo[0].src = '../image/weibo2.png';});
    $weibo.mouseleave(()=>{$weibo[0].src = '../image/weibo1.png';});
    $wechat.mouseenter(()=>{$wechat[0].src = '../image/weixin2.png';});
    $wechat.mouseleave(()=>{$wechat[0].src = '../image/weixin1.png';});
})()