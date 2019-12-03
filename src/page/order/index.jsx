/* * @Author: jingaier  
* @Date: 2019-12-03 17:18:40  
 * @Last Modified by: jingaier
 * @Last Modified time: 2019-12-03 17:53:40
* 订单管理列表页 
*/

import React from 'react';
import {Link} from "react-router-dom";
import Pagination from 'util/pagination/index.jsx';
import TableList from 'util/TableList/index.jsx';
import ListSearch from '../product/list-search.jsx';
import Product from 'server/productService.jsx';
import Mutil  from 'util/mutil.jsx';
//import './index.scss';
const _mm = new Mutil();
const _product  = new Product();
 class OrderList extends React.Component{
     constructor(props) {
         super(props);  
         this.state = {
            list:[],
            pageNum:1,
            total:0,
            value:'',
            listType:'list'
         }
         this.onSearch = this.onSearch.bind(this);
     }
     componentDidMount() {
         //this.loadProductList()
     }
     //数据渲染
     loadProductList(){
         let {listType,pageNum} = this.state;
         console.log(listType,pageNum);
         let listParam = {
             listType:listType,
             pageNum:pageNum
         }
         if(listType === 'search'){
             let {searchType,searchKeyword} = this.state;
             listParam.searchType = searchType;
             listParam.keyword = searchKeyword;
         }
        _product.getProductList(listParam).then(res =>{
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
            this.loadProductList()
        })
     }
     // 表单
     onInputChange(e){
        console.log(e.target.value);
        this.setState({
            value : e.target.value
        })
    }
    //切换商品状态
    onSetProductStatus(e,productId,curStatus){
        let newStatus = curStatus === 1?2:1;
        let confirmTips = curStatus === 1?'确定要下架该商品？':'确定要上架该商品？';
        if(window.confirm(confirmTips)){
            _product.setProductStatus({
                productId:productId,
                status:newStatus
            }).then(res =>{
                _mm.successTips(res);
                this.loadProductList();
            },errMsg =>{
                _mm.errorTips(errMsg);
            })
        }
    }
     // 查询
     onSearch(searchType,searchKeyword){
         let listType = searchKeyword === ''?'list':'search';
         /* let searchInfo = {
            [searchType]:searchKeyword
         } */
         //console.log(searchInfo);
         this.setState({
             listType:listType,
             pageNum:1,
             searchType:searchType,
             searchKeyword:searchKeyword
         },()=>{
            this.loadProductList();
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
                <ListSearch onSearch={this.onSearch}></ListSearch>
                <TableList tableHeads={tableHeads}>
                {
                    this.state.list.map((product,index)=>{
                        return <tr key={index}>
                           <td>{product.id}</td>
                           <td>
                                <span>{product.name}</span>
                                <br></br>
                                <span>{product.subtitle}</span>
                           </td>
                           <td>{product.price}</td>
                           <td>
                               {product.status === 1?'在售':'已下架'}
                           </td>
                           <td>
                               <a className="btn btn-xs btn-warning opear" onClick={(e)=>this.onSetProductStatus(e,product.id,product.status)}>{product.status === 1?'下架':'上架'}</a>
                               <Link className="btn opear" to={`/product/detail/${product.id}`}>查看</Link>
                               <Link className="btn opear" to={`/product/save/${product.id}`}>编辑</Link>
                           </td>
                           <td> 
                               <Link className="btn opear" to={`/product/order/${product.id}`}>查看</Link>                        
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