import { initializeApp } from 'firebase/app'
const firebaseConfig = {
    apiKey: "AIzaSyAx0e6MrSU_A5cznY-YVpv-D8FIF9pqiCs",
    authDomain: "backend-full-stack-exam.firebaseapp.com",
    databaseURL: "https://backend-full-stack-exam-default-rtdb.firebaseio.com",
    projectId: "backend-full-stack-exam",
    storageBucket: "backend-full-stack-exam.appspot.com",
    messagingSenderId: "946270058537",
    appId: "1:946270058537:web:1d035f97b7ff37f4750438",
    measurementId: "G-LK1L7B5W7H"
}


module.exports = database = {
    firebase: initializeApp(firebaseConfig)
}