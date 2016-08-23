/**
 * 
 */

Ext.override(Ext.form.TextField,{
	unitText:'',
	onRender:function(ct,position){
		Ext.form.TextField.superclass.onRender.call(this,ct,position);
		//如果单位字符串已定义，则在后方增加单位对象
		if(this.unitText!=''){
			this.unitEl=ct.createChild({
				tag:'div',
				html:this.unitText
			});
			this.unitEl.addClass('x-form-unit');
			
			//增加单位名称的同时按单位名称大小减少文本框的长度
			this.widtj = this.width-(this.unitText.replace(/[^\x00-\xff]/g,"xx").length*6+2);
			//修改错误提示图标的位置
			this.alignErrorIcon = function(){
				this.errorIcon.alignTo(tihs.unitEl,'tl-tr',[2,0]);
			}
		}
	}
	
});

Ext.onReady(function(){
	//初始化Ext:Tips属性
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget='side';
	
	//提交按钮方法
	var btnsubmitclick = function(){
		Ext.MessageBox.alert("提示", "登录成功");
	}
	
	//重置按钮方法
	var btnresetclick=function(){
		form.getForm().reset();
	}
	
	//创建提交按钮
	var btnsubmit = new Ext.Button({
			text:'提交',
			handler:btnsubmitclick
	});
	//创建重置按钮
	var btnreset=new Ext.Button({
		text:'重置',
		handler:btnresetclick
	});
	
	//姓名
	var txtusername = new Ext.form.TextField({
		width:140,
		allowBlank:false,
		maxLength:20,
		name:'username',
		fieldLabel:'用户名',
		blankText:'请输入用户名',
		maxLengthText:'用户名不能超过20个字符'
	});
	
	//密码
	var txtpasswd = new Ext.form.TextField({
		width:140,
		allowBlank:false,
		maxLength:20,
		name:'password',
		inputType:'password',
		fieldLabel:'密码',
		blankText:'请输入密码',
		maxLengthText:'密码不超过20个字符'
	});
	
	
	var numberfield = new Ext.form.NumberField({
		fieldLabel:'身高',
		width:80,
		deciamlPrecision:1,
		minValue:0.01,
		maxValue:200,
		unitText:'cm',
		allowBlank:false,
		blankText:'请输入身高'
	});
	
	var hiddenfield = new Ext.form.Hidden({
		name:'userid',
		value:'1'
	});
	
	var datefield = new Ext.form.DateField({
		fieldLabel:'出生日期',
		format:'Y-m-d',
		editable:false,
		allowBlank:false,
		blankText:'其选择日期'
	});
	
	//-------------------------单选组开始----------------------//
	var radiogroup = new Ext.form.RadioGroup({			//创建一个新的单选按钮组
		fieldLabel:'性别',
		width:100,
		items:[{
			name:'sex',								//单选按钮组按照name属性来区分，同一组中的单选按钮才能单选，如果name属性设置错误，该按钮将会被认为是其他组
			inputValue:'0',							//选项框的值
			boxLabel:'男',							//选项框后面的文字说明
			checked:true
		},{
			name:'sex',
			inputValue:'1',
			boxLabel:'女'
		}]
	});
	//获取单选组的值
	radiogroup.on('change',function(rdgroup,checked){
		alert(checked.getRawValue());			//获取选择框中的选中值，由于单选框只有一个选中值，可以直接获取，而复选框可以多选，所以要循环取出
	});
	//-------------------------单选组结束----------------------//
	//-------------------------复选组开始---------------------//
	var checkboxgroup = new Ext.form.CheckboxGroup({
		fieldLabel:'兴趣爱好',
		width:220,
		items:[{
			boxLabel:'reading',
			inputValue:'0'
		},{
			boxLabel:'shopping',
			inputValue:'1'
		},{
			boxLabel:'music',
			inputValue:'2'
		}]
	});
	//获取复选组的值
	checkboxgroup.on('change',function(cbgroup,checked){
		for(var i =0;i<checked.length;i++){
			alert(checked[i].getRawValue());
		}
	});
	//------------------------复选组结束--------------------//
	
	//表单
	var form = new Ext.form.FormPanel({
		frame:true,
		title:'注册',
		style:'margin:10px',
		html:'<div style="padding:10px">这是表单内容</div>',
		items:[txtusername,txtpasswd,numberfield,hiddenfield,datefield,radiogroup,checkboxgroup],
		buttons:[btnsubmit,btnreset]
	});
	
	//窗体
	var win = new Ext.Window({
		title:'窗体',
		width:476,
		height:374,
		html:'<div>这里是窗体内容</div>',
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