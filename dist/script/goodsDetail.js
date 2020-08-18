//共用部分  引入头部+导航栏+页脚
(function(){
    var $commonHead = $('.common-header');
    var $commonFoot = $('.common-footer');
    $commonHead.load('../pages/header.html');//不会引入事件
    $commonFoot.load('../pages/footer.html');//不会引入事件
})();

//根据 goodsList界面传入的商品id ,选择渲染商品
(function(){
    var key = localStorage.getItem('id');//获取 local store本地存储数据
    var $detailShow = $('.detailShow'); //展示图片
    var $dot = $('.dot');//需要渲染,赋值长度的小可怜圆点
    var $bigTitle = $('.sb-lfet');//粘性定位标题
    var $message = $('.message');//右侧头部信息
    var $styleChoose = $('.style-choose ul');//款式选择
    // var $styleList = $('.style-choose ul li');//款式选择
    var $detailCheck = $('.detail-check');//结算信息
    var $addressStock = $('.address-stock');//存货信息
    var dotNum = null;//存储轮播图小滑块个数
    if(key==1||key==3) {
        key=1;
    }else if(key==2||key==4) {
        key=2;
    }
    //轮播图函数
    function turnImg(){
        var $detailShow = $('.detailShow img');
        var $dotList = $('.dot span');
        var $turnL = $('.turnL');
        var $turnR = $('.turnR');
        var index = 0;
        var timer = null;
        var pre = 0;
        //刷新图片
        function loadImg() {
            $detailShow.eq(index).stop(true,true);
            $detailShow.eq(index).css('z-index','1');
            $detailShow.eq(index).animate({"opacity":0.2});
            $dotList.eq(index).css('backgroundColor','#d6d6d6');
            index++;
            pre = index;
            if(index>dotNum) { //------------------------->渲染需要处理该处数据
                index = 0;
                // $detailShow.eq(index).css('z-index','2');
                // $dotList.eq(index).css('backgroundColor','#a3a3a3');
            }
            $detailShow.eq(index).css('z-index','2');
            $detailShow.eq(index).animate({"opacity":1});
            $dotList.eq(index).css('backgroundColor','#a3a3a3');
            pre = index;
        }
        //自动播放
        function auto() {
            clearInterval(timer);
            timer = setInterval(()=>{
                loadImg();
            },2000);
        }
        auto();
        //下一张
        $turnR.click(()=>{
            clearInterval(timer);
            loadImg();
            auto();
        });
        //上一张
        $turnL.click(()=>{
            clearInterval(timer);
            $detailShow.eq(index).stop(true,true);
            $detailShow.eq(index).css('z-index','1');
            $detailShow.eq(index).animate({"opacity":0.2});
            $dotList.eq(index).css('backgroundColor','#d6d6d6');
            index--; 
            if(index<0){
                index = dotNum;
                // $detailShow.eq(index).css('z-index','2');
                // $dotList.eq(index).css('backgroundColor','#a3a3a3');
            }
            $detailShow.eq(index).css('z-index','2');
            $detailShow.eq(index).animate({"opacity":1});
            $dotList.eq(index).css('backgroundColor','#a3a3a3');
            pre = index;
            auto();
        });
        //点击圆点
        $dotList.click(function() {
            clearInterval(timer);
            $detailShow.eq(pre).stop(true,true);
            $detailShow.eq(index).css('z-index','1');
            $detailShow.eq(pre).animate({"opacity":0.2});
            $dotList.eq(index).css('backgroundColor','#d6d6d6');
    
            var num = $(this).attr('idx');
            index = num;
            $detailShow.eq(index).css('z-index','2');
            $detailShow.eq(num).animate({"opacity":1});
            $dotList.eq(index).css('backgroundColor','#a3a3a3');
            pre = num;
        });
    
        //鼠标覆盖停止
        $detailShow.mouseenter(()=>{
            clearInterval(timer);
        });
        $detailShow.mouseleave(()=>{
            auto(timer);
        });
    }
     //页面刷新渲染函数
    // typeNum---产品类型
    function loadPages(data,typeNum) {
        var typeObj = data[key].type;
        var imgObj = data[key][typeNum].imgUrl;
        var messageObj = data[key][typeNum];
        //首选界面默认 type1
        //左侧轮播图渲染
        dotNum = imgObj.length-1;//轮播图小滑块使用
        $.each(imgObj,(index,item)=>{
            $detailShow.append(`<img src="${item}" alt="加载失败">`);//轮播图
            $dot.append(`<span idx = "${index}"></span>`); //轮播图下面的下滑条
        })
        //头部信息渲染
        $bigTitle.text(messageObj.title);//粘性浮动标题
        //右侧信息渲染
        $message.append(`<h1 class="detail-title"> <img src="../image/goodsDetail-logo.jpg" alt=""> ${messageObj.title}</h1>
            <p class="detail-tip"><span>${messageObj.tip1}</span><span> ${messageObj.tip2}</span></p>
            <p class="xm">小米自营</p>
            <p class="allprice"><span class="detail-price">${messageObj.price}</span><del class="detail-delete">${messageObj.del}</del></p>
            <hr/>`);
        //右侧 结算信息渲染
        $detailCheck.append(`<div>
            <p class="checkL"> ${messageObj.title}</p>
            <p class="checkR">${messageObj.price}</p>
        </div>
        <p>总计: ${messageObj.price}</p>`);
        //存货判断
        if(messageObj.stock>0){
            $addressStock.text('有现货');
        }else $addressStock.text('该地区货存不足');
        
        //款式渲染
        $.each(typeObj,(index,item)=>{
            $styleChoose.append(`<li>${item}</li>`);
        });
    }
    //清空渲染
    function claerHtml() {
        $detailShow.html('');//清空轮播图
        $dot.html(''); //清空轮播图下面的下滑条
        $message.html('');//清空右侧信息渲染
        $detailCheck.html('');//右侧 结算信息渲染
        $styleChoose.html(''); //清空款式渲染
    } 
    $.ajax({
        url: '../data/goodsDetail.json',
        type: 'get',
        data: '',
        dataType: 'json',
        success: function(data) {
            //页面渲染---首次默认type1
            loadPages(data,0);
            $styleChoose.on('click','li',function(){
                var $that = $(this);
                $.each(data[key].type,(index,item)=>{
                    if(item==$that.text()){
                        claerHtml();//清空数据
                        loadPages(data,index);//重新渲染
                        turnImg();
                        $('.style-choose ul li').eq(index).css({
                            'color':'#ff6700',
                            'border': '1px solid #ff6700',
                        });
                        return;
                    }
                })
            })
        },
        //渲染完毕后执行 轮播图
        complete: function(){
            turnImg();
            $('.style-choose ul li').eq(0).css({
                'color':'#ff6700',
                'border': '1px solid #ff6700',
            });
        }
    });
})();

//地址栏信息处理
(function(){
    var $close = $('.close');
    var $mask = $('.mask');
    var $correct = $('.correct');
    $close.click(function() {
        $mask.animate({"opacity":"0.2"},300,function(){
            $mask.hide();
        });
    });
    $correct.click(function(){
        $mask.show();
        $mask.animate({"opacity":"1"},300);
    });
})();
