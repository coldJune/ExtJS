Ext.onReady(function(){
	//初始化标签中的Ext:Qtip属性
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget='side';
	
	//提交按钮方法
	var btnsubmitclick=function(){
		if(form.getForm().isValid()){		//检验表单的验证项是否全部通过
			Ext.MessageBox.alert('提示','登录成功');
		}
	}
	
	//重置按钮处理方法
	var btnresetclick=function(){
		form.getForm().reset();		//重置表单
		
	}
	
	//提交按钮
	var btnsumb = new Ext.Button({
		text:'提交',
		handler:btnsubmitclick
	});
	
	//重置按钮
	var btnre=new Ext.Button({
		text:'重置',
		handler:btnresetclick
	});
	//用户名
	var txtusername=new Ext.form.TextField({
		width:140,
		allowBlank:false,
		maxLength:20,
		inputType:'text',
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
		inputType:'password',
		name:'password',
		fieldLabel:'密码',
		blankText:'请输入用户名',
		maxLengthText:'用户名不能超过20个字符'
		
	});
	
	//验证码
	var txtcheckcode = new Ext.form.TextField({
		width:76,
		fieldLabel:'验证码',
		id:'checkcode',
		allowBlank:false,
		blankText:'请输入验证码',
		maxLength:4,
		maxLengthText:'验证码不能超过4个字符'
	});
	
	//表单
	var form = new Ext.form.FormPanel({
		url:'****',
		labelAlgin:'right',
		labelWidth:45,
		frame:true,
		cls:'loginform',
		buttonAlign:'center',
		bodyStyle:'padding:6px 0px 0px 15px',
		items:[txtusername,txtpasswd,txtcheckcode],
		buttons:[btnsumb,btnre]
	});
	//窗体
	var win =  new Ext.Window({
		title:'用户登录',
		iconCls:'loginicon',		//给窗体加上小图标
		plain:true,
		width:276,
		height:174,
		resizable:false,
		shadow:true,
		modal:true,
		closable:false,
		animCollapse:true,
		items:form
	});
	
	win.show();
	
	//创建验证码
	var checkcode = Ext.getDom('checkcode');	//根据ID获取Dom
	var  checkimage = Ext.get(checkcode.parentNode);	//根据Dom获取父节点
	checkimage.createChild({						
		tag:'img',
		src:'../img/checkcode.gif',					//创建子节点，标签为<img src='../img/checkcode.gif ...'>
		align:'absbottom',
		style:'padding-left:23px;cursor:pointer;'
		
	});
});