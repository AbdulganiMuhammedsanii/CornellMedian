// script.js
// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



//webscraping course info to json
function courseDescription(course, coursenumber) {
  // Implement matching logic here
  // This is a placeholder for demonstration
  const puupeteer = require('puppeteer');

(async () => {
const browser = await puupeteer.launch();
const page = await browser.newPage();
await page.goto('https://classes.cornell.edu/browse/roster/SP24/class/'+course+'/'+coursenumber);
await page.screenshot({ path: 'example.png' });

const grabParagraphs = await page.evaluate(() => {
  const pgTags =document.querySelector('.catalog-descr');
  return pgTags.innerHTML;
});
await browser.close();
})();
}


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();


const signInWithGoogleButton = document.getElementById('signInWithGoogle')

const auth = firebase.auth();

const sigInWithGoogle = () => {
const googleProvider = new firebase.auth.GoogleAuthProvider();

auth.signInWithRedirect(googleProvider)
.then(() => {
  window.location.assign('./profile');
})
.catch(error => {
  console.error(error);
})
}

signInWithGoogleButton.addEventListener('click', sigInWithGoogle);



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    const use = document.getElementById('useracc');
    const useracc = document.createElement('div');
      useracc.classList.add('useraccount');
      useracc.innerHTML = `<h3><b>Hi, ${user.displayName}<b><h3>`;
      use.appendChild(useracc)

    document.getElementById('signOutButton').style.display = 'block';
    document.getElementById('signInWithGoogle').style.display = 'none';
    console.log("User is signed in");
    console.log("User ID: " + user.uid);
    console.log("User Name: " + user.displayName);
    console.log("User Email: " + user.email);
    // ... you can use other user properties as needed
  } else {
    // No user is signed in.
    const use = document.getElementById('useracc');
    const useracc = document.createElement('div');
      useracc.classList.add('useraccount');
      useracc.innerHTML = `<h3><b>Please Sign In<b><h3>`;
      use.appendChild(useracc)
    document.getElementById('signOutButton').style.display = 'none';
    document.getElementById('signInWithGoogle').style.display = 'block';
    console.log("No user is signed in");
  }
});


function signOutUser() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log('User signed out.');
    // Optionally, redirect the user to the login page or another page
    window.location.assign(''); // Replace 'login.html' with your login page URL
  }).catch(function(error) {
    // An error happened during sign-out.
    console.error('Error signing out:', error);
  });
}

document.getElementById('signOutButton').addEventListener('click', signOutUser);



document.addEventListener('DOMContentLoaded', () => {
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        loadSubmissionProfiles(user);
        loadSchedule(user);
        // ... you can use other user properties as needed
      }
    });


  
  // Function to show modal with fade-in effect
  // Function to show modal with fade-in effect
// script.js

// ...existing code...

// Function to show modal with fade-in effect

// Function to hide modal with fade-out effect


// Modify the event listener for the matchButton

// Modify the form submission event listener



// Modify the event listener for the close button


function addCourseSubmission(courseData) {
  const submissionRef = firebase.database().ref('1XCeMcCC2oDvdCo_6O6O9I1Q6PFR2Av5HhZQV4YY1_yY/Submissions/'+courseData.courseName);
  return submissionRef.set(courseData)
    .then(() => console.log(`Submission added for ${courseData.courseName}`))
    .catch((error) => console.error('Error adding submission:', error));
}
// ...rest of the existing code...
const courseForm = document.getElementById('courseForm');

  // Add event listener for form submission

  
});

