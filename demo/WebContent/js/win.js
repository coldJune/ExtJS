/**
 * 
 */

Ext.onReady(function(){
	Ext.lib.Ajax.defaultPostHeader += '; charset=utf-8';
	var win = new Ext.Window({					//创建一个新的Window窗口
		title:'标题',								//窗口的标题
		width:'470',                            //宽度
		height:'500',                           //高度
		html:'<div>这是一个窗口</div>',				//窗体内部显示的html内容
		resizable:true,							//是否可以调整窗体的大小
		modal:true,								//是否为模态窗体【当打开这个窗体后，如果不能对其进行操作，那么这个窗体就是模态窗体】
		closable:true,							//是否可以关闭，也可以理解为是否显示关闭按钮
		maximizable:true,						//是否可以最大化
		minimizable:true						//是否可以最小化
		
	});
	win.show();									//窗体显示
	
});

//window组件常用的属性、方法及事件
//
//* 属性
//
//plain：布尔类型，true表示强制与背景色保持协调，默认为false
//resizable:布尔类型，用户是否可以调整窗体大小，默认值为true表示可以调整大小
//maxinizable：布尔类型，true表示显示最大化按钮，默认值为false
//maximized：布尔类型，true表示显示窗体时将窗体最大化，默认值为false
//closable：布尔类型，true表示显示关闭按钮，默认值为true
//bodyStyle：与边框的间距，例：bodyStyle:"padding:3px"
//buttonAlign：窗体中button对齐方式(left、center、right)，默认值为right
//closeAction："close"释放窗体所占内存，"hide"隐藏窗体，建议使用"hide"。
//
//* 方法
//
//show:打开窗体
//hide:隐藏窗体
//close：关闭窗体
//
//* 事件
//
//show:打开窗体时触发
//hide:隐藏窗体时触发
//close:关闭窗体时触发

