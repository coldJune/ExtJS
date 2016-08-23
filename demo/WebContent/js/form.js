/**
 * 
 */

Ext.onReady(function(){
	Ext.lib.Ajax.defaultPostHeader += '; charset=utf-8';
	var form = new Ext.form.FormPanel({			//创建一个新的form表单对象。
		frame:true,								
		title:'表单标题',						//表单标题，不加不会出现浅色表单标题栏
		style:'margin:10px',				//表单的样式，加了个外10px的边框
		html:'<div style="padding:10px">这里表单内容</div>'	//表单内显示的html内容
		
	});
	var win = new Ext.Window({					//创建一个新的Window窗口
		title:'标题',								//窗口的标题
		width:'470',                            //宽度
		height:'500',                           //高度
		html:'<div>这是一个窗口</div>',				//窗体内部显示的html内容
		resizable:true,							//是否可以调整窗体的大小
		modal:true,								//是否为模态窗体【当打开这个窗体后，如果不能对其进行操作，那么这个窗体就是模态窗体】
		closable:true,							//是否可以关闭，也可以理解为是否显示关闭按钮
		maximizable:true,						//是否可以最大化
		minimizable:true,						//是否可以最小化
		items:form
	});
	win.show();									//窗体显示
	
});

