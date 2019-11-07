/* * @Author: jingaier  * @Date: 2019-11-06 20:42:28  * @Last Modified by: jingaier  * @Last Modified time: 2019-11-06 20:42:28  */
import React from 'react';
import PageTitle from 'component/pageTitle/index.jsx';
import {Link} from "react-router-dom";
import Pagination from 'util/pagination/index.jsx';
import User from 'server/userService.jsx';
import Mutil  from 'util/mutil.jsx';
const _mm = new Mutil();
const _user  = new User();
 class UserList extends React.Component{
     constructor(props) {
         super(props);  
         this.state = {
             list:[],
             pageNum:1,
             total:0,
             firstLoading:true
         }
     }
     componentDidMount() {
         this.loadUserList()
     }
     loadUserList(){
        _user.getUserList(this.state.pageNum).then(res =>{
            this.setState(res,()=>{
                this.setState({
                    firstLoading:false
                })
            });
         },errMsg=>{
            this.setState({
                list:[]
            }) 
            _mm.errorTips(errMsg)
         })
     }
     onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadUserList()
        })
     }
     render(){
         let listBody = this.state.list.map((user,index)=>{
             return <tr key={index}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{new Date(user.updateTime).toLocaleString()}</td>
                <td>{user.question}</td>
             </tr>
         });
         let listError = <tr>
            <td colSpan="6" className="text-center">
            {
                this.state.firstLoading?'正在加载数据...':'抱歉，暂无数据了'
            }
            </td>
         </tr>
         return(
            <div id="page-wrapper">
                <PageTitle title="用户列表"></PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>姓名</th>
                                    <th>手机号</th>
                                    <th>邮箱</th>
                                    <th>更新时间</th>
                                    <th>备注</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        this.state.list.length === 0?listError:listBody
                                    }
                            </tbody>
                        </table>
                        <Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum)=>this.onPageNumChange(pageNum)}></Pagination>          
                    </div>
                </div>
               
            </div>
         )
     }
 }
 export default UserList;