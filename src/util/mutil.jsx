

/**
 * @type 请求方式
 * @url  请求地址
 * @dataType 数据类型
 * @data 数据
 */
class Mutil {
    request(param){
        return new Promise((resolve,reject)=>{
            $.ajax({
                type    : param.type || 'get',
                url     : param.url ||'',
                dataType: param.dataType || 'json',
                data    : param.data || null,
                success :(res)=>{
                    if(res.status === 0){// 成功返回
                        typeof resolve === 'function' && resolve(res.data,res.msg);
                    }else if (res.status === 10){//检测未登录，强制去登录
                        this.doLogin()
                    }else{
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error :(err)=>{
                    typeof reject === 'function' && reject(err.statusText);
                }
            })
        })
    }
    //跳转登录页
    doLogin(){
        window.location.href = '/login?redirect='+ encodeURIComponent(window.location.pathname);//encodeURIComponent 对URL 特殊字符做处理
    }
    // 获取URL参数
    getUrlParam(name){
        // ?param=123&param1=456
        let queryString = window.location.search.split('?')[1]||'';
        let reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
        let result = queryString.match(reg)
        //result = ['param=123','','123']
        return result ? decodeURIComponent(result) : null;
    }
    // 错误提示
    errorTips(errMsg){
        alert(errMsg || '错误')
    }
    // 本地存储
    setStorage(key,val){
        let type = typeof val;
        if(type === 'object'){//对象类型
            window.localStorage.setItem(key,JSON.stringify(val));
        }else if(['number','string','boolean'].indexOf(type) >=0){//基本类型
            window.localStorage.setItem(key,val);
        }else{//不支持类型
            alert('不支持的类型，不能存储！')
        }
    }
    getStorage(key){
        let val = window.localStorage.getItem(key);
        if(val){
            return JSON.parse(val);
        }else{
            return '';
        }
    }
    removeStorage(key){
        window.localStorage.removeItem(key);
    }
}

export default Mutil;