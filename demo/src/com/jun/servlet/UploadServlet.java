package com.jun.servlet;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class UploadServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 508112455892387624L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		DiskFileItemFactory factory = new DiskFileItemFactory();
		String savePath = request.getServletContext().getRealPath("/upload");
		
		factory.setRepository(new File(savePath));
		factory.setSizeThreshold(1024*1024);
		ServletFileUpload upload = new ServletFileUpload(factory);
		PrintWriter out = response.getWriter();
		try {
			List<FileItem> list = upload.parseRequest(request);
			
			for(FileItem item:list){
				String fileName = item.getName();
				if(!item.isFormField()){
					
					item.write(new File(savePath+"\\"+fileName));
					out.print("{success:true}"); 		//,path:'"+savePath+"\\"+fileName+"'}");
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
		}finally {
			out.flush();
			out.close();
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doGet(request, response);
	}
	
}
