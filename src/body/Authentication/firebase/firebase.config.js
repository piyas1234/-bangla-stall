import firebase from "firebase/app";

export const firebaseConfig = {

    apiKey: "AIzaSyDHHZUlmdYmfiBNufJiPRRLCP2xhY-AZiU",
    authDomain: "bangla-stall.firebaseapp.com",
    projectId: "bangla-stall",
    storageBucket: "bangla-stall.appspot.com",
    messagingSenderId: "760258881268",
    appId: "1:760258881268:web:b8ce0020b1abe58e6be0a1"
};


 



export const socialLoin = (provider, setlogin, goHistotyPage,seterrMsg) => {
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const credential = result.credential;
            const token = credential.accessToken;
            const user = result.user;
            console.log(user)
            setlogin(user)
            goHistotyPage()
        }).catch((error) => {
            const errorMessage = error.message;
            seterrMsg(errorMessage)
        });
}


export const emailLogin = (setlogin, goHistotyPage, email, password,seterrMsg) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setlogin(user);
            goHistotyPage()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            seterrMsg(errorMessage);
        });
}


export const emailSignup = (setlogin, goHistotyPage, name, email, password,seterrMsg) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            setlogin(user)
            goHistotyPage()
            user.updateProfile({
                displayName: name,
            }).then(function (data) {
                console.log(data)
            }).catch(function (error) {
                console.log(error)
                const errorMessage = error.message;
                seterrMsg(errorMessage)
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            seterrMsg(errorMessage)
            // ..
        });
}