function loadUserProfiles(panelID) {
  const userProfiles = document.getElementById(panelID);

  // Example users (static data for demonstration)
  const users = [
      { imageUrl: 'cornellguy0.png', name: 'Alice', age: 19, preference: 'Male', interests: 'Music, Hiking' },
      { imageUrl: 'cornellgirl1.png',name: 'Elise', age: 19, preference: 'Male', interests: 'Hiking, Movies' },
      { imageUrl: 'cornellguy1.png',name: 'Bob', age: 21, preference: 'Female', interests: 'Movies, Gaming' },
      { imageUrl: 'cornellguy2.png', name: 'David', age: 22, preference: 'Female', interests: 'Music, Tennis' },
      { imageUrl: 'cornellguy3.png',name: 'Max', age: 22, preference: 'Female', interests: 'Sports, Gaming' },
      { imageUrl: 'cornellgirl2.png',name: 'Megan', age: 20, preference: 'Male', interests: 'Movies, Music' },
      { imageUrl: 'cornellgirl5.png',name: 'Jason', age: 20, preference: 'Female', interests: 'Painting, Music' },
      { imageUrl: 'cornellgirl6.png',name: 'Lia', age: 22, preference: 'Male', interests: 'Sports, Music' },
      // Add more user profiles here
  ];

  firebase.database().ref('1XCeMcCC2oDvdCo_6O6O9I1Q6PFR2Av5HhZQV4YY1_yY/Courses/').once('value',   function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        

      const userProfile = document.createElement('div');
      userProfile.classList.add('userProfile');
    
      userProfile.innerHTML += `<h3>${childData.Course}</h3><p><b>Grade: ${childData.Grade}</b></p><p>Professor: ${childData.Professor}</p><p>Semester: ${childData.Semester}</p>`;
      userProfile.setAttribute('data-course', childData.Course);
      userProfile.setAttribute('data-grade', childData.Grade);
      userProfile.setAttribute('data-professor', childData.Professor);
      userProfile.setAttribute('data-semester', childData.Semester);
      userProfile.setAttribute('data-description', childData.Description);
      userProfile.setAttribute('data-name', childData.Name);
      userProfile.setAttribute('data-students', childData.NumberStudents);
      userProfile.setAttribute('data-distribution', childData.distribution);
      userProfile.setAttribute('data-credits', childData.credits);
      userProfile.setAttribute('data-prelim1', childData.prelim1);
      userProfile.setAttribute('data-prelim2', childData.prelim2);
      userProfile.setAttribute('data-prelim3', childData.prelim3);
      userProfiles.appendChild(userProfile);

      userProfile.addEventListener('click', function() {
          selectProfile(userProfile, panelID);
      });

    });
  });

  /*
  users.forEach(user => {
      const userProfile = document.createElement('div');
      userProfile.classList.add('userProfile');

      const imge = document.createElement('img');
      imge.src = user.imageUrl;


      userProfile.addEventListener('click', function() {
          selectProfile(userProfile, panelID);
      });

      userProfile.appendChild(imge);
      userProfile.innerHTML += `<h3>${user.name}</h3><p>Age: ${user.age}</p><p>Preferences: ${user.preference}</p><p>Interests: ${user.interests}</p>`;
      userProfile.setAttribute('data-age', user.age);
      userProfile.setAttribute('data-pref', user.preference);
      userProfiles.appendChild(userProfile);
  }); 
  */

}

function loadSubmissionProfiles(user) {
  const userProfiles = document.getElementById('panel1');

  // Example users (static data for demonstration)


  
  firebase.database().ref('1XCeMcCC2oDvdCo_6O6O9I1Q6PFR2Av5HhZQV4YY1_yY/Submissions/').once('value',   function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log(user.email)
        console.log(childData.submitter)

      const userProfile = document.createElement('div');
      if(childData.submitter === user.email) 
      {
        console.log('goot');
          userProfile.classList.add('userProfile');
    
          userProfile.innerHTML += `<h3>${childData.courseName}</h3><p><b>Grade: ${childData.medianGrade}</b></p><p>Professor: ${childData.professor}</p><p>Semester: ${childData.semester}</p>`;
          userProfile.setAttribute('data-course', childData.courseName);
          userProfile.setAttribute('data-grade', childData.medianGrade);
          userProfile.setAttribute('data-professor', childData.professor);
          userProfile.setAttribute('data-semester', childData.semester);
          userProfiles.appendChild(userProfile);
      }


    });
  });

}
function loadSchedule(user) {
  const userProfiles = document.getElementById('panel1');

  // Example users (static data for demonstration)


  
  firebase.database().ref('1XCeMcCC2oDvdCo_6O6O9I1Q6PFR2Av5HhZQV4YY1_yY/Schedules/'+user.email.substring(0, user.email.length-4)).once('value',   function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log(childData);
        addCourseToSpecificDays(childData, [2, 4]);


    });
  });

}


function Match() {
  // Toggle the display of the submission fields
  var submissionFields = document.getElementById('courseFormPopup');
  if (submissionFields.style.display === 'none') {
      submissionFields.style.display = 'block';
  } else {
      submissionFields.style.display = 'none';
  }
}

