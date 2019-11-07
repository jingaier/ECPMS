/* * @Author: jingaier  * @Date: 2019-11-05 22:15:06  * @Last Modified by: jingaier  * @Last Modified time: 2019-11-05 22:15:06  */

import Mutil  from 'util/mutil.jsx';
const _mm = new Mutil();
class Statis{
    getHomeCount(){
        return _mm.request({
            'type':'get',
            'url':'/manage/statistic/base_count.do'
        })
    }

}
export default Statis;