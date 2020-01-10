/* * @Author: jingaier  * @Date: 2020-01-06 23:11:15  * @Last Modified by: jingaier  * @Last Modified time: 2020-01-06 23:11:15  */
import React from 'react';
import Product from 'server/productService.jsx';
import Mutil  from 'util/mutil.jsx';

const _mm = new Mutil();
const _product  = new Product();
 class ListSearch extends React.Component{
     constructor(props) {
         super(props);  
         this.state = {
            orderNumber:''
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
        let orderNumber = this.state.orderNumber;
        this.props.onSearch(orderNumber);
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
                                <option value="">订单编号</option>
                            </select>
                        </div>
                        <div className="form-group" >
                            <input type="text" className="form-control" 
                            placeholder="订单号" 
                            name="orderNumber" 
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