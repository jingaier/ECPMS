/* * @Author: jingaier  
* @Date: 2019-11-19 22:22:28  
 * @Last Modified by: jingaier
 * @Last Modified time: 2019-12-02 23:00:41
* 二次封装simditor 富文本编辑器
*/
import React from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';
class Editor extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.loadEditor();
    }
    componentWillReceiveProps(nextProps){
        let detailChange = this.props.defaultDetail !== nextProps.defaultDetail;//不相等的时候才调用这方法
        if(detailChange){
            this.simditor.setValue(nextProps.defaultDetail);
        }
        
    }
    //加载富文本编辑器
    loadEditor(){
        let ele = this.refs['textarea'];
        this.simditor = new Simditor({
            textarea:$(ele),
            placeholder:this.props.placeholder || '请输入要编辑的内容',
            upload:{
                url:'/manage/product/richtext_img_upload.do',
                defaultImage:'',
                filekey:'upload_file'
            }
        })
        this.bindEditorEvent();
    }
    //初始化富文本编辑器的事件
    bindEditorEvent(){
        this.simditor.on('valuechanged',e=>{
            console.log('初始化：'+ e);
            this.props.onValueChange(this.simditor.getValue())
        })
    }
    render(){
        return(
            <div className="rich-editor">
                <textarea ref="textarea"></textarea>               
            </div>
        )
    }
}
export default Editor;