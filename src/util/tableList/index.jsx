/* * @Author: jingaier  
* @Date: 2019-11-07 22:54:08  
 * @Last Modified by: jingaier
 * @Last Modified time: 2019-11-11 10:04:36
* TABLE 表 通用组件
*/
import React from 'react';

 class TableList extends React.Component{
     constructor(props) {
         super(props);  
         this.state={
             isFirstLoading:true
         }
     }
     componentWillReceiveProps(){//组件出发更新时
        //列表只有在第一次挂载是true 其他情况为false
         this.setState({
            isFirstLoading:false
         })
     }
     render(){
         //表头信息
         console.log(this.props.tableHeads)
         let tableHeader = this.props.tableHeads.map(
                (tableHead,index)=>{                
                    if(typeof tableHead === 'object'){
                        return <th key={index} width={tableHead.width}>{tableHead.name}</th> 
                    }else if(typeof tableHead === 'string'){
                        return <th key={index}>{tableHead}</th> 
                    }
                }
         )
         // 列表内容
         let listBody = this.props.children;
         //列表信息
        let listInfo = <tr>
            <td colSpan={this.props.tableHeads.length} className="text-center">
            {
                this.state.isFirstLoading?'正在加载数据...':'抱歉，暂无数据了'
            }
            </td>
        </tr>
        let tableBody = listBody.length > 0?listBody:listInfo
         return(
            <div className="row">
                    <div className="table-wrap col-md-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>{tableHeader}</tr> 
                            </thead>
                            <tbody>
                                 {
                                    tableBody
                                 }   
                            </tbody>
                        </table>
                    </div>
                </div>
         )
     }
 }
 export default TableList;