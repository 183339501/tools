// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2016-01-21 15:09:04.43
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2016-1-21 8:9:4.18
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
对url的参数转换成key-value的对象
parseQueryUrl("baidu.com?parmas1=a&params2=key"); ===>{params1 : "a",params2 : "key"}
*/
function parseQueryUrl(url) {
	var reg_url = /^[^\?]+\?([\w\W]+)$/,
		reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
		arr_url = reg_url.exec(url),
		ret = {};
		if (arr_url && arr_url[1]) {
			var str_para = arr_url[1], result;
			while ((result = reg_para.exec(str_para)) != null) {
				ret[result[1]] = result[2];
			}
		}
	return ret;
}

/**
判断数组中是否有重复的元素
**/
function assertArrRepeat(arr){
	var hash = {};
	for(var i in arr) {
		if(hash[arr[i]])
			return true;
		hash[arr[i]] = true;
	}
	return false;
};

/**
mac地址格式化
**/
String.prototype.toMac  = function () {
	return this.match( /.{1,2}/g).join(":");
}

/**
string format 
var str = "hello {0}";
str.format("world")   ===> hello world
**/
String.prototype.format = function () {  
    var s = this,  
        i = arguments.length;  
  
    while (i--) {  
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);  
    }  
    return s;  
};  

/****返回页面顶部*****/
function backTop(btnId) {
    var btn = document.getElementById(btnId);
    var d = document.documentElement;
    var b = document.body;
    window.onscroll = set;
    btn.style.display = "none";
    btn.onclick = function() {
        btn.style.display = "none";
        window.onscroll = null;
        this.timer = setInterval(function() {
            d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
            b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
            if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);
            }, 10);
    };
    function set() {
        btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block': "none"
    }
};
backTop('goTop');

/*************表格分页*****************/
function TablePage (id,size){
        var $table = $(id);
        var currentPage = 0;  //当前页
        var pageSize = size;  //每页行数（不包括表头）
        $table.bind("repaginate", function() {
            $table.find("tbody tr").hide().slice(currentPage * pageSize, (currentPage + 1) * pageSize).show();
        });
        var numRows = $table.find("tbody tr").length;  //记录宗条数
        var numPages = Math.ceil(numRows/pageSize);    //总页数
        var $pager = $(' <nav><div>总<b>'+numRows+'</b>条记录数&nbsp;&nbsp;&nbsp;共<b>'+numPages+'</b>页</div> <ul class="pagination"> <li> <a href="javascript:;" aria-label="Previous" id="Prev"> &laquo;</a> </li></ul></nav>');  //分页div
        for( var page = 0; page < numPages; page++ ) {
            $("<li><a href='javascript:;' id='"+(page+1)+"'>"+ (page+1) +"</a></li>")
                .bind("click", { "newPage": page }, function(event){
                    currentPage = event.data["newPage"];
                    $(this).attr("class","active");
                    $(this).siblings().removeClass("active");
                    $table.trigger("repaginate");
                }).appendTo($pager.find(".pagination"));
        }
        var next=$('<li><a href="javascript:;" aria-label="Next" id="Next">&raquo;</a></li>');
        $pager.find(".pagination").append(next);
        $pager.insertAfter($table);//分页div插入table
        $("#1").parent().attr("class","active");
        $table.trigger("repaginate");
        $("#Prev").bind("click",function(){
            var prev=Number($(".pagination .active").find("a").text())-2;
            currentPage=prev;
            if(currentPage<0) {
                return;
            }
            $("#"+$(".pagination .active").find("a").text()).parent().removeClass("active");
            $("#"+(prev+1)).parent().addClass("active");
            $table.trigger("repaginate");
        });
        $("#Next").bind("click",function(){
            var next=$(".pagination .active").find("a").attr("id");
            currentPage=Number(next);
            if((currentPage+1)>numPages) {
                return;
            }
            $("#"+(currentPage+1)).parent().attr("class","active");
            $("#"+(currentPage)).parent().removeClass("active");
            $table.trigger("repaginate");
        });
    }

/***************常用正则***********************/
//正整数
/^[0-9]*[1-9][0-9]*$/;
//负整数
/^-[0-9]*[1-9][0-9]*$/;
//正浮点数
/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;   
//负浮点数
/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;  
//浮点数
/^(-?\d+)(\.\d+)?$/;
//email地址
/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
//url地址
/^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;
或：^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$ 
//年/月/日（年-月-日、年.月.日）
/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
//匹配中文字符
/[\u4e00-\u9fa5]/;
//匹配帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线)
/^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;
//匹配空白行的正则表达式
/\n\s*\r/;
//匹配中国邮政编码
/[1-9]\d{5}(?!\d)/;
//匹配身份证
/\d{15}|\d{18}/;
//匹配国内电话号码
/(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;
//匹配IP地址
/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
//匹配首尾空白字符的正则表达式
/^\s*|\s*$/;
//匹配HTML标记的正则表达式
< (\S*?)[^>]*>.*?|< .*? />;
//提取信息中的网络链接
(h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)? 
//提取信息中的邮件地址
\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)* 
//提取信息中的图片链接
(s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)? 
//提取信息中的 IP 地址
(\d+)\.(\d+)\.(\d+)\.(\d+)
//取信息中的中国手机号码
(86)*0*13\d{9} 
//提取信息中的中国邮政编码
[1-9]{1}(\d+){5} 
//提取信息中的浮点数（即小数）
(-?\d*)\.?\d+ 
//提取信息中的任何数字
(-?\d*)(\.\d+)?
//电话区号
^0\d{2,3}$
//帐号（字母开头，允许 5-16 字节，允许字母数字下划线）
^[a-zA-Z][a-zA-Z0-9_]{4,15}$ 
//中文、英文、数字及下划线
^[\u4e00-\u9fa5_a-zA-Z0-9]+$
