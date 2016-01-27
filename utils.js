// ��Date����չ���� Date ת��Ϊָ����ʽ��String
// ��(M)����(d)��Сʱ(h)����(m)����(s)������(q) ������ 1-2 ��ռλ����
// ��(y)������ 1-4 ��ռλ��������(S)ֻ���� 1 ��ռλ��(�� 1-3 λ������)
// ���ӣ�
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2016-01-21 15:09:04.43
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2016-1-21 8:9:4.18
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //�·�
        "d+": this.getDate(), //��
        "h+": this.getHours(), //Сʱ
        "m+": this.getMinutes(), //��
        "s+": this.getSeconds(), //��
        "q+": Math.floor((this.getMonth() + 3) / 3), //����
        "S" : this.getMilliseconds() //����
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
��url�Ĳ���ת����key-value�Ķ���
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
�ж��������Ƿ����ظ���Ԫ��
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
mac��ַ��ʽ��
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

/****����ҳ�涥��*****/
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

/***************��������***********************/
//������
/^[0-9]*[1-9][0-9]*$/;
//������
/^-[0-9]*[1-9][0-9]*$/;
//��������
/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;   
//��������
/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;  
//������
/^(-?\d+)(\.\d+)?$/;
//email��ַ
/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
//url��ַ
/^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;
��^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$ 
//��/��/�գ���-��-�ա���.��.�գ�
/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
//ƥ�������ַ�
/[\u4e00-\u9fa5]/;
//ƥ���ʺ��Ƿ�Ϸ�(��ĸ��ͷ������5-10�ֽڣ�������ĸ�����»���)
/^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;
//ƥ��հ��е�������ʽ
/\n\s*\r/;
//ƥ���й���������
/[1-9]\d{5}(?!\d)/;
//ƥ�����֤
/\d{15}|\d{18}/;
//ƥ����ڵ绰����
/(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;
//ƥ��IP��ַ
/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
//ƥ����β�հ��ַ���������ʽ
/^\s*|\s*$/;
//ƥ��HTML��ǵ�������ʽ
< (\S*?)[^>]*>.*?|< .*? />;
//��ȡ��Ϣ�е���������
(h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)? 
//��ȡ��Ϣ�е��ʼ���ַ
\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)* 
//��ȡ��Ϣ�е�ͼƬ����
(s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)? 
//��ȡ��Ϣ�е� IP ��ַ
(\d+)\.(\d+)\.(\d+)\.(\d+)
//ȡ��Ϣ�е��й��ֻ�����
(86)*0*13\d{9} 
//��ȡ��Ϣ�е��й���������
[1-9]{1}(\d+){5} 
//��ȡ��Ϣ�еĸ���������С����
(-?\d*)\.?\d+ 
//��ȡ��Ϣ�е��κ�����
(-?\d*)(\.\d+)?
//�绰����
^0\d{2,3}$
//�ʺţ���ĸ��ͷ������ 5-16 �ֽڣ�������ĸ�����»��ߣ�
^[a-zA-Z][a-zA-Z0-9_]{4,15}$ 
//���ġ�Ӣ�ġ����ּ��»���
^[\u4e00-\u9fa5_a-zA-Z0-9]+$