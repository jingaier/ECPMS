/* * @Author: jingaier  
* @Date: 2019-11-06 20:42:28  
 * @Last Modified by: jingaier
 * @Last Modified time: 2019-11-06 22:54:54
* 分页通用组件 
*/
import React from 'react';
import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css'
 class Pagination extends React.Component{
     constructor(props) {
         super(props);  
     }
     render(){
         return(
            <div className="row">
                <div className="col-md-12">
                    <RcPagination {...this.props} hideOnSinglePage showQuickJumper></RcPagination>          
                </div>
            </div>
         )
     }
 }
 export default Pagination;