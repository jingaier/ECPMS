/* * @Author: jingaier  
* @Date: 2019-11-07 22:17:53  
 * @Last Modified by: jingaier
 * @Last Modified time: 2020-01-07 23:05:11
*分路由（不然 总路由内容过于庞大） 
*/
import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from 'page/product/index.jsx';
import ProductSave from 'page/product/save.jsx';
import ProductDetail from 'page/product/detail.jsx';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";
  class ProductRouter extends React.Component{
    render(){
        return(
        <Switch>              
            <Route  path="/product/index" component={ProductList}></Route>
            <Route  path="/product/save/:pid?" component={ProductSave}></Route>
            <Route  path="/product/detail/:pid" component={ProductDetail}></Route>
            <Redirect exact from="/product" to="/product/index"></Redirect>
        </Switch>
        )
    }
}
export default ProductRouter;