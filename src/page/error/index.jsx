/* * @Author: jingaier  * @Date: 2019-11-05 23:22:16  * @Last Modified by: jingaier  * @Last Modified time: 2019-11-05 23:22:16  */
import React from 'react';
import PageTitle from 'component/pageTitle/index.jsx';
import {Link} from "react-router-dom";
 class Error extends React.Component{
     constructor(props) {
         super(props);  
     }
     render(){

         return(
            <div id="page-wrapper">
                <PageTitle title="Error"></PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <span>找不到路径</span>
                        <Link to="/">点我返回首页</Link>                            
                    </div>
                </div>
               
            </div>
         )
     }
 }
 export default Error;