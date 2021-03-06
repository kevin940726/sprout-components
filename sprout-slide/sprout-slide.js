$.fn.hasAttr = function(name) {  
   return this.attr(name) !== undefined;
};

jQuery.fn.extend({
    sproutSlide: function (settings) {
        var windowW = $(document).width();   // returns width of browser viewport

        var config = {
            'width': windowW,
            'slideNum': 1,
            'duration':700,
            'autovalue':true,
            'interval':3000
        };


        if (settings){$.extend(config, settings);}

        return this.each(function(){
            // element-specific code here
            var slider = $(this);
            var animateLoop;

            var width = parseInt(config.width);
            var slideNum = config.slideNum;
            var itemNum = slider.find('.sprout-slide > li').length;
            var pageNum = Math.ceil(itemNum/slideNum);
            var lastItemNum = itemNum%slideNum;
            var duration = config.duration;
            var autoplay = config.autovalue;
            var autoInterval = config.interval;
            var currentDot = 0;

            var copyFront = false;
            var copyEnd = false;
            var sliderFullWidth = width* pageNum;

            // //先補上空白的 li for 除不盡
            if (lastItemNum == 0){
                var missli = 0;
            } else {
                var missli = slideNum - lastItemNum;
                for ( k = 1 ; k <= missli ; k++ ){
                    slider.find('.sprout-slide > li:last').after('<li> </li>');
                }
            }

            //Initial Layout
            slider.find('.sprout-slide-wrapper').css('width', width);
            slider.find('.sprout-slide').css('width', sliderFullWidth);
            slider.find('.sprout-slide > li').css('width', width/slideNum);


            //清空 舊的 page li
            //解決：如果有重新叫同一個 sider 時出現的 兩倍 li 問題
            slider.find('.sprout-dots').html('');

            //Create Page li
            if (pageNum > 1){
                for( i=1 ; i <= pageNum ; i++ ){
                    slider.find('.sprout-dots').append('<div></div>');
                };

                // SET page attr in li
                // 可能會有需要重複呼叫 slider 針對同一個 element,
                // 所以需要確認是否需要重新編列 Attr --> page
                // 先算出之前有幾頁。
                var oldpage = 0;
                $(slider.find('.sprout-slide > li')).each(function(){
                    if($(this).hasAttr('page')){
                        oldpage++;
                    }
                });

                if( oldpage == pageNum) {
                    //如果頁數一樣的話就不重新編列
                } else {
                    //第一次建立這個 slider，或是頁數不一樣。
                    slider.find('.sprout-slide > li').removeAttr('page');
                    for( i=1 ; i <= pageNum ; i++ ){
                        slider.find('.sprout-slide > li').eq((i-1)*slideNum).attr('page',(i-1));
                    };
                }


                //Active First dots
                slider.find('.sprout-dots div').eq(0).addClass('active');
                //解決：如果有重新叫同一個 sider 時出現的問題，一開始要把 ul margin-left 位置 歸0; 
                slider.find('.sprout-slide').css('margin-left','0px');

                //Fade In Slider
                slider.delay(2000).fadeIn(500);

                // true --> false || true --> true 都先清掉最後一個 timer;
                // 解決 如果第一次呼叫是 autoplay 然後再次呼叫成為不 autoplay 的錯誤;
                clearInterval(parseInt(slider.attr('slide-loop-id')));

                // //Autoplay Slider
                if (autoplay) {
                    restartInterval();
                };
            } else {
                //slider.find('.sprout-dots').hide();
                slider.find('.sprout-arrow').hide();
            }

            //unbind 舊的 function
            //解決：如果有重新叫同一個 sider 時出現的 duplicated function
            slider.find('.sprout-next').unbind("click").bind("click",nextClick);
            slider.find('.sprout-prev').unbind("click").bind("click",prevClick);
            slider.find('.sprout-dots div').unbind("click").bind("click",dotsClick);

            //mobile touch slide
            slider.swipe({
                swipe:function(event, direction, distance, duration, fingerCount) {
                    //alert("You swiped " + direction);  
                    if (direction == 'left'){
                        //console.debug('swipe'+animateLoop);
                        //clearInterval(animateLoop);
                        animateSlide('right');
                    } else if (direction == 'right'){
                        //console.debug('swipe'+animateLoop);
                        //clearInterval(animateLoop);
                        animateSlide('left');
                    }
                },
                //Default is 75px, set to 0 for demo so any distance triggers swipe
                 threshold:75
            });

            function nextClick(){
                //console.debug('right');
                animateSlide('right');
            }
            function prevClick(){
                //console.debug('left');
                animateSlide('left');
            }
            function dotsClick(){
                //console.debug('dots');
                if ( $(this).index() == currentDot){
                    //console.debug('no move');
                } else {
                    animateSlide($(this).index());
                }
            }

            function restartInterval(){
                //console.debug('last-loop'+animateLoop);
                //clearInterval(animateLoop);
                animateLoop = setInterval(function(){animateSlide('right');},autoInterval);
                slider.attr('slide-loop-id',animateLoop);
                //console.debug('new-loop'+animateLoop);
            }

            function animateSlide(where){
                //console.debug('last-loop'+animateLoop);
                clearInterval(animateLoop);
                slider.find('.sprout-next').unbind("click",nextClick);
                slider.find('.sprout-prev').unbind("click",prevClick);
                slider.find('.sprout-dots div').unbind("click",dotsClick);
                
                //add animateTimer function to end of animation queue
                if (autoplay) {
                    restartInterval();
                };

                //取得現在 active 的點, 並且移除所有 active;
                currentDot = slider.find('.sprout-dots .active').index();
                slider.find('.sprout-dots div').removeClass('active');

                /* using a if statement and the where variable check 
                we will check where the user wants to slide (left or right)*/  
                if(where == 'left'){  
                    //...calculating the new left indent of the unordered list (ul) for left sliding  
                    var left_indent = parseInt(slider.find('.sprout-slide').css('margin-left')) + width;
                    currentDot = currentDot-1;
                    if (currentDot < 0){
                        currentDot = currentDot+pageNum;
                    }
                } else if (where == 'right'){  
                    //...calculating the new left indent of the unordered list (ul) for right sliding  
                    var left_indent = parseInt(slider.find('.sprout-slide').css('margin-left')) - width;
                    currentDot = currentDot+1;
                    if (currentDot >= pageNum){
                        currentDot = 0;
                    }
                } else {
                    // animate to page 'where' value;
                    //console.log('currentDot'+currentDot);
                    //console.log('where'+where);
                    var old_indent = parseInt(slider.find('.sprout-slide li[page="'+currentDot+'"]').offset().left);
                    var new_indent = parseInt(slider.find('.sprout-slide li[page="'+where+'"]').offset().left);
                    var left_indent = parseInt(slider.find('.sprout-slide').css('margin-left')) - (new_indent - old_indent);
                    
                    //console.log('old_indent'+old_indent);
                    currentDot = where;
                }

                if(left_indent > 0){
                    //alert('左邊沒了');
                    copyFront = true;
                    for (j = 0 ; j < slideNum*(pageNum-1) ; j++ ){
                        slider.find('.sprout-slide > li:first').before(slider.find('.sprout-slide > li:last'));
                    }
                    slider.find('.sprout-slide').css('margin-left',(pageNum-1)*(-1)*width);
                    var left_indent = parseInt(slider.find('.sprout-slide').css('margin-left')) + width;
                } else if(left_indent <= sliderFullWidth*(-1)){
                    //alert('右邊沒了');
                    copyEnd = true;
                    for (j = 0 ; j < slideNum*(pageNum-1) ; j++ ){
                        slider.find('.sprout-slide > li:last').after(slider.find('.sprout-slide > li:first'));
                    }
                    slider.find('.sprout-slide').css('margin-left','0px');
                    var left_indent = parseInt(slider.find('.sprout-slide').css('margin-left')) - width;
                }

                //make the sliding effect using jQuery's animate function... '  
                slider.find('.sprout-slide:not(:animated)').animate({'margin-left' : left_indent},duration,function(){  

                    //...and then just get back the default left indent  
                    slider.find('.sprout-dots div:eq('+currentDot+')').addClass('active');

                    if(copyFront){
                        //恢復原狀
                        //alert('恢復原狀copyFront');
                        for (j = 0 ; j < slideNum ; j++ ){
                            slider.find('.sprout-slide > li:first').before(slider.find('.sprout-slide > li:last'));
                        }
                        slider.find('.sprout-slide').css('margin-left',(pageNum-1)*(-1)*width);
                        copyFront = false;
                    } else if(copyEnd){
                        //恢復原狀
                        //alert('恢復原狀copyEnd');
                        for (j = 0 ; j < slideNum ; j++ ){
                            slider.find('.sprout-slide > li:last').after(slider.find('.sprout-slide > li:first'));
                        }
                        slider.find('.sprout-slide').css('margin-left','0px');
                        copyEnd = false;
                    } 

                    slider.find('.sprout-next').bind("click",nextClick);
                    slider.find('.sprout-prev').bind("click",prevClick);
                    slider.find('.sprout-dots div').bind("click",dotsClick);
                });
            }  
        });
    }
});