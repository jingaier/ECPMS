/* 
* @Author: jingaier  
* @Date: 2019-10-22 22:10:26  
 * @Last Modified by: jingaier
 * @Last Modified time: 2019-10-22 22:20:25
*/
import React from 'react';

class PageTitle extends React.Component{
    constructor(props) {
        super(props);
        
    }
    
    componentWillMount() {
        document.title = this.props.title+'-HI YONSEN';
    }
    
    render() {
        return(
            <div className="row">
                <div className="col-md-12">
                    <h4 className="page-header">{this.props.title}</h4>
                    {this.props.children}
                </div>   
            </div>
        )
    }
}
export default PageTitle;