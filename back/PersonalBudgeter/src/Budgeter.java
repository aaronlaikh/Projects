import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;

public class Budgeter {

    private String user= "";
    private String userPIN = "";
    private String basePath = "data\\profiles\\";
    private FileReader fr = null;
    private BufferedReader br = null;
    private ArrayList<String> dates;
    private ArrayList<Double> balance;
    private ArrayList<String> categories;


    public Budgeter(String userId, String pin)
    {
        user = userId;
        userPIN = pin;
        initializeUser();
    }

    private void initializeUser()
    {
        System.out.println("Loading user data and preferences.");
        String userPath = basePath + user;
        loadUserData(userPath);
        System.out.println("Loading successful");
    }

    private void loadUserData(String filepath)
    {
        File userFile = new File(filepath);
        if (userFile.exists() && !userFile.isDirectory())
        {

        }
        else {
            //File doesn't exist (user has never made a profile).  Make a new empty one.
        }
    }

}
