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
	var template = new Ext.XTemplate(							//创建模板对象，常用于数据显示，也就是开发中常提到的“内容页或详细页”
			'<table id="temlate">',
				'<tr><td>编号:</td><td>{id}</td></tr>',			//中间的{id}占位符要和我们在后台输出json对象对应
				'<tr><td>姓名:</td><td>{name}</td></tr>',			
				'<tr><td>生日:</td><td>{birthday}</td></tr>',
				'<tr><td>身高:</td><td>{height}</td></tr>',
				'<tr><td>性别:</td><td>{sex}</td></tr>',
				'<tr><td valign="top">描述:</td><td>{discribe}</td></tr>',
			'</table>'
	);
	
	//获取数据
	Ext.Ajax.request({											//创建一个AJAX请求
		url:'../Ajax.action',									//请求地址
		method:'post',											//请求方式
		params:{id:1},											//参数
		success:function(response,options){						//成功时执行的方法	response:服务端返回的数据，通过response，responseText来获得XMLHttpRequest的数据，并通过Ext.util.JSON。decode方法把字符串转换为json对象
			for(i in options){									//options:向服务端发送的对象
				alert('options参数名称:'+i);
				alert('options参数['+i+']的值:'+options[i]);
			}					//用for语句进行遍历，看看对象里存的是什么，这样就可以判断对象是什么了。
			var responseJson  = Ext.util.JSON.decode(response.responseText);
			template.compile();									//编译模板
			template.overwrite(panel.body,responseJson);		//把数据填充到模板中
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

/*
 * for(i in options){									
				alert('options参数名称:'+i);
				alert('options参数['+i+']的值:'+options[i]);
			}					//用for语句进行遍历，看看对象里存的是什么，这样就可以判断对象是什么了。

*  for(){}:不知属性个数时，用于对某个对象的所有属性进行循环操作，返回字符串形式的属性名,获取属性值方式
*  如果子对象还是Object
*  for(i in options){
*  	alert('options参数名称:'+i);
*  	alert('options参数['+i+']的值：'+options[i]);
*  	方式一：判断子对象类型，如果是Object则继续遍历子对象
* 	 if(typeof (options[i]) == object'){
*  		for(j in options[i]){
*  			alert('子对象名称:'+j);
*  			alert('子对象值:'+options[i][j]);
*	  	}
* 	 }
* 	方式二，options[i]。toString(),查看对象源码
* 	语法：object.toSource()注：该方法在IE中无效
*  }
*
*
*/
