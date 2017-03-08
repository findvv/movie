<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="Android, iOS, Native React, 终端开发">
    <meta name="referrer" content="always">
    <meta name="author" content="ellisxu">
    <link rel="stylesheet" href="stylesheets/index.min.css" />
    <title>奇橙</title>
</head>
<body>
  <div class="navbar">
    <div class="navbar-inner">
      <div class="container">
        <a class="brand" href="/">
          奇橙      
        </a>
      </div>
    </div>
  </div>
  <div id="main">
    <div id="content">
      <div class="panel">
        <div class="header">
          <div class="header-tab">  
              <a href="/" class="topic-tab current-tab">贴吧热帖</a>
              <!-- <a href="http://dev.qq.com/?tab=all" class="topic-tab ">推荐</a>
              <a href="http://dev.qq.com/?tab=tech" class="topic-tab ">技术</a>
              <a href="http://dev.qq.com/?tab=life" class="topic-tab ">生活</a>
              <a href="http://dev.qq.com/?tab=question" class="topic-tab ">问答</a> -->
          </div>
        </div>
        <div class="inner no-padding">
          <div id="topic_list" class="topic_list">
            {% for f in data %}
            <div class="cell">
              <div class="topic_title_wrapper">
                <a class="topic_title" href="{{ f.url }}" title="{{ f.title }}">
                  {{ f.title }}
                </a>
              </div>
              <div class="topic_info">
                <span class="reply_count">
                  <span class="count_of_replies" title="回复数">
                    <a href="{{ f.url }}">{{ f.num }} 条回复</a>
                  </span>
                </span>
              </div>
            </div>
            {% endfor %}
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>