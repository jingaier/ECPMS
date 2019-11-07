/* * @Author: jingaier
 * @Date: 2019-10-22 23:11:16
 * @Last Modified by: jingaier
 * @Last Modified time: 2019-10-30 22:53:48
 *
 * */
import React from "react";
// import PageTitle from 'component/pageTitle/index.jsx'
import User from 'server/userService.jsx';
import Mutil  from 'util/mutil.jsx';
const _mm = new Mutil();
const _user  = new User();
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            redirect: _mm.getUrlParam('redirect') || '/'
        }
    }
    /* onUsernameChange(e){
        console.log(e.target.value);
        this.setState({
            username : e.target.value
        })
    }
    onPasswordChange(e){
        console.log(e.target.value);
        this.setState({
            password : e.target.value
        })
    } */
    onInputChange(e){
        let inputValue = e.target.value,
            inputName = e.target.name;
            console.log('inputValue',inputValue);
            console.log('inputName',inputName);
            this.setState({
                [inputName]:inputValue
            })
    }
    onSubmit(){

        let loginInfo = {
            username:this.state.username,
            password:this.state.password
        }
        let checkResult = _user.checkLoginInfo(loginInfo);
        if(checkResult.status){

            _user.login(loginInfo).then((res) => {
                console.log('成功了===',this.state.redirect)
                console.log(window.history)
                _mm.setStorage('userInfo',res);
                this.props.history.push(this.state.redirect)
            },(errMsg) =>{
                console.log(this.state.redirect)
                _mm.errorTips(errMsg);
            })
        }else{
            _mm.errorTips(checkResult.msg);
        }
    }
    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default">
                    <div className="panel-heading">欢迎访问 YonSen</div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <label for="exampleInputEmail1">用户名</label>
                                <input type="text" className="form-control" name="username" placeholder="输入用户名" onChange={e => this.onInputChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">密码</label>
                                <input type="password" className="form-control" name="password" placeholder="输入密码"  onChange={e => this.onInputChange(e)}/>
                            </div>                       
                            <button type="button" className="btn btn-lg btn-primary btn-block" onClick={e => this.onSubmit()}>登录</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;
