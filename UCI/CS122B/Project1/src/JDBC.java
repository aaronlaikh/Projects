import java.sql.*;
import java.util.Scanner;

public class JDBC {
	private static Connection connection;
	private static String username;
	private static String password;
	private static Scanner user_input;
	public static void getUserInfo()
	{
		System.out.print("Please enter database login ID: ");
		username = user_input.next();
		System.out.print("Please enter database password info: ");
		password = user_input.next();
	}
	
	public void menu()
	{
		
	}
	
	public void getStarMovies(String star)
	{
	}

	public void insertnewStar()
	{
		
	}
	
	public void insertnewCustomer()
	{
		
	}
	
	public void deleteCustomer(String customer_id)
	{
		
	}
	
	public void getMetaData()
	{
		
	}
	
	public void executeStatement(String statement)
	{
		
	}
	
	public void exitProgram()
	{
		
	}
	
	public static void main(String[] args) throws Exception
	{
		user_input = new Scanner(System.in);
		Class.forName("com.mysql.jdbc.Driver").newInstance();
		getUserInfo();
		connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/moviedb", username, password);
		
        // Create an execute an SQL statement to select all of table"Stars" records
       Statement select = connection.createStatement();
       ResultSet result = select.executeQuery("Select * from stars");
       
       // Get metatdata from stars; print # of attributes in table
       System.out.println("The results of the query");
       ResultSetMetaData metadata = result.getMetaData();
       System.out.println("There are " + metadata.getColumnCount() + " columns");

       // Print type of each attribute
       for (int i = 1; i <= metadata.getColumnCount(); i++)
               System.out.println("Type of column "+ i + " is " + metadata.getColumnTypeName(i));

       // print table's contents, field by field
       while (result.next())
       {
               System.out.println("Id = " + result.getString(1));
               System.out.println("Name = " + result.getString(2) + result.getString(3));
               System.out.println("DOB = " + result.getString(4));
               System.out.println("photoURL = " + result.getString(5));
               System.out.println();
       }
       user_input.close();
	}
}
