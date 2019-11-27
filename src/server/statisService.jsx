/* * @Author: jingaier  * @Date: 2019-11-05 22:15:06  * @Last Modified by: jingaier  * @Last Modified time: 2019-11-05 22:15:06  */

import Mutil  from 'util/mutil.jsx';
const _mm = new Mutil();
class Statis{
    //首页 统计
    getHomeCount(){
        return _mm.request({
            'type':'get',
            'url':'/manage/statistic/base_count.do'
        })
    }
    //产品列表页
    getProductList(pageNum){
        return _mm.request({
            'type':'get',
            'url':'/manage/product/list.do',
            'data':{
                pageNum:pageNum
            }
        })
    }

}
export default Statis;