

export const FromValidator = (inputData, msg, setmsg) => {
    const { name = "", email = "", password = "", confirmPassword = "" } = inputData;
    const emailText = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
    const emailresult = emailText.test(email)
    const passwordTest = /^(?=.*\d)(?=(.*\W){2})(?=.*[a-zA-Z])(?!.*\s).{1,15}$/
    const passwordresult = passwordTest.test(password)

    const nameMsg = name == "" ? "Fill the Fields" : name.length < 5 ? "Name should least 5 chars!" : "okk";
    const emailMsg = email == "" ? "fill the Field" : email.length < 5 ? "Email should least 5 chars!" : emailresult == false ? "Please Provide a valid Email" : "okk";
    const passwordMsg = password == "" ? "fill the Field" : password.length < 6 ? "password should be more Than 5!!" : passwordresult == false ? "Please enter a valid password(1-9,A-z,#&)*2 in 15 chars(No space!!)" : "okk";
    const confirmPasswordMsg = confirmPassword !== password ? "Password Don't Match" : "okk";
    setmsg({ nameMsg, emailMsg, passwordMsg, confirmPasswordMsg })

}
