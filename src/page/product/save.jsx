/* * @Author: jingaier  * @Date: 2019-11-12 23:02:38  * @Last Modified by: jingaier  * @Last Modified time: 2019-11-12 23:02:38  */

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
 class ProductSave extends React.Component{
     constructor(props) {
         super(props);  
         this.state = {
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
         
     }
     //品类选择器的变化
     onCategoryChange(categoryId,parentCategoryId){
        console.log(categoryId,parentCategoryId);
        this.setState({
            categoryId:categoryId,
            parentCategoryId:parentCategoryId,
        })
     }
     //图片上传成功
     onUploadSuccess(res){
        let subImages = this.state.subImages;
        console.log('subImages=',subImages);
        console.log('res=',res);
        subImages.push(res)
        this.setState({
            subImages:subImages
        })
        console.log('tupian=',subImages);
        // subImages.push(res);
        // subImages.map((url,index)=>{
        //     <div key={index}><img src={url}/></div>
        // })

     }
     //图片上传失败
     onUploadError(err){
        _mm.errorTips(err);
     }
     //删除图片
     onImageDelete(e){
        let index = parseInt(e.target.getAttribute('index'));
        let subImages = this.state.subImages;
        subImages.splice(index,1);
        this.setState({
            subImages:subImages
        })
     }
     //富文本编辑器的变化
     onDetailValueChange(value){
        console.log(value);
        this.setState({
            detail:value
        })
     }
     //获取图片 uri 拼接
     getSubImagesString(){
         return this.state.subImages.map(image=>image.uri).join(',');
     }
     //
     onValueChange(e){
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]:value
        })
     }
     //提交表单
     onSubmit(e){
        let product={
            name:this.state.name,
            subtitle:this.state.subtitle,
            price:parseFloat(this.state.price),
            stock:parseInt(this.state.stock),
            detail:this.state.detail,
            status:this.state.status,
            categoryId:parseInt(this.state.categoryId),
            //parentCategoryId:0,
            subImages:this.getSubImagesString(),
        }
        let productCheckDefault = _product.checkProduct(product);
        if(productCheckDefault.status){
            _product.saveProduct(product).then((res)=>{
                _mm.successTips(res.data);
            },err=>{
                _mm.errorTips(err.message)
            })
        }else{
            _mm.errorTips(productCheckDefault.message)
        }
     }
     render(){
        
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
                                name="name" 
                                onChange ={(e)=>this.onValueChange(e)} 
                                placeholder="请输入商品名称"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品描述</label>
                            <div className="col-md-5">
                                <input type="text" className="form-control" name="subtitle" onChange ={(e)=>this.onValueChange(e)}  placeholder="请输入商品描述"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">所属分类</label>
                            <Selector onCategoryChange={(categoryId,parentCategoryId) => this.onCategoryChange(categoryId,parentCategoryId)}/>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品价格</label>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <input type="number" className="form-control" onChange ={(e)=>this.onValueChange(e)}  placeholder="价格" name="price"/>
                                    <div className="input-group-addon">元</div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品库存</label>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <input type="number" className="form-control" name="stock" onChange ={(e)=>this.onValueChange(e)}  placeholder="库存"/>
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
                            <div className="img-con col-md-offset-2 col-md-10">
                                
                                <FileUploader 
                                onSuccess={(res)=>this.onUploadSuccess(res)}
                                onError={(err)=>this.onUploadError(err)}>请上传图片</FileUploader>
                            </div>
                    
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品详情</label>
                            <div className="col-md-10">
                                <Editor onValueChange={value=>this.onDetailValueChange(value)}/>
                            </div>
                            
                        </div>
                        <div className="form-group">
                            <div className="col-md-offset-2 col-md-10">
                                <button type="btn" className="btn btn-xl btn-primary" onClick={(e)=>this.onSubmit(e)}>提交</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         )
     }
 }
 export default ProductSave;