//共用部分  引入头部+导航栏+页脚
(function(){
    var $commonHead = $('.common-header');
    var $commonFoot = $('.common-footer');
    $commonHead.load('../pages/header.html');//不会引入事件
    $commonFoot.load('../pages/footer.html');//不会引入事件
})();

//详细地址
(function(){
    var $detailedAdrr = $('.detailedAdrr');
    $detailedAdrr.focus(function(){
        if($detailedAdrr.val()=='输入街道、乡镇、小区或商圈名称'){
            $detailedAdrr.val('');
        }
    });
    $detailedAdrr.blur(function(){
        if($detailedAdrr.val()==''){
            $detailedAdrr.val('输入街道、乡镇、小区或商圈名称');
        }
    });
})();

//商品排序 + 数据渲染
(function(){
    var $storeList = $('.store ul');
    var $noFound = $('.no-found');
    var $sortWrap = $('.sortWrap');
    var $resetChoose = $('.resetChoose');
    var $store = $('.store');

    var $stages = $('.stages');//分期
    var $stock = $('.has');//存货
    var $saleMax = $('.sale');//促销
    var newNodes = [];//用于存储排序好的对象---新品
    var saleNodes = [];//用于存储排序好的对象---销量 
    var priceNodes = [];//用于存储排序好的对象---价格
    var saleMaxNodes = [];//用于存储排序好的对象---促销
    var stagesNodes = [];//用于存储排序好的对象---分期
    var stockMaxNodes = [];//用于存储排序好的对象---存货

    //基本渲染方式
    function addStoreH(item) {
        if(item.new==1){
            $storeList.append(`<li>
                <a href="../pages/goodsDetail.html" index="${item.id}">
                    <img src="${item.imgUrl}" alt="加载失败" class="bigImg">
                    <p class="title">${item.title}</p>
                    <p class="price">${item.price}</p>
                    <img src="${item.imgUrl}" alt="加载失败" class="smallImg">
                    <p class="greenT">新品</p>
                </a>
            </li>`);
        }else if(item.add==1){
            $storeList.append(`<li>
                <a href="../pages/goodsDetail.html" index="${item.id}">
                    <img src="${item.imgUrl}" alt="加载失败" class="bigImg">
                    <p class="title">${item.title}</p>
                    <p class="price">${item.price}</p>
                    <img src="${item.imgUrl}" alt="加载失败" class="smallImg">
                    <p class="redT">加价购</p>
                </a>
            </li>`);
        }else {
            $storeList.append(`<li>
                <a href="../pages/goodsDetail.html" index="${item.id}">
                    <img src="${item.imgUrl}" alt="加载失败" class="bigImg">
                    <p class="title">${item.title}</p>
                    <p class="price">${item.price}</p>
                    <img src="${item.imgUrl}" alt="加载失败" class="smallImg">
                </a>
            </li>`);
        }
    }

    $.ajax({
        url: '../data/goodsSort.json',
        type: 'get',
        data: '',
        dataType: 'json',
        success: function(data) {
            //初次渲染  判断条件
            $.each(data,(index,item)=>{
                //渲染判断是否为 新品/加购价
                addStoreH(item);
                //按照新品排序
                if(item.new==1) {
                    newNodes.unshift(item);//---新品排序
                }else {
                    newNodes.push(item);//---新品排序
                }
                //按照销量进行排序
                saleNodes.push(item);
                saleNodes.sort(function(previous,current) {
                    return current.hot-previous.hot; 
                });
                //按照价格进行排序
                priceNodes.push(item);
                priceNodes.sort(function(previous,current) {
                    return parseInt(current.price)-parseInt(previous.price); 
                });
                //选择促销商品
                if(item.add==1) {
                    saleMaxNodes.push(item);
                }
                //选择分期商品
                if(item.stages==1) {
                    stagesNodes.push(item);
                }
                //查看剩余存货商品
                if(item.stock>0){
                    stockMaxNodes.push(item);
                }
            });
            //渲染执行
            $sortWrap.on('click','li',function(e){
                var target = e.target;
                if(target.className=='storeAll current') {//点击综合排序
                    $storeList.html('');
                    $.each(data,(index,item)=>{
                        addStoreH(item);
                    })
                }
                if(target.className=='newSort') {//点击新品，进行排序
                    $storeList.html('');
                    $.each(newNodes,(index,item)=>{
                        addStoreH(item);
                    })
                }
                if(target.className=='saleSort') {//点击销量，进行排序
                    $storeList.html('');
                    $.each(saleNodes,(index,item)=>{
                        addStoreH(item);
                    })
                }
                if(target.className=='priceSort') {//点击价格，进行排序
                    $storeList.html('');
                    $.each(priceNodes,(index,item)=>{
                        addStoreH(item);
                    })
                }
                if(target.className=='sale') {//选出促销商品
                    $storeList.html('');
                    if($saleMax[0].checked){
                        if(saleMaxNodes.length==0){
                            $noFound.show();
                        }
                        $.each(saleMaxNodes,(index,item)=>{
                            addStoreH(item);
                        })
                    }else{
                        $.each(data,(index,item)=>{
                            $noFound.hide();
                            addStoreH(item);
                        })
                    }
                }
                if(target.className=='stages') { //选出分期商品
                    $storeList.html('');
                    if( $stages[0].checked){
                        if(stagesNodes.length==0){
                            $noFound.show();
                        }
                        $.each(stagesNodes,(index,item)=>{ 
                            addStoreH(item);
                        })
                    }else{
                        $.each(data,(index,item)=>{
                            $noFound.hide();
                            addStoreH(item);
                        })
                    }
                }
                if(target.className=='has') {//查看存货商品
                    $storeList.html('');
                    if( $stock[0].checked){
                        if(stockMaxNodes.length==0){
                            $noFound.show();
                        }
                        $.each(stockMaxNodes,(index,item)=>{ 
                            addStoreH(item);
                        })
                    }else{
                        $.each(data,(index,item)=>{
                            $noFound.hide();
                            addStoreH(item);
                        })
                    }
                }
            });
            //查询无果后点击按钮事件
            $resetChoose.click(()=>{
                $.each(data,(index,item)=>{
                    $noFound.hide();
                    addStoreH(item);
                })
            });
            //点击商品时
            //商品信息存储至localstorage------>goodsDetail界面提取
            $store.on('click','a',function() {
                localStorage.setItem("id", $(this).attr('index'));
            });
        }
    });

})();

