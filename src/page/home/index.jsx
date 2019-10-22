/* * @Author: jingaier 
 * @Date: 2019-10-20 09:20:16 
 * @Last Modified by: jingaier
 * @Last Modified time: 2019-10-22 22:18:44
  *   
  * */
 import React from 'react';
import PageTitle from 'component/pageTitle/index.jsx'
 class Home extends React.Component{
     render(){
         return(
            <div id="page-wrapper">
                <PageTitle title="首页">
                    <button className="btn-danger">按钮</button>
                </PageTitle>
            </div>
         )
     }
 }
 export default Home;