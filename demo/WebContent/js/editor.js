/**
 * 
 */
Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget='side';
	
	//创建文本上传域
	var exteditor =  new Ext.form.HtmlEditor({		//创建一个新的html编辑器
		fieldLabel:'描述'
	});
	
	//整合KE编辑器
	var keeditor = new Ext.form.TextArea({			//创建一个新的TexArea
		id:'keeditor',
		fieldLabel:'员工描述',
		width:700,
		height:200
	});
	
	var form = new Ext.form.FormPanel({
		frame:true,
		title:'表单标题',
		style:'margin:10px',
		items:[exteditor,keeditor],
		listeners:{
			'render':function(){
				KE.show({
					id:'keeditor',
					imageUploadJson:'../../jsp/upload_json.jsp'//keeditor上传图片的后台执行文件
				});
				setTimeout("KE.create('keeditor');",1000);
			}		//监听表单的render事件，
		}
	});
	
	//窗体
	var win = new Ext.Window({
		title:'窗口',
		width:900,
		height:700,
		resizable:true,
		modal:true,
		closable:true,
		maximizable:true,
		minizable:true,
		buttonAlign:'center',
		items:form
	});
	win.show();
});