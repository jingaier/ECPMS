/* * @Author: jingaier  
* @Date: 2019-12-03 17:18:40  
 * @Last Modified by: jingaier
 * @Last Modified time: 2020-01-07 23:15:33
* 订单管理列表页 
*/

import React from 'react';
import {Link} from "react-router-dom";
import Pagination from 'util/pagination/index.jsx';
import TableList from 'util/TableList/index.jsx';
import ListSearch from '../order/orderListSearch.jsx';
import Order from 'server/OrderService.jsx';
import Mutil  from 'util/mutil.jsx';
//import './index.scss';
const _mm = new Mutil();
const _order  = new Order();
 class OrderList extends React.Component{
     constructor(props) {
         super(props);  
         this.state = {
            list:[],
            pageNum:1,
            total:0,
            value:'',
            listType:'list' // list 或 search
         }
         this.onSearch = this.onSearch.bind(this);
     }
     componentDidMount() {
         this.loadOrderList()
     }
     //数据渲染
     loadOrderList(){
         let {listType,pageNum} = this.state;
         console.log(listType,pageNum);
         let listParam = {
             listType:listType,
             pageNum:pageNum
         }
         // 如果是搜索的话，需要传入搜索类型和搜索关键字
         if(listType === 'search'){
             let {searchType,searchKeyword} = this.state;
             listParam.orderNo = this.state.orderNo;
             //listParam.keyword = searchKeyword;
         }
        _order.getOrdertList(listParam).then(res =>{
            this.setState(res)
         },errMsg=>{
            this.setState({
                list:[]
            }) 
            _mm.errorTips(errMsg)
         })
     }
     // 分页
     onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadOrderList()
        })
     }
     // 表单
     onInputChange(e){
        console.log(e.target.value);
        this.setState({
            value : e.target.value
        })
    }
    
     // 查询
     onSearch(orderNumber){
         let listType = orderNumber === ''?'list':'search';
         /* let searchInfo = {
            [searchType]:searchKeyword
         } */
         //console.log(searchInfo);
         this.setState({
             listType:listType,
             pageNum:1,
             orderNo:orderNumber,
            //  searchKeyword:searchKeyword
         },()=>{
            this.loadOrderList();
         })
        
     }
     render(){
         let tableHeads = [
             {name:'订单号',width:'20%'},
             {name:'收件人',width:'15%'},
             {name:'订单状态',width:'15%'},
             {name:'订单总价',width:'15%'},
             {name:'创建时间',width:'20%'},
             {name:'操作',width:'15%'},
         ]
         return(
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">订单管理</h1>
                    </div>
                </div>
                <ListSearch onSearch={(orderNumber) => this.onSearch(orderNumber)}></ListSearch>
                <TableList tableHeads={tableHeads}>
                {
                    this.state.list.map((order,index)=>{
                        return <tr key={index}>
                           <td>
                           <Link className="btn opear" to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                           </td>
                           <td>{order.receiverName}</td>
                           <td>{order.statusDesc}</td>
                           <td>
                               ￥{order.payment}
                           </td>
                           <td>{order.createTime}</td>
                           <td>
                               <Link className="btn opear" to={`/order/detail/${order.orderNo}`}>详情</Link>
                           </td>
                           
                        </tr>
                    })
                }
                </TableList>   
                <Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum)=>this.onPageNumChange(pageNum)}></Pagination>          
            </div>
         )
     }
 }
 export default OrderList;