//轮播图数据渲染
(function(){
    var $guessList = $('.guess-list ul');
    $.ajax({
        url: '../data/goodsGuess.json',
        type: 'get',
        data: '',
        dataType: 'json',
        success: function(data){
            $.each(data,(index,item)=>{
                $guessList.append(`<li>
                    <img src="${item.imgUrl}" alt="加载失败">
                    <p class="guess-title">${item.title}</p>
                    <p class="price">${item.price}</p>
                    <span>2890人好评</span>
                    <div class="addCart">加入购物车</div>
                </li>`);
            })
        }
    });
})();

//轮播图
(function(){
    var $list = $('.guess-list');
    var $dotList = $('.dot span');
    var $guessBtm = $('.guess-btm');
    var $list2 = $('.guess-list li');
    var index=0;
    var listW = $list[0].clientWidth;
    var timer = null;
    var pre = 0;
    //刷新图片
    function loadImg() {
        $list.stop(true,true);
        $dotList.eq(index).removeClass('current');//删除上一个样式
        index++;
        if(index>1){
            index = 0;
        }
        $dotList.eq(index).addClass('current');//添加样式
        $list.animate({"scrollLeft":index*listW},1000);
    }
    //自动播放图片
    function auto() {
        clearInterval(timer);
        timer = setInterval(function(){
            loadImg();
        },3000);
    }
    auto();
    //点击按钮跳转图片
    $guessBtm.on('click','.dot span',function(){
        $list.stop(true,true);//清楚定时器
        clearInterval(timer);

        $dotList.eq(index).removeClass('current');//删除上一个样式
        $(this).addClass('current');//添加样式
        
        index = $(this).attr('index');
        $list.animate({"scrollLeft":index*listW},1000,function(){
            auto();
        });
    })
    // //鼠标覆盖暂停/离开播放
    $list2.mouseenter(function(){
        $(this).children().eq(4).stop(true,true);
        clearInterval(timer);
        $(this).children().eq(4).animate({"bottom":"14"});
    });
    $list2.mouseleave(function(){
        $(this).children().eq(4).stop(true,true);
        auto();
        $(this).children().eq(4).animate({"bottom":"-40"});
    });
  

})();


(function(){
    
    // localStorage.setItem();
})()