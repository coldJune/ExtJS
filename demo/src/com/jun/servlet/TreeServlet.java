package com.jun.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TreeServlet extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		String strResult = "["
				+ "{text:'根下节点一[user图标]',leaf:true,iconCls:'nodeicon'},"
				+ "{text:'根下节点二',leaf:true},"
				+ "{text:'根下节点三',leaf:false,children:["
				+ 		"{text:'节点三子节点一',leaf:true},"
				+ 		"{text:'节点三子节点二',leaf:false,expanded:true,children:["
				+ 			"{text:'节点三子节点二节点一',leaf:true},"
				+ 			"{text:'节点三子节点二节点二',leaf:true}"
				+ 		"]"
						
				+ 		"}"
				+ "]"
				+ "}"
				+ ""
				+ ""
				+ "]";
		
		PrintWriter out =response.getWriter();
		out.write(strResult);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doGet(request, response);
	}
	
}
