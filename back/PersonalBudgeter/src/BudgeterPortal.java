import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

public class BudgeterPortal {

    private static final String dataFile = "data\\login.txt";
    private BufferedReader bReader;
    private FileReader fReader;

    private void userLogin() {
        Scanner in = new Scanner(System.in);
        System.out.print("ID: ");
        String userId = in.nextLine();
        System.out.print("PIN: ");
        String pin = in.nextLine();
        boolean success = fetchUserInfo(userId, pin);
        if (!success)
        {
            System.err.println("failed to login");
        }
        else {
            System.out.println("Login successful.  Welcome, " + userId);
            Budgeter app = new Budgeter(userId, pin);
            app.runBudgeter();

        }
    }

    private boolean fetchUserInfo(String user, String pin){

        try {
            fReader = new FileReader(dataFile);
            bReader = new BufferedReader(fReader);
            String line = "";
            while ((line = bReader.readLine()) != null) {
                System.out.println(line);
                String thisUser = line.split(",")[0];
                String thisPIN = line.split(",")[1];
                if (user.equals(thisUser) && pin.equals(thisPIN))
                {
                    return true;
                }
            }
        }
        catch (IOException e)
        {
            System.err.println("File not found.\n " + e);
        }
        return false;
    }

    public void loadBudgeter() {
        System.out.println("Opening Budgeter");
        System.out.println("Please log in.");
        userLogin();
    }
}
