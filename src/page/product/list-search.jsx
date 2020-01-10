/* * @Author: jingaier  * @Date: 2019-11-11 22:56:25  * @Last Modified by: jingaier  * @Last Modified time: 2019-11-11 22:56:25  */

import React from 'react';
import Product from 'server/productService.jsx';
import Mutil  from 'util/mutil.jsx';

const _mm = new Mutil();
const _product  = new Product();
 class ListSearch extends React.Component{
     constructor(props) {
         super(props);  
         this.state = {
            searchType:'productId',
            searchKeyword:''
         }
     }
     componentDidMount() {
         //this.loadProductList()
     }
     
     // 表单-
     onValueChange(e){
        let name = e.target.name;
        let value = e.target.value.trim();
        console.log(name,value);
        this.setState({
            [name] : value
        })
    }
    //筛选内容
    // onInputChange(e){
    //     let name = e.target.name;
    //     let value = e.target.value.trim();
    //     console.log(name,value);
    //     this.setState({
    //         [name] : value
    //     })
    // }
     // 查询按钮
     onSearch(){
         let searchType = this.state.searchType;
         let searchKeyword = this.state.searchKeyword;
        // _product.seatchProductList({
        //     productId:productId,
        //     status:newStatus
        // }).then(res =>{
        //     _mm.successTips(res);
        //     this.loadProductList();
        // },errMsg =>{
        //     _mm.errorTips(errMsg);
        // })
        this.props.onSearch(searchType,searchKeyword);
     }
     // 回车键 自动查询
     onSearchKeyUp(){
        this.onSearch();
     }
     render(){
         
         return(          
            <div className="row">
                <div className="search-wrap col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control"
                            name="searchType"
                            onChange={(e)=>this.onValueChange(e)}
                            >
                                <option value="productId">按商品id查询</option>
                                <option value="productName">按商品名称查询</option>
                            </select>
                        </div>
                        <div className="form-group" >
                            <input type="text" className="form-control" 
                            placeholder="关键词" 
                            name="searchKeyword" 
                            onChange={e=>this.onValueChange(e)}/>
                        </div>
                        <button type="button" className="btn btn-default" onClick={()=>this.onSearch()}>查询</button>
                    </div>
                </div>            
            </div>
         )
     }
 }
 export default ListSearch;