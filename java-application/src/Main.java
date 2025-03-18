import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        
        System.out.print("Enter your favorite activity: ");
        String activity = scanner.nextLine();
        
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDate = now.format(formatter);
        
        System.out.println("\nHello, " + name + "!");
        System.out.println("Today's date and time: " + formattedDate);
        System.out.println("It's great that you enjoy " + activity + "!");
        
        performTask(name, activity);
        
        System.out.println("\nThank you, " + name + "! Have a great day!");
        scanner.close();
    }
    
    private static void performTask(String name, String activity) {
        System.out.println("\nProcessing your request, " + name + "...");
        try {
            Thread.sleep(1000);
            System.out.println("We have noted that you enjoy " + activity + ". Keep having fun!");
        } catch (InterruptedException e) {
            System.out.println("Oops! Something went wrong.");
            Thread.currentThread().interrupt();
        }
    }
}

