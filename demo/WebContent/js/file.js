/**
 * 
 */

Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget='side';
	
	var imagebox = new Ext.BoxComponent({
		autoEl:{
			style:'width:150px;height:150px;margin:0px auto;border:1px solid #ccc;text-align:center;padding-top:20px;margin-bottom:10px',
			tag:'div',
			id:'imageshow',
			html:'暂无图片'
				
		}
	});
	
	//创建文本上传域
	var file=new Ext.form.TextField({
		name:'imgFile',
		fieldLabel:'文件上传',
		inputType:'file',
		allowBlank:false,
		blankText:'请浏览图片'
	});
	
	//提交按钮处理方法
	var btnsubmitclick = function(){
		if(form.getForm().isValid()){
			form.getForm().submit({
				waitTitle:"请稍后",
				waitMsg:'正在上传...',
				success:function(form,action){
					Ext.MessageBox.alert("提示","上传成功");
					document.getElementById('imageshow').innerHTML='<img style="width:150px;hight:150px" src="'+action.result.path+'">'
				},
				failure:function(){
					Ext.MessageBox.alert("提示", "上传失败");
				}
			});
		}
	}
	
	//重置按钮点击时处理方法
	var btnresetclick = function(){
		form.getForm().reset();
	}
	
	//表单
	var form = new Ext.form.FormPanel({
		frame:true,
		fileUpload:true,
		enctype: 'multipart/form-data',
		url:'../Upload.action',
		title:'上传测试',
		style:'margin:10px',
		items:[imagebox,file],
		buttons:[{
			text:'保存',
			handler:btnsubmitclick
		},{
			text:'重置',
			handler:btnresetclick
		}]
	});
	
	//窗体
	var win = new Ext.Window({
		title:'窗口',
		width:476,
		height:374,
		resizable:true,
		modal:true,
		closable:true,
		maximizable:true,
		minimizable:true,
		buttonAlign:'center',
		items:form
	});
	win.show();
});