function selectProfile(profile, panelId) {
  // Deselect any previously selected profile in the same panel
  document.querySelectorAll(`#${panelId} .userProfile`).forEach(p => {
      p.classList.remove('selectedProfile');
  });

  profile.classList.add('selectedProfile');

  // Reference to the second panel
  document.getElementById('panel2').innerHTML = "";
  const secondaryPanel = document.getElementById('panel2');
  secondaryPanel.hidden = false; // Make the secondary panel visible

  // Get course details from the clicked profile
  const course = profile.getAttribute('data-course');
  const grade = profile.getAttribute('data-grade');
  const professor = profile.getAttribute('data-professor');
  const semester = profile.getAttribute('data-semester');
  const name = profile.getAttribute('data-name');
  const numstudents = profile.getAttribute('data-students');
  const secondaryelement = document.createElement('div');
  const coursefilterValue = course.substring(0, course.indexOf(" "))
  const descript = profile.getAttribute('data-description');
  const distribution = profile.getAttribute('data-distribution')
  const credit = profile.getAttribute('data-credits')
  const prel1 = profile.getAttribute('data-prelim1')
  const prel2= profile.getAttribute('data-prelim2')
  const prel3 = profile.getAttribute('data-prelim3')
  // Update the secondary panel with course details
  if(prel1 === undefined)
  {
      secondaryelement.innerHTML = `<h3>${course + ": " + name}</h3><p><b>Grade: ${grade}</b></p><p><b>Credits: ${credit}</b></p><p><b>Professor: ${professor}</b></p><p>Distribution: ${distribution}</p><p><b>Semester: ${semester}</b></p><p>Description: "${descript}"(Cornell University)</p><p>Approximate Number of Students: ${numstudents}</p><button id = "matchButton" onclick="location.href='https://classes.cornell.edu/browse/roster/SP24/class/${coursefilterValue}/${course.substring(course.length-4)}'" >Explore</button>`;

  }
  if(prel2 === "N/A")
  {
      secondaryelement.innerHTML = `<h3>${course + ": " + name}</h3><p><b>Grade: ${grade}</b></p><p><b>Credits: ${credit}</b></p><p><b>Professor: ${professor}</b></p><p>Distribution: ${distribution}</p><p><b>Semester: ${semester}</b></p><p>Description: "${descript}"(Cornell University)</p><p><b>Prelim 1: ${prel1}<b></p><p>Approximate Number of Students: ${numstudents}</p><button id = "matchButton" onclick="location.href='https://classes.cornell.edu/browse/roster/SP24/class/${coursefilterValue}/${course.substring(course.length-4)}'" >Explore</button>`;

  }
  else if(prel3 === "N/A")
  {
      secondaryelement.innerHTML = `<h3>${course + ": " + name}</h3><p><b>Grade: ${grade}</b></p><p><b>Credits: ${credit}</b></p><p><b>Professor: ${professor}</b></p><p>Distribution: ${distribution}</p><p><b>Semester: ${semester}</b></p><p>Description: "${descript}"(Cornell University)</p><p><b>Prelim 1: ${prel1}<b></p><p><b>Prelim 2: ${prel2}<b></p><p>Approximate Number of Students: ${numstudents}</p><button id = "matchButton" onclick="location.href='https://classes.cornell.edu/browse/roster/SP24/class/${coursefilterValue}/${course.substring(course.length-4)}'" >Explore</button>`;

  }
  else
  {
      secondaryelement.innerHTML = `<h3>${course + ": " + name}</h3><p><b>Grade: ${grade}</b></p><p><b>Credits: ${credit}</b></p><p><b>Professor: ${professor}</b></p><p>Distribution: ${distribution}</p><p><b>Semester: ${semester}</b></p><p>Description: "${descript}"(Cornell University)</p><p><b>Prelim 1: ${prel1}<b></p><p><b>Prelim 2: ${prel2}<b></p><p><b>Prelim 3: ${prel3}<b></p><p>Approximate Number of Students: ${numstudents}</p><button id = "matchButton" onclick="location.href='https://classes.cornell.edu/browse/roster/SP24/class/${coursefilterValue}/${course.substring(course.length-4)}'" >Explore</button>`;

  }
  
     
  
  
  secondaryPanel.appendChild(secondaryelement);
}


// ... rest of your JavaScript code ...



function filterProfiles(panelId) {
  const coursefilterValue = document.getElementById(`CourseFilter${panelId}`).value;
  const gradefilterValue = document.getElementById(`GradeFilter${panelId}`).value;
  const profiles = document.querySelectorAll(`#${panelId} .userProfile`);
  
  profiles.forEach(profile => {
      const course = profile.getAttribute('data-course');
      const grade = profile.getAttribute('data-grade');
      
      if ((gradefilterValue === 'all' || grade.includes(gradefilterValue)) && (coursefilterValue === 'all' || course.includes(coursefilterValue))) {
          profile.style.display = ''; // Show profile
          
      } 
      else
      {
          profile.style.display = 'None'; // Hide profile
      }
  });
}

function isAgeInRange(age, range) {
  if (range === '18-20') return age >= 18 && age <= 20;
  if (range === '21-23') return age >= 21 && age <= 23;
  if (range === '24+') return age >= 24;
  return false;
} 



function createCalendarDays() {
  const calendarBody = document.getElementById('calendarBody');
  for (let i = 0; i < 28; i++) { // Assuming 4 weeks in a month for simplicity
      const dayDiv = document.createElement('div');
      dayDiv.classList.add('day-container'); // Add a class for styling
      
      const coursesContainer = document.createElement('div');
      coursesContainer.classList.add('courses-container');
      dayDiv.appendChild(coursesContainer);
      
      calendarBody.appendChild(dayDiv);
  }
}

function addCourseToSpecificDays(courseName, daysOfWeek) {
  const dayContainers = document.querySelectorAll('#calendarBody .day-container');
  dayContainers.forEach((container, index) => {
      const dayOfWeek = index % 7;
      if (daysOfWeek.includes(dayOfWeek)) {
          const courseButton = document.createElement('button');
          courseButton.classList.add('calendar-day');
          courseButton.textContent = courseName;

          container.querySelector('.courses-container').appendChild(courseButton);
      }
  });
}


// Initialize the calendar
createCalendarDays();

// Add CS 2110 to Monday (1), Wednesday (3), and Friday (5)