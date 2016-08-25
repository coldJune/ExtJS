/**
 * 1.ContainerLayout:默认布局方式，其他布局继承该类进行扩展功能。显示：将内部组件以垂直方式叠加
 * 组件1
 * 组件2
 * 
 * 2。FormLayout:产生类似表单的外观。显示：将内部组件以垂直方式叠加。同上
 * 3.ColumnLayout:将组件以水平方式放置。如下所示:
 * 组件1[第一列] 组件2[第二列] 组件3[第3列]
 * 
 * 4.BorderLayout:一个盒子里摆放5个位置，东南西北中[即：上下左右中间].开发时常用来做后台框架的布局
 * 
 * 			北
 * 西		中		东
 * 			南
 * 
 * 4.AccordionLayout:手风琴布局，可以折叠的布局。开发的时候常用来对左侧功能列表进行分类。如下所示:
 * 折叠状态---
 * 展开内容----
 * 	|
 * 	内容1-----
 * 	内容2-----
 * 折叠状态----
 */
Ext.onReady(function(){
	//---------------ContaninerLayout开始----------------------//
	var box1 = new Ext.BoxComponent({
		autoEl:{
			tag:'div',
			style:'background:red;width:300px;height:30px',
			html:'box1'
		}
	});
	var box2 = new Ext.BoxComponent({
		autoEl:{
			tag:'div',
			style:'background:yellow;width:300px;height:30px',
			html:'box2'
		}
	});
	var box3 = new Ext.BoxComponent({
		autoEl:{
			tag:'div',
			style:'background:blue;width:300px;height:30px;color:#fff',
			html:'box3'
		}
	});
	var containerlayout = new Ext.Container({
		layout:'form',
		items:[box1,box2,box3],
		renderTo:'ContainerLayout'
	});
	//-------------ContainerLayout结束-----------------//
	//-------------FormLayout开始----------------------//
	var formlayout = new Ext.Panel({
		title:'FormLayout',
		layout:'form',
		items:[
		       new Ext.form.TextField({fieldLabel:'用户名'}),
		       new Ext.form.TextField({fieldLabel:'密码'}),
		       new Ext.form.TextField({fieldLabel:'重复密码'})
		       ],
		       renderTo:'FormLayout'
	});
	//--------------FormLayout结束-----------------//
	//--------------ColumnLayout开始---------------//
	var ColumnLayout = new Ext.Panel({
		width:600,
		title:'ColumnLayout',
		layout:'column',
		items:[
		       new Ext.form.FormPanel({
		    	   title:'第一列',
		    	   columnWidth:.33,
		    	   labelWidth:50,
		    	   items:[
		    	          new Ext.form.TextField({fieldLabel:'用户名'})
		    	          ]
		       }),
		       new Ext.form.FormPanel({
		    	   title:'第二列',
		    	   columnWidth:.33,
		    	   labelWidth:50,
		    	   items:[
		    	          new Ext.form.TextField({fieldLabel:'密码'})
		    	          ]
		       }),
		       new Ext.form.FormPanel({
		    	   title:'第三列',
		    	   columnWidth:.34,
		    	   labelWidth:80,
		    	   items:[
		    	          new Ext.form.TextField({fieldLabel:'重复密码'})
		    	          ]
		       })
		       ],
		       renderTo:'ColumnLayout'
	});
	//-----------------ColumnLaout结束--------------------//
	//-----------------BorderLayout开始------------------//
	var BoderLayout = new Ext.Panel({
		title:'BorderLayout',
		layout:'border',
		width:1100,
		height:300,
		items:[
		       new Ext.Panel({
		    	   title:'上北',
		    	   region:'north',
		    	   html:'放个logo是不错的选择'
		       }),
		       new Ext.Panel({
		    	   title:'下南',
		    	   region:'south',
		    	   html:'版权所有',
		    	   autoEl:'center'
		       }),
		       new Ext.Panel({
		    	   title:'中间',
		    	   region:'center',
		    	   html:'主面板',
		       }),
		       new Ext.Panel({
		    	   title:'左东',
		    	   region:'west',
		    	   html:'树形菜单'
		       }),
		       new Ext.Panel({
		    	   title:'右西',
		    	   region:'east',
		    	   html:'常用功能'
		       })
		       ],
		renderTo:'BorderLayout'
	});
	//---------------BorderLayout结束---------------//
	//---------------AccordionLayout开始------------//
	var AccordionLayout = new Ext.Panel({
		title:'AccordionLayout',
		layout:'accordion',
		height:200,
		items:[
		       new Ext.Panel({
		    	   title:'用户管理',
		    	   items:[
		    	          new Ext.BoxComponent({
		    	        	  autoEl:{
		    	        		  tag:'div',
		    	        		  html:'用户管理'
		    	        	  }
		    	          })
		    	          ]
		       }),
		       new Ext.Panel({
		    	   title:'角色管理',
		    	   items:[
		    	          new Ext.BoxComponent({
		    	        	  autoEl:{
		    	        		  tag:'div',
		    	        		  html:'角色管理'
		    	        	  }
		    	          })
		    	          ]
		       }),
		       new Ext.Panel({
		    	   title:'系统管理',
		    	   items:[
		    	          new Ext.BoxComponent({
		    	        	  autoEl:{
		    	        		  tag:'div',
		    	        		  html:'系统管理'
		    	        	  }
		    	          })
		    	          ]
		       })
		       ],
		renderTo:'AccordionLayout'
	});
	//-------------AccordionLayout结束-------//
	//-------------FitLayout开始-------------//
	var FitLayout = new Ext.Panel({
		title:'FitLayout',
		height:100,
		renderTo:'FitLayout',
		layout:'fit',
		items:[
		       new Ext.Panel({
		    	   bodyStyle:'background:red',
		    	   html:'使用了fit布局，填充'
		       }),
		       new Ext.Panel({
		    	   bodyStyle:'background:yellow',
		    	   html:'这个Panel不会显示，因为是fit布局'
		       })
		       ]
	});
	
	var NoFitLayout = new Ext.Panel({
		title:'NoFitLayout',
		height:100,
		rederTo:'FitLayout',
		items:[
		       new Ext.Panel({
		    	   bodyStyle:'background:yellow',
		    	   html:'未使用了fit布局，没有填充满'
		       })
		       ]
	});
	//---------------FitLayout结束--------------------//
	//---------------TableLayout开始------------------//
	var TableLayout = new Ext.Panel({
		title:'TableLayout',
		layout:'table',
		layoutConfig:{columns:3},
		defaults:{
			width:33,
			height:100,
			autoEl:'center'
		},
		defalutType:'panel',
		items:[
		       {html:'行1列1'},
		       {html:'行1列2'},
		       {html:'行[1,2]列3',rowspan:2,height:180},
		       {html:'行2列[1,2]',colspan:2,width:266}
		       ],
		renderTo:'TableLayout'
	});
	//------------------TableLayout结束------------------//
});