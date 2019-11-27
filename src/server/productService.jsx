/* * @Author: jingaier  * @Date: 2019-11-07 22:41:43  * @Last Modified by: jingaier  * @Last Modified time: 2019-11-07 22:41:43  */
import Mutil  from 'util/mutil.jsx';
const _mm = new Mutil();
class Product{
    //产品列表页
    getProductList(listParam){
        let URL = '',
            data = {};
        if(listParam.listType === 'list'){
            URL = '/manage/product/list.do';
            data.pageNum = listParam.pageNum;    
        }else if(listParam.listType === 'search'){
           //let URL = ;//商品搜索
           URL = '/manage/product/search.do';
           data.pageNum = listParam.pageNum;
           data[listParam.searchType] = listParam.keyword; 
        }
        return _mm.request({
            'type':'get',
            'url':URL,
            'data':data
        })
        
    }
    //设置商品状态
    setProductStatus(productInfo){
        return _mm.request({
            'type':'post',
            'url':'/manage/product/set_sale_status.do',
            'data':productInfo
        })
    }
    //商品分类
    getFirstCategory(parentCategoryId){//
        return _mm.request({
            'type':'post',
            'url':'/manage/category/get_category.do',
            'data':{
                categoryId:parentCategoryId||0
            }
        })
    }
    //
    /**商品 参数 验证
     * @param 商品信息
     * @returns status 校验状态
     * @returns message 校验提示语
     */ 
    checkProduct(product){
        if(typeof product.name !=='string'||product.name === ''){
            return {
                status:false,
                message:'请输入商品名称'
            }
        }
        if(typeof product.subtitle !=='string'||product.subtitle === ''){
            return {
                status:false,
                message:'请输入商品描述'
            }
        }
        if(typeof product.categoryId !=='number'||!(product.categoryId > 0)){
            return {
                status:false,
                message:'请选择商品分类'
            }
        }
        if(typeof product.price !=='number'||!(product.price >= 0)){
            return {
                status:false,
                message:'请输入商品价格'
            }
        }
        if(typeof product.stock !=='number'||!(product.stock >= 0)){
            return {
                status:false,
                message:'请输入商品库存'
            }
        }
        if(typeof product.subImages !=='string'||product.subImages === ''){
            return {
                status:false,
                message:'请上传图片'
            }
        }
        if(typeof product.detail !=='string'||product.detail === ''){
            return {
                status:false,
                message:'请输入商品详情'
            }
        }
        return{
            status:true,
            message:'校验成功！'
        }
    }
    // 商品 添加 保存
    saveProduct(product){
        return _mm.request({
            'type':'post',
            'url':'/manage/product/save.do',
            'data':product
        })
    }

}
export default Product;