'use strict';
var superagent = require('superagent');
superagent
    .post('http://www.189.cn/dqmh/order/getTaoCan.do')
    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36')
    .set("Cookie",'lvid=87cd39ac4c849cdf685382e3a817bdb9; nvid=1; insight_v=20151104; Hm_lvt_9d01594786901ca044cde7cbbb796727=1487493826; Hm_lpvt_9d01594786901ca044cde7cbbb796727=1488431818; Hm_lvt_2e629dae6af3fccff6fc5bcc4e9e067e=1489034727; Hm_lpvt_2e629dae6af3fccff6fc5bcc4e9e067e=1489034727; internal_search_flag=0; trkHmCoords2=800%2C80%2C890%2C116%2C4508; trkintaid=1; i_sess=%20in_cmpid%3Djt15-xym1-zsthr%3B; citrix_ns_id=GVZvUA2cuoI2KeUlwZTW05Dm+M8A030; citrix_ns_id_.189.cn_%2F_wlf=TlNDX3h1LTIyMi42OC4xODUuMjI5?NsNVGZ1ouCBNq/CMOEeCK+p6z4YA&; _gscu_1708861450=89114182hkb05674; _gscbrs_1708861450=1; jiathis_rdc=%7B%22http%3A//www.189.cn/products/1001384915.html%3Fintaid%3Dbj-sy-jkxy-y5-iFreeup%22%3A1356840788%2C%22http%3A//www.189.cn/products/0601393848.html%3Fintaid%3Dbj-sy-swc-y4-ifreeswk%22%3A1357051253%2C%22http%3A//www.189.cn/products/19736155136.html%3Fintaid%3Dbj-sy-hxfw-03%26intaid%3Dbj-sy-hxfw-05-%22%3A1357058998%2C%22http%3A//www.189.cn/products/10013106396.html%22%3A-1315327123%2C%22http%3A//www.189.cn/search/keyword/10001/%25E7%2588%25B1%25E7%258E%25A9%3Finternal_search%3D1%22%3A-1311178569%2C%22http%3A//www.189.cn/products/1001384915.html%3Fintaid%3Dbj-sy-xy-z5-iFree4g%22%3A-1243048484%2C%22http%3A//www.189.cn/products/1001384915.html%22%3A-1242999943%2C%22http%3A//www.189.cn/products/1001370668.html%3Fintaid%3Dbj-sy-yjlm-2-01-%22%3A-1242976160%2C%22http%3A//www.189.cn/search/keyword/10001/ifree%3Finternal_search%3D1%22%3A-1242963548%2C%22http%3A//www.189.cn/products/10103100562.html%3Fintaid%3Dhl-sy-yd-02%22%3A-1241403064%2C%22http%3A//www.189.cn/products/10013106396.html%3Fcmpid%3Dbj-wt-bd-pbk-02%22%3A-1241117372%2C%22http%3A//www.189.cn/search/keyword/10001/%25E7%259F%25AD%25E4%25BF%25A1%25E8%25BD%25AC%25E7%25A7%25BB%3Finternal_search%3D1%22%3A0%7C1489113566843%2C%22http%3A//www.189.cn/products/10013101824.html%22%3A%220%7C1489115430379%22%7D; SSON=47d2f220d2c15982db75a7ba333455dd844b1b869e2d8e5924f52a9916e6bcafa8b837f8d771bbbbed9cb41a7e7a0b5c9e2abc9f6fe38f7e; trkHmCitycode=0; trkHmPageName=%2Fbj%2F; trkHmCoords=0; trkHmCity=0; trkHmLinks=0; JSESSIONID-JT=46BBF3AADD28F4304F2F546ED01F977E-n2; aactgsh111220=15311422452; userId=201%7C162794170; isLogin=logined; .ybtj.189.cn=8E57A02A6172CF81E4918A278C2DF15E; loginStatus=logined; trkHmClickCoords=568%2C1049%2C2604; cityCode=bj; SHOPID_COOKIEID=10001; s_fid=6DA2B9776F36A131-2A04579F46EC70BE; trkId=8E7D82CE-3806-488B-B896-09916824C635; s_sq=%5B%5BB%5D%5D; s_cc=true')
    .end(function(err,res){
        console.log(JSON.parse(res.text).obj.my189datarebean.flowsBalanceAmount);
    })

// var App = require('alidayu-node');
// var app = new App('23694811', 'b091afbd3710748cc4a53c7e058b2fc0');
 
// app.smsSend({
//     sms_free_sign_name: '注册验证', //短信签名，参考这里 http://www.alidayu.com/admin/service/sign
//     sms_param: JSON.stringify({"code": "123456", "product": "测试网站"}),//短信变量，对应短信模板里面的变量
//     rec_num: '1531142', //接收短信的手机号
//     sms_template_code: 'SMS_640004' //短信模板，参考这里 http://www.alidayu.com/admin/service/tpl
// });