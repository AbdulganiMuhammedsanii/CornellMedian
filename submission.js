const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, update, child } = require('firebase/database');
const puppeteer = require('puppeteer');
const fs = require('fs');

const firebaseConfig = {
  apiKey: "AIzaSyAR8RGFkik7wOZyiGAPNMzcMjwDBMnsyww",
  authDomain: "cornellmedian.firebaseapp.com",
  databaseURL: "https://cornellmedian-default-rtdb.firebaseio.com",
  projectId: "cornellmedian",
  storageBucket: "cornellmedian.appspot.com",
  messagingSenderId: "795907955000",
  appId: "1:795907955000:web:77e908fb3fdeb7ce1c09cd",
  measurementId: "G-85YCSMQLT2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


function addCourseSubmission(courseData) {
    const submissionRef = ref(db, 'Submissions');
    const newSubmissionRef = push(submissionRef);
    return set(newSubmissionRef, courseData)
      .then(() => console.log(`Submission added for ${courseData.courseName}`))
      .catch((error) => console.error('Error adding submission:', error));
  }
  
  // Example course submission data
const courseSubmission = {
    courseName: "Example Course",
    professor: "Prof. Example",
    medianGrade: "A",
    semester: "Fall 2023"
  };
  
  // Add the submission to Firebase
  addCourseSubmission(courseSubmission);
  