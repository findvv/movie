'use strict';
var superagent = require('superagent');
var cheerio = require('cheerio');
var co = require('co');
var fs = require('fs');
var SMysql = require('sm-mysql');
var arr = [];
var db = require('../db2.js');


superagent
    .get('http://www.dianping.com/search/category/2/10/p1')
    .end((err,res)=>{
        console.log(res.text);
    });