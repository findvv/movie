<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="format-detection" content="telephone=no">
    <title>李毅吧热帖</title>
  </head>
  <style type="text/css">
  a {
    font-size: 14px;
    color: #000;
    text-decoration: none;
  }
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
    .p1 {
        width: 100px;
        text-align: center;
    }
    .p2 {
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
    a:hover {
        background-color: #fafcff;
    }
  </style>
  <body>
    <div class="d1">
        <p>李毅吧热帖</p>
        <div class="d3">
            <p class="p1">回复数</p>
            <p class="p2">标题</p>
        </div>
        <div>
            {% for f in data %}
            <a class="d2" href="{{ f.url }}">
                <p class="p1">{{ f.num }}</p>
                <p class="p2">{{ f.title }}</p>
            </a>
            {% endfor %}
        </div>
    </div>
  </body>
</html>

