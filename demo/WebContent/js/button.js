/**
 * 
 */

Ext.onReady(function(){
	Ext.lib.Ajax.defaultPostHeader += '; charset=utf-8';
	//初始化标签中的Ext:Qtip属性
	Ext.QuickTips.init();	//QuickTips的作用是初始化标签中的Ext:Qtip属性，并为它赋予显示提示的动作
	
	Ext.form.Field.prototype.msgTarget = 'side';//TextField的提示方式为：在右边缘，参数枚举值为"gtip","title","under","side",id(元素id)，
												//side方式用的较多，右边出现红色感叹号，鼠标上去出现错误提示
	//提交按钮处理方法
	var btnsubmitclick=function(){
		Ext.MessageBox.alert('提示', '点击了确定');
	}
	//重置按钮点击是处理方法
	var btnresetclick=function(){
		Ext.MessageBox.alert('提示', '点击重置按钮');
		
	}
	//重置按钮鼠标悬停处理方法
	var btnresetmouseover=function(){
		Ext.MessageBox.alert('提示','鼠标悬停在重置按钮之上');
		
	}
	
	//提交按钮
	var btnsubmit= new Ext.Button({				//创建一个新的Button按钮对象
		text:'提交',
		handler:btnsubmitclick					//当用户点击是执行方法btnsubmitclick
		
	});
	//重置按钮
	var btnreset = new Ext.Button({
		text:'重置',
		listeners:{								//执行多个方法，顺序执行
			'mouseover':btnresetmouseover,
			'click':btnresetclick
		}
	});
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
	
	//表单
	var form = new Ext.form.FormPanel({			//创建一个新的form表单对象。
		frame:true,								
		title:'表单标题',						//表单标题，不加不会出现浅色表单标题栏
		style:'margin:10px',				//表单的样式，加了个外10px的边框
		html:'<div style="padding:10px">这里表单内容</div>',	//表单内显示的html内容
		items:[txtusername,txtpassword],
		buttons:[btnsubmit,btnreset]
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

//button组件常用的属性、方法及事件
//
//* 属性
//
//text:字符串，显示按钮上的文字
//minWidth:整型,最小宽度
//
//* 事件
//
//handle:首发方法处理事件
//listeners:事件监听
