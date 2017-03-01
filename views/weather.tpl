<!DOCTYPE html>
<html>
  <head>
    <title>北京与杭州2017年AQI对比</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <span id="data">{{ data }}</span>
    <script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
    <script type="text/javascript" src="jqplot.js"></script>
  </head>
  <body>
    <div class="help"><span>每日9:00更新</span></div>
    <div class="help">北京平均值：<span class="beijing"></span></div>
    <div class="help">杭州平均值：<span class="hangzhou"></span></div>
    <div id="wrap"></div>
    <script type="text/javascript">
        (function(){
            var datas = $.trim($("#data").text()),
                dataArr = JSON.parse(datas),
                arr = [],data1 = 0, data2 = 0, day = 0, arr1 = [0,0,0,0,0,0],arr2 = [0,0,0,0,0,0], str1 = '', str2 = '';

            for(var t = 0; t < dataArr.length; t++) {
                var obj = dataArr[t],
                    time = obj.time.split('.')[0];

                !arr[time - 1] && (arr[time - 1] = []);
                arr[time - 1].push(obj);
            }


            for(var n = 0; n < arr.length; n++) {
                $('#wrap').append('<div id="chart' + n + '"></div>');

                var x = [],vx = [],vy = [],nums = [],data = arr[n];
                
                for(var i = 0; i < data.length; i++) {
                    var obj = data[i],
                        a = obj['beijing'],
                        b = obj['hangzhou'];

                    vx.push(a);
                    vy.push(b);
                    x.push(obj.time);
                    nums.push(a);
                    nums.push(b);
                    data1 += parseInt(a);
                    data2 += parseInt(b);
                    day += 1;
                    if (a < 50) {
                        arr1[0] += 1;
                    } else if (a < 100) {
                        arr1[1] += 1;
                    } else if (a < 150) {
                        arr1[2] += 1;
                    } else if (a < 200) {
                        arr1[3] += 1;
                    } else if (a < 300) {
                        arr1[4] += 1;
                    } else {
                        arr1[5] += 1;
                    }
                    if (b < 50) {
                        arr2[0] += 1;
                    } else if (b < 100) {
                        arr2[1] += 1;
                    } else if (b < 150) {
                        arr2[2] += 1;
                    } else if (b < 200) {
                        arr2[3] += 1;
                    } else if (b < 300) {
                        arr2[4] += 1;
                    } else {
                        arr2[5] += 1;
                    }
                }

                var vxy = [vx,vy],
                    data_max = Math.max.apply(null,nums) + 100, //Y轴最大刻度
                    line_title = ["北京","杭州"], //曲线名称
                    y_label = "AQI指数", //Y轴标题
                    x_label = "日期", //X轴标题
                    title = "北京与杭州2017年AQI对比(" + (n + 1) + '月)'; //统计图标标题
                setTimeout(function(){
                    j.jqplot.diagram.base(("chart" + n), vxy, line_title, title, x, x_label, y_label, data_max, 0);
                }, 100);
                
            }
            for (var i = 0; i < 6; i++) {
                str1 += '<span style="width:' + (arr1[i]/day*100) + '%"></span>';
                str2 += '<span style="width:' + (arr2[i]/day*100) + '%"></span>';
            }
            $('.beijing').text(parseInt(data1 / day)).parent().append('<div>' + str1 + '</div><p><span>优</span><span></span><span>重度污染</span></p>');
            $('.hangzhou').text(parseInt(data2 / day)).parent().append('<div>' + str2 + '</div><p><span>优</span><span></span><span>重度污染</span></p>');
        })();
    </script>
  </body>
  
</html>

