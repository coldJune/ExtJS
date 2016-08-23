/**
 * 
 */

//----------------重写文本款开始--------------------//
Ext.override(Ext.form.TextField,{
	unitText:'',
	onRender:function(ct,position){
		Ext.form.TextField.superclass.onRender.call(this,ct,position);
		//如果字符串已定义，则在后面增加单位对象
		if(this.unitText!=''){
			this.unitEl=ct.createChild({
				tag:'div',
				html:this.unitText
			});
			this.unitEl.addClass('x-form-unit');
			//增加单位名称的同时，按单位名称大小减少文本框的长度
			this.width = this.width-(this.unitText.replace(/^\x00-\xff/g,"xx").length*6+2);
			
			//同时修改错误提示图标位置
			this.alignErrorIcon = function(){
				this.errorIcon.alignTo(this.unitEl,'tl-tr',[2,0]);
			}
		}
	}
});
//---------------重写文本框结束-----------------//
Ext.onReady(function(){
	//初始化标签中的Ext:Qtip属性
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	
	//提交按钮处理方法
	var btnsubmitclick = function(){
		Ext.MessageBox.alert("提示", "你点击了确定按钮");
	}
	//重置按钮方法
	var btnresetclick = function(){
		form.getForm().reset();
	}
	
	//提交按钮
	var btnsubmit = new Ext.Button({
		text:'提交',
		handler:btnsubmitclick
	});
	
	//重置anniu
	var btnreset = new Ext.Button({
		text:'重置',
		handler:btnresetclick
	});
	
	//用户名
	var txtusername=new Ext.form.TextField({
		width:140,
		allowBlank:false,
		maxLength:21,
		name:'username',
		fieldLabel:'用户名',
		blankText:'请输入用户名',
		maxLengthText:'用户名不能超过20个字符'
	});
	
	//密码
	var txtpasswd = new Ext.form.TextField({
		width:140,
		allowBlank:false,
		name:'password',
		fieldLabel:'密码',
		maxLength:20,
		blankText:'请输入密码',
		maxLengthText:'密码不能超过20个字符',
		inputType:'password'
		
	});
	
	//-----------数字字段开始------------------//
	var numberfield  = new Ext.form.NumberField({			//创建一个新的NumberField数字文本对象
		fieldLabel:'身高',
		width:80,
		decimalPrecision:1,			//设置小数点后面的位数，当位数超过时系统会自动截断
		minValue:0.01,				//设置数字文本框最小值
		maxValue:200,				//这是最大值
		allowBlank:false,
		unitText:'cm',					//通过重写加上的属性，在样式表中加了样式
		blankText:'请输入身高'
	});
	//----------数字字段结束-----------------//
	//----------隐藏域字段开始---------------//
	var hiddenfield = new Ext.form.Hidden({		//创建一个新的Hidden对象，隐藏字段用作参数站位符，一般用来保存不希望用户直接看到的参数，并发送到服务器
		name:'userid',
		value:'1'
	});
	//----------隐藏域字段结束--------------//
	//----------日期字段开始---------------//
	var datefield = new Ext.form.DateField({	//创建一个新的datefield日期对象
		fieldLabel:'出生日期',
		format:'Y-m-d',				//日期格式
		editable:false,				//设置不可编辑
		allowBlank:false,
		blankText:'请选择日期'
	});
	//----------日期字段结束--------------//
	//表单
	var form  = new Ext.form.FormPanel({
		frame:true,
		title:'注册',
		style:'margin:10px',
		html:'<div sttle="padding:10px">这是表单内容</div>',
		items:[txtusername,txtpasswd,numberfield,hiddenfield,datefield],
		buttons:[btnsubmit,btnreset]
	});
	//窗体
	var win = new Ext.Window({
		title:'窗口',
		width:476,
		height:374,
		html:'<div>这是窗体内容</div>',
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