/* * @Author: jingaier  
* @Date: 2020-01-07 22:59:34  
 * @Last Modified by: jingaier
 * @Last Modified time: 2020-01-10 22:01:22
* 订单详情页
*/
import React from 'react';
import PageTitle from 'component/pageTitle/index.jsx';
import TableList from 'util/TableList/index.jsx';
import Order from 'server/orderService.jsx';
import Mutil  from 'util/mutil.jsx';
const _mm = new Mutil();
const _order  = new Order();
 class OrderDetail extends React.Component{
     constructor(props) {
         super(props);  
         this.state = {
            orderNumber:this.props.match.params.orderNumber,
            orderInfo:{}
         } 
     }
     componentDidMount() {
         this.loadOrderDetail();
     }
     loadOrderDetail(){ 
        _order.getOrderDetail(this.state.orderNumber).then(res=>{
            
            this.setState({
                orderInfo:res
            })
        },err=>{

        })
         
     }
    // 立即发送 按钮
    onSendGood(){
        if(window.confirm('是否立即发送？')){
            _order.sendGood(this.state.orderNumber).then(res=>{
                _mm.successTips('发送成功')
            },err=>{
                _mm.errorTips(err)
            })
        }
        
    }
     render(){
         let {orderInfo} = this.state;
        
         let tableHeads = [
            {name:'商品图片',width:'20%'},
            {name:'商品信息',width:'30%'},
            {name:'单价',width:'15%'},
            {name:'数量',width:'15%'},
            {name:'合计',width:'20%'}
        ]
        let orderItemVoList = orderInfo.orderItemVoList || [];
        console.log('orderInfo=',orderInfo);
        console.log('orderItemVoList=',orderInfo.orderItemVoList);
         return(
            <div id="page-wrapper">
                <PageTitle title="订单详情"/>
                <div className="form-wrap col-md-12">
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label className="col-md-2 control-label">订单号:</label>
                            <div className="col-md-5">
                                <p type="text" className="form-control-static">{orderInfo.orderNo}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">创建时间：</label>
                            <div className="col-md-5">
                                <p type="text" className="form-control-static">{orderInfo.createTime}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">收件人：</label>
                            <div className="col-md-5">
                                <p type="text" className="form-control-static">{orderInfo.receiverName}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">订单状态：</label>
                            <div className="col-md-5">
                                <p type="text" className="form-control-static">{orderInfo.statusDesc}
                                {orderInfo.status === 20?<button className="btn btn-default btn-sm" onClick={(e)=>this.onSendGood(e)}>立即发送</button>:null}
                                </p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">支付方式：</label>
                            <div className="col-md-5">
                                <p type="text" className="form-control-static">{orderInfo.paymentTypeDesc}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">订单金额：</label>
                            <div className="col-md-5">
                                <p type="text" className="form-control-static">￥{orderInfo.payment}</p>
                            </div>
                        </div>
                        
                    </div>
                    <TableList tableHeads={tableHeads}>
                    {
                        orderItemVoList.map((orderItem,index)=>{
                            return <tr key={index}>
                            <td>
                            <img  className="p-img" src={`${orderItem.productImage}`}></img>
                            </td>
                            <td>{orderItem.productName}</td>
                            <td>￥{orderItem.currentUnitPrice}</td>
                            <td>
                                {orderItem.quantity}
                            </td>
                            <td>￥{orderItem.totalPrice}</td>
                            </tr>
                        })
                    }
                    </TableList>   
                </div>
            </div>
         )
     }
 }
 export default OrderDetail;