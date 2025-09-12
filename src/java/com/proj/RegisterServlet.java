package com.proj;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/keshab"; 
    private static final String JDBC_USER = "keshab1257";  
    private static final String JDBC_PASSWORD = "keshab1257";  

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        if (name == null || email == null || password == null ||
            name.isEmpty() || email.isEmpty() || password.isEmpty() ) {
            out.println("<h3>⚠️ Please fill in all fields.</h3>");
            return;
        }

        Connection con = null;
        PreparedStatement stmt = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            con = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
            System.out.println(" Database connected!");

            // Insert query
            String query = "INSERT INTO projectusers (name, email, password_hash) VALUES (?, ?, ?)";
            stmt = con.prepareStatement(query);
            stmt.setString(1, name);
            stmt.setString(2, email);
            stmt.setString(3, password); 
            
            int cnt = stmt.executeUpdate();

            if (cnt > 0) {
                response.sendRedirect("Loggin.html");
            } else {
                out.println("<h3>️ Registration Failed. Try again!</h3>");
            }

        } catch (Exception e) {
            e.printStackTrace();
            out.println("<h3> Error: " + e.getMessage() + "</h3>");
        } finally {
            try {
                if (stmt != null) stmt.close();
                if (con != null) con.close();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }
}
