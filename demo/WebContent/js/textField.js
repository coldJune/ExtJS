/**
 * 
 */

Ext.onReady(function(){
	Ext.lib.Ajax.defaultPostHeader += '; charset=utf-8';
	//初始化标签中的Ext:Qtip属性
	Ext.QuickTips.init();	//QuickTips的作用是初始化标签中的Ext:Qtip属性，并为它赋予显示提示的动作
	
	Ext.form.Field.prototype.msgTarget = 'side';//TextField的提示方式为：在右边缘，参数枚举值为"gtip","title","under","side",id(元素id)，
												//side方式用的较多，右边出现红色感叹号，鼠标上去出现错误提示
	//用户名input
	var txtusername=new Ext.form.TextField({	//创建一个新的TextField文本框对象
		width:140,
		allowBlank:false,						//不允许文本框为空
		maxLength:20,							//文本框的最大长度为20个字符，当超过时仍可以输入，但会提示警告
		name:'username',
		fieldLabel:'用户名称',						//文本框前面显示的文字标题
		blankText:'请输入用户名',					//当非空校验没有通过时的提示信息
		maxLengthText:'用户名不能超过20个字符'			//当最大长度校验没通过时的提示信息
		
	});
	//密码input
	var txtpassword =new Ext.form.TextField({
		width:140,
		allowBlank:false,
		inputType:'password',				
		name:'password',					//表单名称，在与服务器交互时，服务端按name接受post参数值
		fieldLabel:'密码',
		blankText:'请输入密码',
		maxLengthText:'密码不能超过20个字符'
	});
	var form = new Ext.form.FormPanel({			//创建一个新的form表单对象。
		frame:true,								
		title:'表单标题',						//表单标题，不加不会出现浅色表单标题栏
		style:'margin:10px',				//表单的样式，加了个外10px的边框
		html:'<div style="padding:10px">这里表单内容</div>',	//表单内显示的html内容
		items:[txtusername,txtpassword]
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

//textfield组件常用属性、方法和事件
//
//* 属性
//
//allowBlank:是否允许为空，默认值为true
//blankText:空验证失败后显示的提示信息
//emptyText:在一个空字段中默认显示的信息
//grow:字段是否自动伸展和收缩，默认为false
//growMin:收缩的最小宽度
//growMax:伸展的最大宽度
//inputType:字段类型，默认为text
//maskRe:用于过滤不匹配字符输入的正则表达式
//maxLength:字段允许输入的最大长度
//maxLengthText:最大长度验证失败显示的提示信息
//minLength:字段允许输入的最小长度
//minLengthText:最小长度验证失败显示的提示信息

