/* * @Author: jingaier  
* @Date: 2019-11-18 22:13:05  
 * @Last Modified by: jingaier
 * @Last Modified time: 2019-11-19 15:22:33
*图片上传
*/
import React from 'react';
import FileUpload from './FileUpload.jsx';
class FileUploader extends React.Component{
    render(){
        let {onSuccess,onError} = this.props;
        /*set properties*/
        const options={
            baseUrl:'/manage/product/upload.do',
            fileFieldName:'upload_file',
            dataType:'json',
            chooseAndUpload:true,
            beforeChoose:()=>{
                
            },
            uploadSuccess:res=>{
                onSuccess(res.data)
            },
            uploadError:(err)=>{
                onError(err.message || '图片上传失败！')
            }
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload options={options}>
                <button ref="chooseAndUpload">请选择上传图片</button>
            </FileUpload>
        )	        
    }
}
export default FileUploader