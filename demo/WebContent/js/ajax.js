/**
 * 
 */

Ext.onReady(function(){
	//创建panel
	var panel = new Ext.Panel({
		title:'Ajax与数据显示',
		width:200,
		height:200,
		frame:true
	});
	//创建数据显示模板
	var template = new Ext.XTemplate(
			'<table id="temlate">',
				'<tr><td>编号:</td><td>{id}</td></tr>',
				'<tr><td>姓名:</td><td>{name}</td></tr>',
				'<tr><td>生日:</td><td>{birthday}</td></tr>',
				'<tr><td>身高:</td><td>{height}</td></tr>',
				'<tr><td>性别:</td><td>{sex}</td></tr>',
				'<tr><td valign="top">描述:</td><td>{discribe}</td></tr>',
			'</table>'
	);
	
	//获取数据
	Ext.Ajax.request({
		url:'../Ajax.action',
		method:'post',
		params:{id:1},
		success:function(response,options){
			for(i in options){
				alert('options参数名称:'+i);
				alert('options参数['+i+']的值:'+options[i]);
			}
			var responseJson  = Ext.util.JSON.decode(response.responseText);
			template.compile();
			template.overwrite(panel.body,responseJson);
		},
		failure:function(){
			alert('系统出错，请联系管理人员！');
		}
	});
	//创建窗体
	var win = new Ext.Window({
		title:'窗口',
		id:'window',
		width:476,
		height:374,
		resizable:true,
		modal:true,
		closable:true,
		maximizable:true,
		minizable:true,
		items:[panel]
	});
	win.show();
});