/* * @Author: jingaier 
 * @Date: 2019-10-20 09:20:16 
 * @Last Modified by: jingaier
 * @Last Modified time: 2019-11-05 23:07:55
  *   
  * */
 import React from 'react';
import PageTitle from 'component/pageTitle/index.jsx';
import {Link} from "react-router-dom";
import './index.scss';
import Statis from 'server/statisService.jsx';
import Mutil  from 'util/mutil.jsx';
const _mm = new Mutil();
const _statistic  = new Statis();
 class Home extends React.Component{
     constructor(props) {
         super(props);
         this.state={
             userCount:'-',
             productCount:'-',
             orderCount:'-'
         }
     }
     componentDidMount() {
         this.loadCount();
     }
     loadCount(){
         _statistic.getHomeCount().then(res =>{
            this.setState(res);
         },errMsg=>{
            _mm.errorTips(errMsg)
         })
     }
     render(){
         console.log(this.state.orderCount)
         return(
            <div id="page-wrapper">
                <PageTitle title="首页">
                    <div className="row">
                        <div className="col-md-4">
                            <Link to="/user" className="color-box brown">
                                <p className="count">{this.state.userCount}</p>
                                <p className="desc">
                                    <i className="fa fa-user-o"></i>
                                    <span>用户总数</span>
                                </p>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="/product" className="color-box green">
                                <p className="count">{this.state.productCount}</p>
                                <p className="desc">
                                    <i className="fa fa-list-o"></i>
                                    <span>商品总数</span>
                                </p>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="/order" className="color-box blue">
                                <p className="count">{this.state.orderCount}</p>
                                <p className="desc">
                                    <i className="fa fa-check-square-o"></i>
                                    <span>订单总数</span>
                                </p>
                            </Link>
                        </div>
                    </div>
                </PageTitle>
            </div>
         )
     }
 }
 export default Home;