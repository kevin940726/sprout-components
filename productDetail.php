<?php
    include("source/head.php");
    require("apo/sqldata.php");

    if(isset($_GET['type'])){
        $type = $_GET['type'];
    }else{
        $type = 'all';
    }

    if(isset($_GET['department'])){
        $department = $_GET['department'];
        $productSelectSql = $dbConnect->prepare("SELECT p.*, pd.`department_id`, pd.`product_id`
                                                FROM `products` as p
                                                LEFT JOIN `products_departments` as pd
                                                    on p.`product_id` = pd.`product_id`
                                                WHERE pd.`department_id` = ?
                                                ORDER BY p.`product_id` DESC ;");
        $productSelectSql->execute(array($department));
        $productSelectDetail = $productSelectSql->fetchAll(PDO::FETCH_ASSOC);
        $count = $productSelectSql->rowCount();

        $departmentSelectSql = $dbConnect->prepare("SELECT d.*, pd.`department_id`, pd.`product_id`
                                                FROM `departments` as d
                                                LEFT JOIN `products_departments` as pd
                                                    on d.`department_id` = pd.`department_id`
                                                WHERE d.`department_id` = ?
                                                ORDER BY d.`ranks` DESC ;");
        $departmentSelectSql->execute(array($department));
        $departmentSelectDetail = $departmentSelectSql->fetch(PDO::FETCH_ASSOC);

        //HACKMOD
        $depRefArr = array('microscope'=>'m','endoscope'=>'e','highcamera'=>'h','biology'=>'b');



        if( isset($depRefArr[$departmentSelectDetail['category']]) ){
            $type = $depRefArr[$departmentSelectDetail['category']];
        }

    }else{
        $department = null;
    }
    $doc_dir = 'upload/doc';
?>

<body rel="productDetail">
    <?php include('source/nav.php'); ?>

    <link type="text/css" rel="stylesheet" href="css/productDetail.css">
    <script src="js/yuanli.js" charset="utf-8"></script>

    <script type="text/javascript" src="library/jquery.nyroModal.custom.min.js"></script>
    <link type="text/css" rel="stylesheet" href="library/nyroModal.css">

    <style>
    section .tabs>li>.tab-content p {
        text-align: left;
        display: block;
    }
    section .tabs>li>.tab-content > div {
        text-align: center;
    }
    section .tabs>li>.tab-content img {
        margin: 20px;
        width: auto;
        max-width: 80%;
        display: block;
        margin: 20px auto;
    }
    .product-list ul a.active {
        margin-bottom: 10px;
    }
    </style>

    <?php
            if($type == 'all' || $type == 'm') {
    ?>          <div class="list-title">
                    <img src="images//bl-squ.svg"></img>
                    <li>工業顯微鏡</li>
                    <span><?php echo $departmentSelectDetail['name_tw'] ?></span>
                </div>
    <?php   }
    ?>
    <?php
            if($type == 'all' || $type == 'e') {
    ?>          <div class="list-title">
                    <img src="images//bl-squ.svg"></img>
                    <li>工業內視鏡</li>
                    <span><?php echo $departmentSelectDetail['name_tw'] ?></span>
                </div>
    <?php   }
    ?>
    <?php
            if($type == 'all' || $type == 'h') {
    ?>          <div class="list-title">
                    <img src="images//bl-squ.svg"></img>
                    <li>高速攝影機</li>
                    <span><?php echo $departmentSelectDetail['name_tw'] ?></span>
                </div>
    <?php   }
    ?>
    <?php
            if($type == 'all' || $type == 'b') {
    ?>          <div class="list-title">
                    <img src="images//bl-squ.svg"></img>
                    <li>生物顯微鏡</li>
                    <span><?php echo $departmentSelectDetail['name_tw'] ?></span>
                </div>
    <?php   }
    ?>


    <!-- <div class="scroll-up">查看其他產品<i class="fa fa-arrow-up"></i></div> -->

    <div class="product-intro-all">
            <div class="product-list">
                <ul>
                    <?php
                        foreach ($productSelectDetail as $key => $value) {
                    ?>      <a href="#product-branch" class="active">
                                <div class="img">
                                    <img src="upload/products/<?php echo $value['product_id'] ?>.jpg?=<?php echo strtotime($value['time_update']) ?>">
                                </div>
                                    <div>
                                        <h4><?php echo $value['title']?></br><?php echo $value['model']?></h4>
                                        <p>
                                        <?php
                                            if ($value['desc']==null || (mb_strlen( $value['desc'], "utf-8") < 45)) {
                                                echo $value['desc'];
                                            }else{
                                                echo mb_substr($value['desc'],0,50,'utf8').'<span style="color: #102A7C; font-size: 12px;">......more</span>';
                                            }
                                        ?>
                                        </p>
                                    </div>
                            </a>
                <?php   }
                ?>
                </ul>
            <?php
                    if ($count>4) {
            ?>         <div class="more">載入更多</div>
            <?php   }
            ?>
            </div>

            <section class="product-branch" id="product-branch">

            <?php
                $firstClass = 'active';

                foreach ($productSelectDetail as $key => $value) {
            ?>      <div class="product-branch-sub <? echo $firstClass ?>" data-id="<?php echo $value['product_id']?>">
                        <div class="product-master">
                            <div class="product-img">
                                <div class="img" style="background-image: url('upload/products/<?php echo $value['product_id']?>.jpg?t=<?php strtotime($value['time_update'])?>'), url(images/yuanli-default-pic.png);"></div>
                            </div>
                            <div class="product-title">
                                <span><?php echo $value['title']?></span>
                                <?php echo $value['model']?><p><?php echo $value['desc']?></p>
                                <ul class="product-button">
                                <a href="contact.php?vehicle=askPrice&model=<?php echo $value['model']?>">詢價</a>
                                <a href="contact.php?vehicle=help&model=<?php echo $value['model']?>">技術支援</a>
                                <a href="contact.php?vehicle=demo&model=<?php echo $value['model']?>">Demo</a>
                                <?php
                                    if($value['pdf'] != ''){
                                ?>      <a href="<? echo $doc_dir.$value['pdf'] ?>" class="pdf" target="_blank"><i class="fa fa-file-pdf-o"></i>PDF</a>
                                <?  }
                                ?>
                            </ul>
                            </div>

                        </div>

                        <ul class="tabs">
                    <?php  if($value['feature'] != ''){
                    ?>          <li>
                                    <label class="checked" for="tab1">產品特色</label>
                                    <div class="tab-content">
                                        <p><? echo str_replace("../upload/pic/", "upload/pic/", $value['feature'])?></p>
                                    </div>
                                </li>
                    <?php   }

                            if($value['observe'] != ''){
                    ?>          <li>
                                    <label for="tab2">影像觀察</label>
                                    <div class="tab-content">
                                        <p><? echo str_replace("../upload/pic/", "upload/pic/", $value['observe'])?></p>
                                    </div>
                                </li>
                    <?php      }

                            if($value['capture'] != ''){
                    ?>          <li>
                                    <label for="tab3">影像擷取</label>
                                    <div class="tab-content">
                                        <p><? echo str_replace("../upload/pic/", "upload/pic/", $value['capture'])?></p>
                                    </div>
                                </li>
                    <?php   }

                            if($value['measure'] != ''){
                    ?>          <li>
                                    <label for="tab4">精密量測</label>
                                    <div class="tab-content">
                                        <p><? echo str_replace("../upload/pic/", "upload/pic/", $value['measure'])?></p>
                                    </div>
                                </li>
                    <?php   }

                            if($value['report'] != ''){
                    ?>          <li>
                                    <label for="tab5">製作報告</label>
                                    <div class="tab-content">
                                        <p><? echo str_replace("../upload/pic/", "upload/pic/", $value['report'])?></p>
                                    </div>
                                </li>
                    <?php   }

                            if($value['spec'] != ''){
                    ?>          <li>
                                    <label for="tab5">技術規格</label>
                                    <div class="tab-content">
                                        <p><? echo str_replace("../upload/pic/", "upload/pic/", $value['spec'])?></p>
                                    </div>
                                </li>
                    <?php   }

                            if($value['example'] != ''){
                    ?>          <li>
                                    <label for="tab5">應用實例</label>
                                    <div class="tab-content">
                                        <p><? echo str_replace("../upload/pic/", "upload/pic/", $value['example'])?></p>
                                    </div>
                                </li>
                    <?php   }

                            if($value['software'] != ''){
                    ?>          <li>
                                    <label for="tab5">啟動軟體</label>
                                    <div class="tab-content">
                                        <p><? echo str_replace("../upload/pic/", "upload/pic/", $value['software'])?></p>
                                    </div>
                                </li>
                    <?php   }

                            if($value['video'] != ''){
                    ?>          <li>
                                    <label for="tab5">多媒體</label>
                                    <div class="tab-content video">
                                        <?php
                                            // http://stackoverflow.com/questions/5830387/how-to-find-all-youtube-video-ids-in-a-string-using-a-regex/5831191#5831191
                                            // Linkify youtube URLs which are not already links.
                                            function linkifyYouTubeURLs($text) {
                                            $text = preg_replace('~
                                                # Match non-linked youtube URL in the wild. (Rev:20130823)
                                                https?://         # Required scheme. Either http or https.
                                                (?:[0-9A-Z-]+\.)? # Optional subdomain.
                                                (?:               # Group host alternatives.
                                                  youtu\.be/      # Either youtu.be,
                                                | youtube         # or youtube.com or
                                                  (?:-nocookie)?  # youtube-nocookie.com
                                                  \.com           # followed by
                                                  \S*             # Allow anything up to VIDEO_ID,
                                                  [^\w\s-]       # but char before ID is non-ID char.
                                                )                 # End host alternatives.
                                                ([\w-]{11})      # $1: VIDEO_ID is exactly 11 chars.
                                                (?=[^\w-]|$)     # Assert next char is non-ID or EOS.
                                                (?!               # Assert URL is not pre-linked.
                                                  [?=&+%\w.-]*    # Allow URL (query) remainder.
                                                  (?:             # Group pre-linked alternatives.
                                                    [\'"][^<>]*>  # Either inside a start tag,
                                                  | </a>          # or inside <a> element text contents.
                                                  )               # End recognized pre-linked alts.
                                                )                 # End negative lookahead assertion.
                                                [?=&+%\w.-]*        # Consume any URL (query) remainder.
                                                ~ix',
                                                'https://www.youtube.com/embed/$1',
                                                $text);
                                            return $text;
                                            }

                                            $videos = explode(",", $value['video']);
                                            foreach($videos as $video) {
                                        ?>      <iframe width="640" height="360" src="<?php echo linkifyYouTubeURLs(trim($video)) ?>" frameborder="0" allowfullscreen></iframe>
                                        <?  }
                                        ?>
                                    </div>
                                </li>
                    <?php   }
                            $relProductsSelectSql = $dbConnect->prepare("SELECT p.*
                                                                         FROM `products_rel_products` AS prp
                                                                         LEFT JOIN `products` AS p
                                                                            ON prp.`rel_product_id` = p.`product_id`
                                                                         WHERE prp.`product_id` = ? AND p.`status` = 'publish' ;");
                            $relProductsSelectSql->execute(array($value['product_id']));
                            $relProductsSelectDetail = $relProductsSelectSql->fetchAll(PDO::FETCH_ASSOC);
                            if($relProductsSelectDetail != null ){
                    ?>          <li>
                                    <label for="tab5">相關產品</label>
                                    <div class="tab-content">
                                    <ul class="compatibility">
                                    <?php
                                            $relProductsSelectSql = $dbConnect->prepare("SELECT p.*
                                                                                         FROM `products_rel_products` AS prp
                                                                                         LEFT JOIN `products` AS p
                                                                                            ON prp.`rel_product_id` = p.`product_id`
                                                                                         WHERE prp.`product_id` = ? AND p.`status` = 'publish' ;");
                                            $relProductsSelectSql->execute(array($value['product_id']));
                                            $relProductsSelectDetail = $relProductsSelectSql->fetchAll(PDO::FETCH_ASSOC);
                                            foreach ($relProductsSelectDetail as $key => $value) {
                                                if($relProductsSelectDetail[$key]['pdf'] != ''){
                                                    $pdf = '<a href="'.$doc_dir.'/'.$relProductsSelectDetail[$key]['pdf'].'" class="pdf" target="_blank"><i class="fa fa-file-pdf-o"></i>Brochure</a>';
                                                }else{
                                                    $pdf = '';
                                                }
                                    ?>          <li>
                                                    <a href="#"><img src="upload/products/<?php echo $relProductsSelectDetail[$key]['product_id'] ?>.jpg?t=<?php echo strtotime($relProductsSelectDetail[$key]['time_update'])?>" alt=""></a>
                                                    <h5 class="list-header"><a href="#"><span><?php echo $relProductsSelectDetail[$key]['title'] ?></span><?php echo $relProductsSelectDetail[$key]['model']?></a></h5>
                                                    <p class="detail"><?php echo nl2br($relProductsSelectDetail[$key]['brief'])?></p>
                                                    <?php echo $pdf ?>
                                                </li>
                                    <?php   }
                                    ?>
                                    </ul>
                    <?php   }
                    ?>
                        </ul>
                    </div>
            <?php   $firstClass = '';
                }
            ?>
        </section>
    </div>

    <?php include('source/footer.php'); ?>


    <script>
    function getQueryVariable(variable)
    {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
       }
       return(false);
    }

        function expandOnFirstTab() {
            var tab = $($('.tabs > li > label')[0]);
            tab.addClass('checked');
        }

        $(window).load(function() {
            var maxHeight = Math.max.apply(
                null,
                $('.product-list ul a.active')
                    .toArray()
                    .map(function(a) {
                        console.log($(a).height());
                        return $(a).height();
                    })
            );

            $('.product-list ul a.active').css('height', maxHeight);

            $('.tab-content img').attr("href", function() {
                return $(this).attr("src");
            }).nm();

            if (window.location.search && getQueryVariable('id')) {
                $('.product-branch-sub').removeClass('active');
                $('.product-branch-sub > label').removeClass('checked');
                $('.product-branch-sub[data-id="' + getQueryVariable('id') + '"]').addClass('active');
                $('.product-branch-sub[data-id="' + getQueryVariable('id') + '"] > label').addClass('checked');
                $('.product-branch-sub[data-id="' + getQueryVariable('id') + '"] > .tabs > li:first-of-type > label').addClass('checked');
                $('html,body').animate({
                    scrollTop: $('.product-branch-sub[data-id="' + getQueryVariable('id') + '"]').offset().top - 50
                }, 1000);
            }
        });

        $(window).load(function() {
            $('.tabs').css('height', $('.tabs > li > label.checked ~ .tab-content').height() + 120);
        });
    </script>

</body>

</html>
