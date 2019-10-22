/*
 * @Author: jingaier
 * @Date: 2019-10-21 17:14:15
 * @Last Modified by: jingaier
 * @Last Modified time: 2019-10-22 20:59:42
 */
import React from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
class NavTop extends React.Component {
  constructor(props) {
    super(props);
  }
  // 退出登录
  onLogout() {}
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
                    <span>welcom,YonSen</span>
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
