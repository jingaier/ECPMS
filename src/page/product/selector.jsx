/* * @Author: jingaier  
* @Date: 2019-11-12 23:49:12  
 * @Last Modified by: jingaier
 * @Last Modified time: 2019-11-14 16:05:33
* 二级联动组件
*/
import React from 'react';
import './selector.scss';
import Product from 'server/productService.jsx';
import Mutil  from 'util/mutil.jsx';
const _mm = new Mutil();
const _product  = new Product();
class Selector extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            firstCategoryId:0,
            firstCategoryList:[],
            secondCategoryId:0,
            secondCategoryList:[]
        }
    }
    componentDidMount() {
        this.loadFirstCategory();
    }
    // 一级商品分类
    loadFirstCategory(){
        _product.getFirstCategory().then(res => {
            this.setState({
                firstCategoryList:res
            })
        },errMsg =>{
            _mm.errorTips(errMsg)
        })
    }
    // 一级商品分类
    loadSecondCategory(){
        _product.getFirstCategory(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList:res
            })
        },errMsg =>{
            _mm.errorTips(errMsg)
        })
    }
    // 选中一级分类项
    onFirstCategoryChange(e){
        let newValue = e.target.value || 0;
        this.setState({
            firstCategoryId:newValue,
            secondCategoryId:0,
            secondCategoryList:[]
        },()=>{
            //更新二级分类
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        })
    }
    // 选中二级分类项
    onSecondCategoryChange(e){
        let newValue = e.target.value || 0;
        this.setState({
            secondCategoryId:newValue,
            
        },()=>{
            
            this.onPropsCategoryChange();
        })
    }
    //传给父组件选中的结果
    onPropsCategoryChange(){
        //判断 是不是父组件传递了此方法（props是否含有该方法）
        let categoryChangeable = typeof this.props.onCategoryChange === 'function';
        if(this.state.secondCategoryId){//如果有二级分类
            categoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId);
        }else{//如果只有一级分类
            categoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId,0);
        }
    }
    render(){
        return(            
            <div className="col-md-10">
                <select type="password" className="form-control cate-select"
                onChange={(e)=>this. onFirstCategoryChange(e)}
                >
                    <option value="">请选择一级品类</option>
                    {
                        this.state.firstCategoryList.map((category,index)=><option key={index} value={category.id}>{category.name}</option>)
                    }
                </select>
                {
                    this.state.secondCategoryList.length?
                    (<select type="password" className="form-control cate-select"
                    onChange={(e)=>this. onSecondCategoryChange(e)}
                    >
                        <option value="">请选择二级品类</option>
                        {
                            this.state.secondCategoryList.map((category,index)=><option key={index} value={category.id}>{category.name}</option>)
                        }
                    </select>):null
                }
            </div>
        )
    }
}
export default Selector;