/* * @Author: jingaier  * @Date: 2019-10-15 09:54:01  * @Last Modified by: jingaier  * @Last Modified time: 2019-10-15 09:54:01  *//* 
* @Author: jingaier 
* @Date: 2019-09-29 22:35:48  
 * @Last Modified by: jingaier
 * @Last Modified time: 2020-01-07 23:43:12
*/
import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'page/home/index.jsx';
import UserList from 'page/user/index.jsx';
import OrderList from 'page/order/index.jsx';
import ProductRouter from 'page/product/router.jsx';
import Login from 'page/login/index.jsx';
import ErrorPage from 'page/error/index.jsx';
import Layout from 'component/layout/index.jsx';
import OrderDetail from 'page/order/detail.jsx';
//import 'font-awesome/css/font-awesome.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";
class App extends React.Component{
    render(){
        return(
            
            <Router>
            <Switch>
              <Route  path="/login" component={Login}></Route>
              <Route  path="/" render={props =>(
                <Layout>
                  <Switch>
                    <Route exact path="/" component={Home}></Route>
                    {/*<Redirect from="*" to="/"></Redirect>*/}
                    <Route  path="/product" component={ProductRouter}></Route>
                    <Route  path="/order/index" component={OrderList}></Route>
                    <Route  path="/order/detail/:orderNumber" component={OrderDetail}></Route>
                    <Redirect from="/order" to="/order/index"></Redirect>
                    <Route  path="/product-category" component={Home}></Route>
                    <Route  path="/user/index" component={UserList}></Route>
                    <Redirect from="/user" to="/user/index"></Redirect>
                    <Route  component={ErrorPage}></Route>
                  </Switch>
                </Layout>
              )}></Route>
            </Switch>
          </Router>   
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('app')
);
//
/**
 * !
 * ?
 * TODO
 * 
 */
////nihaode 