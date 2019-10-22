/* 
* @Author: jingaier  
* @Date: 2019-10-21 17:14:15  
 * @Last Modified by: jingaier
 * @Last Modified time: 2019-10-21 17:59:17
*/
import React from 'react';
import './theme.css';
import NavTop from 'component/navTop/index.jsx';
import NavSide from 'component/navSide/index.jsx';
class Layout extends React.Component{
    constructor(props) {
        super(props);
        
    }
    render() {
        return(
            <div id="wrapper">
                <NavTop></NavTop>
                <NavSide></NavSide>
                {this.props.children}
            </div>
        )
    }
}
export default Layout;