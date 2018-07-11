import Ajax from '../ajax'
import Type from 'react-ui/type'
export default {

	upload(file, suc, err){
	   	var data = file
	   	if(!Type.isPlainObject(file)){
	   	  data =  {
  	        name: file.name,
  	        file: file
  	      }
	   	}
		return Ajax.postFormData({
          url: '/oss/uploadFile',
          data: data,
  	      success: suc,
  	      error: err
        })
	}
}