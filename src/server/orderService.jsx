/* * @Author: jingaier  * @Date: 2019-11-07 22:41:43  * @Last Modified by: jingaier  * @Last Modified time: 2019-11-07 22:41:43  */
import Mutil  from 'util/mutil.jsx';
const _mm = new Mutil();
class Order{
    //产品列表页
    getOrdertList(listParam){
        let URL = '',
            data = {};
        if(listParam.listType === 'list'){
            URL = '/manage/order/list.do';
            data.pageNum = listParam.pageNum;    
        }else if(listParam.listType === 'search'){
           //let URL = ;//商品搜索
           URL = '/manage/order/search.do';
           data.pageNum = listParam.pageNum;
           data.orderNo = listParam.orderNo; 
        }
        return _mm.request({
            'type':'get',
            'url':URL,
            'data':data
        })
        
    }
    
    // 商品详情
    getOrderDetail(orderNo){
        return _mm.request({
            'type':'get',
            'url':'/manage/order/detail.do',
            'data':{
                orderNo:orderNo
            }
        })
    }
    //立即发送
    sendGood(orderNo){
        return _mm.request({
            'type':'get',
            'url':'/manage/order/send_goods.do',
            'data':{
                orderNo:orderNo
            }
        })
    }
}
export default Order;