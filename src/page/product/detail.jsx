/* * @Author: jingaier  
* @Date: 2019-12-03 10:28:21  
 * @Last Modified by: jingaier
 * @Last Modified time: 2019-12-03 17:10:53
*商品详情页
*/
import React from 'react';
import PageTitle from 'component/pageTitle/index.jsx';
import Selector from './selector.jsx';
import Product from 'server/productService.jsx';
import Mutil  from 'util/mutil.jsx';
import FileUploader  from 'util/file-uploader/index.jsx';
import Editor  from 'util/editor/index.jsx';
import './index.scss';
const _mm = new Mutil();
const _product  = new Product();
 class ProductDetail extends React.Component{
     constructor(props) {
         super(props);  
         this.state = {
            id:this.props.match.params.pid,
            categoryId:0,
            parentCategoryId:0,
            subImages:[],
            name:'',
            subtitle:'',
            price:'',
            stock:'',
            detail:'',
            status:1// 商品状态 默认 在售状态
         }
         
     }
     componentDidMount() {
         this.loadProduct();
     }
     loadProduct(){
        if(this.state.id){//如果有ID 则是编辑
            _product.getProduct(this.state.id).then(res=>{
                console.log('kaishi',res)
                let images = res.subImages.split(',');
                res.subImages = images.map(imgUri =>{
                    return {
                        uri:imgUri.uri,
                        url:res.imageHost + imgUri
                    }
                })
                console.log('res=',res)
                //res.detail = JSON.parse(res.detail)
                this.setState(res)
            },err=>{

            })
         }
     }
    
     render(){
         let {categoryId,parentCategoryId} = this.state;
         return(
            <div id="page-wrapper">
                <PageTitle title="添加商品"/>
                <div className="form-wrap col-md-12">
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品名称</label>
                            <div className="col-md-5">
                                <input type="text" 
                                className="form-control" 
                                readOnly
                                value={this.state.name} 
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品描述</label>
                            <div className="col-md-5">
                                <input type="text" 
                                className="form-control" 
                                readOnly
                                value={this.state.subtitle} 
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">所属分类</label>
                            <Selector 
                            readOnly
                            categoryId={categoryId}
                            parentCategoryId = {parentCategoryId}
                            />
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品价格</label>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <input type="number" 
                                    className="form-control" 
                                    readOnly
                                    value={this.state.price} 
                                    name="price"/>
                                    <div className="input-group-addon">元</div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品库存</label>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <input type="number" 
                                    className="form-control" 
                                    readOnly
                                    value={this.state.stock} 
                                    />
                                    <div className="input-group-addon">件</div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品图片</label>
                            <div className="img-con col-md-10">
                                {
                                    this.state.subImages.length?(this.state.subImages.map((image,index)=>{
                                        return (<div key={index} className="sub-img">
                                            <img className="img" src={image.url}/>
                                            <i className="fa fa-close fa-fw" index={index} onClick={(e)=>this.onImageDelete(e)}></i></div>
                                        )
                                    })):(<div>请上传图片</div>)
                                }
                               
                            </div>
                            
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品详情</label>
                            <div className="col-md-10"
                            dangerouslySetInnerHTML={{__html:`${this.state.detail}`}}
                            >  
                            </div>
                            
                        </div>
                        <div className="form-group">
                            <div className="col-md-offset-2 col-md-10">
                                <button type="btn" className="btn btn-xl btn-primary" onClick={(e)=>this.onSubmit(e)}>关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         )
     }
 }
 export default ProductDetail;