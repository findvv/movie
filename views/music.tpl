<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="format-detection" content="telephone=no">
    <title>网易云音乐</title>
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
        overflow: hidden;
        border-bottom: 1px solid #dee4ee;
    }
    a {
        font-size: 14px;
        color: #000;
        text-decoration: none;
    }
    a:hover {
        background-color: #DEE4EE !important;
    }
    .d2 p,.d2 span,.d3 p,.d3 span {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        text-align: center;
        height: 60px;
        line-height: 60px;
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
        <p>网易云音乐TOP500</p>
        <div class="d3">
            <span>歌名</span>
            <span>评论数</span>
        </div>
        <div>
            {% for f in data %}
            <a class="d2" href="{{ f.url }}" target="_blank">
                <span>{{ f.title }}</span>
                <span>{{ f.total }}</span>
            </a>
            {% endfor %}
        </div>
    </div>
  </body>
</html>

