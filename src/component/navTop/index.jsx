/*
 * @Author: jingaier
 * @Date: 2019-10-21 17:14:15
 * @Last Modified by: jingaier
 * @Last Modified time: 2019-10-30 23:44:18
 */
import React from "react";
import { Link } from "react-router-dom";
import User from 'server/userService.jsx';
import Mutil  from 'util/mutil.jsx';
const _mm = new Mutil();
const _user  = new User();
import "font-awesome/css/font-awesome.min.css";
class NavTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:_mm.getStorage('userInfo').username || ''
    }
  }
  // 退出登录
  onLogout() {
    _user.logout().then(res => {
      _mm.removeStorage('userInfo');
      // this.props.history.push('/login')
      window.location.href = '/login';
    },(errMsg =>{
      _mm.errorTips(errMsg);
    }))
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/">
                <b>HI</b>YonSen
                </Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                <a
                    className="dropdown-toggle"
                    href="javascript:;"
                    aria-expanded="false"
                >
                    <i className="fa fa-user fa-fw"></i>
                    <span>欢迎、{this.state.username}</span>
                    <i className="fa fa-caret-down"></i>
                </a>
                <ul className="dropdown-menu dropdown-user">
                    <li>
                    <a href="javascript:;" onClick={() => this.onLogout()}>
                        <i className="fa fa-sign-out fa-fw"></i>
                        <span>退出</span>
                    </a>
                    </li>
                </ul>
                </li>
            </ul>
        </nav>
      </div>
    );
  }
}
export default NavTop;
