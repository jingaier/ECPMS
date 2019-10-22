/* * @Author: jingaier  * @Date: 2019-10-15 09:54:01  * @Last Modified by: jingaier  * @Last Modified time: 2019-10-15 09:54:01  *//* 
* @Author: jingaier 
* @Date: 2019-09-29 22:35:48  
 * @Last Modified by: jingaier
 * @Last Modified time: 2019-10-22 21:55:19
*/
import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'page/home/index.jsx';
import Layout from 'component/layout/index.jsx';
//import 'font-awesome/css/font-awesome.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";
  // function Home() {
  //   return (
  //     <div>
  //       <h2>Home</h2>
  //       <a class="btn btn-default" href="#" role="button">Link</a>
  //       <button class="btn btn-default" type="submit">Button</button>
  //       <input class="btn btn-default" type="button" value="Input"/>
  //       <input class="btn btn-default" type="submit" value="Submit"/>
  //     </div>
  //     )
  // }
  
  function About() {
    return <h2>About</h2>;
  }
  
  function Users() {
    return <h2>Users</h2>;
  }
class App extends React.Component{
    render(){
        return(
            
            <Router>
            <Layout>
              <Switch>
                <Route exact path="/" component={Home}></Route>
                {/*<Redirect from="*" to="/"></Redirect>*/}
                <Route  path="/product" component={Home}></Route>
                <Route  path="/product-category" component={Home}></Route>
              </Switch>
            </Layout>
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