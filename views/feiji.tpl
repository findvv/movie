<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="format-detection" content="telephone=no">
    <title>北京出发机票</title>
  </head>
  <style type="text/css">
    .d1 {
        width: 95%;
        margin: 50px auto 0;
    }
    .d2,.d3 {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        border-bottom: 1px solid #dee4ee;
    }
    a {
        font-size: 14px;
        color: #000;
        text-decoration: none;
    }
    .d2 p,.d3 p {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        text-align: center;
    }
    .d3 {
        background: #DEE4EE;
    }
    .d2:nth-child(even) {
        background-color: #fff;
    }
    .d2:nth-child(odd) {
        background-color: #fafcff;
    }
  </style>
  <body>
    <div class="d1">
        <p>日期：2017-04-01 -- 2017-04-04</p>
        <p>去哪儿网机票--北京出发<br />（每10分钟更新一次）</p>
        <div class="d3">
            <p>价格</p>
            <p>目的地</p>
            <p>去程时间</p>
            <p>返程时间</p>
        </div>
        <div>
            {% for f in data %}
            <a class="d2" href="{{ f.url }}">
                <p>{{ f.price }}</p>
                <p>{{ f.city }}</p>
                <p>{{ f.gotime }}</p>
                <p>{{ f.backtime }}</p>
            </a>
            {% endfor %}
        </div>
    </div>
  </body>
</html>

