<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone = isset($_POST['phone']) ? filter_var($_POST['phone'], FILTER_SANITIZE_STRING) : ''; // Phone can be empty

    if (empty($name) || empty($email) || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        http_response_code(400); // Bad Request
        echo "Please provide a valid name and email address.";
        exit();
    }

    $to = 'chinajaderockvillesbest@gmail.com';
    $subject = 'Rewards Signup: ' . $name;
    $message = "A new user has signed up for the rewards program:\n\n";
    $message .= "Name: " . $name . "\n";
    $message .= "Email: " . $email . "\n";
    $message .= "Phone: " . $phone . "\n";
    $message .= "\nThank you!";
    $headers = 'From: Your Website <noreply@yourdomain.com>' . "\r\n";
    $headers .= 'Reply-To: ' . $email . "\r\n";
    $headers .= 'Content-Type: text/plain; charset=UTF-8' . "\r\n";

    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200); // OK
        echo "Signup successful!";
    } else {
        http_response_code(500); // Internal Server Error
        echo "Failed to send signup email.";
    }
} else {
    http_response_code(400); // Bad Request
    echo "Invalid request.";
}
?>