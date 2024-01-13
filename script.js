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

document.getElementById('scrolltopanels').addEventListener('click', () => {
    document.getElementById('matchButton').scrollIntoView({ behavior: 'smooth' });
});

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseC = {
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
  firebase.initializeApp(firebaseC);
  
  // Get a reference to the database service
  var database = firebase.database();


const signInWithGoogleButton = document.getElementById('signInWithGoogle')

const auth = firebase.auth();

var fn = document.getElementById('fn');
var ln = document.getElementById('ln');
var em = document.getElementById('em');
var pas = document.getElementById('pas');

// Sign up
window.signup = function(e){
    e.preventDefault();
    const modal = document.getElementById('SignupInfo');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500); // Delay must match the CSS transition duration
    var obj={
        fn:fn.value,
        ln:ln.value,
        em:em.value,
        pas:pas.value,
    }
    auth.createUserWithEmailAndPassword(obj.em, obj.pas)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    user.updateProfile({
        displayName: obj.fn + " " + obj.ln
    }).then(function() {
        // Update successful
        console.log("Display Name Updated: ", user.displayName);
    }).catch(function(error) {
        // An error happened while updating the display name
        console.error("Error updating display name: ", error);
    });
    //(user);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
  //console.log(obj);
}

var ema = document.getElementById('ema');
var pass = document.getElementById('pass');

//Sign In

window.signin = function(e){
    e.preventDefault();
    const modal = document.getElementById('loginInfo');
    modal.classList.remove('show');
    setTimeout(() => { // Redirects to the homepage
        modal.style.display = 'none';
    }, 500); // Delay must match the CSS transition duration
    var obj={
        ema:ema.value,
        pass:pass.value,
    }
    auth.signInWithEmailAndPassword(obj.ema, obj.pass)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    //console.log(user);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
  //console.log(obj);
}


window.loginmember = function(e){
    e.preventDefault();
    const modal = document.getElementById('SignupInfo');
    const modal2 = document.getElementById('loginInfo');
    modal.classList.remove('show');
    console.log("hello");
    setTimeout(() => { // Redirects to the homepage
        modal.style.display = 'none';
    }, 800); // Delay must match the CSS transition duration
    modal2.classList.add('show');
    modal2.style.display = 'flex'
  //console.log(obj);
}

window.signupmember = function(e){
    e.preventDefault();
    const modal = document.getElementById('SignupInfo');
    const modal2 = document.getElementById('loginInfo');
    modal2.classList.remove('show');
    console.log(modal);
    setTimeout(() => { // Redirects to the homepage
        modal2.style.display = 'none';
    }, 800); // Delay must match the CSS transition duration
    modal.classList.add('show');
    modal.style.display = 'flex'
  //console.log(obj);
}



const signInWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(googleProvider)
  .then(() => {
    window.location.assign('./');
  })
  .catch(error => {
    console.error(error);
  })
}

//signInWithGoogleButton.addEventListener('click', signInWithGoogle);


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      }
      

      const use = document.getElementById('useracc');
      const useracc = document.createElement('div');
        useracc.classList.add('useraccount');
        if(user.displayName)
        {
            useracc.innerHTML = `<h3><b>Hi, ${user.displayName}<b><h3>`;
        }
        else
        {
            delay(1000).then(() => useracc.innerHTML = `<h3><b>Hi, ${user.displayName}<b><h3>`);
        }
        
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
        useracc.innerHTML = `<h3><b><b><h3>`;
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
    
    
    document.getElementById('scrolltopanels').addEventListener('click', () => {
    document.getElementById('panels-wrapper').scrollIntoView({ behavior: 'smooth' });
});

    loadUserProfiles('panel1');
    document.getElementById('GradeFilterpanel1').addEventListener('change', () => filterProfiles('panel1'));
    document.getElementById('CourseFilterpanel1').addEventListener('change', () => filterProfiles('panel1'));
    document.getElementById('courseSearch').addEventListener('input', function() {
        const searchValue = this.value.toUpperCase();
        const courseSelect = document.getElementById('CourseFilterpanel1');
        const options = courseSelect.options;
        const profiles = document.querySelectorAll(`#panel1 .userProfile`);
        profiles.forEach(profile => {
            const course = profile.getAttribute('data-course');
            if ((course.includes(searchValue))) {
                profile.style.display = ''; // Show profile
                
            } 
            else
            {
                profile.style.display = 'None'; // Hide profile
            }
        });
    });
    
    document.getElementById('matchButton').addEventListener('click', function() {
        document.getElementById('courseModal').style.display = 'block';
    });

    
    // Function to show modal with fade-in effect
    // Function to show modal with fade-in effect
// script.js

// ...existing code...

// Function to show modal with fade-in effect
function showModalWithFade(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
    modal.style.display = 'flex'
}

// Function to hide modal with fade-out effect
function hideModalWithFade(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500); // Delay must match the CSS transition duration
}

// Modify the event listener for the matchButton
document.getElementById('matchButton').addEventListener('click', function() {
    showModalWithFade('courseModal');
    console.log("WORKS");
});

document.getElementById('courseForm1').addEventListener('submit', function(event) {
    event.preventDefault();

        console.log("HEUFHFUIE");

        hideModalWithFade('courseModal');

    // Show the submission message
    showModalWithFade('submissionMessage');

    // Hide the submission message after a delay
    setTimeout(() => {
        hideModalWithFade('submissionMessage');
    }, 1500); // 3 seconds

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              const courseData = {
                courseName: document.getElementById('courseName').value,
                professor: document.getElementById('professor').value,
                medianGrade: document.getElementById('medianGrade').value,
                semester: document.getElementById('semester').value,
                submitter: user.email
                
            };
            console.log(courseData);
            addCourseSubmission(courseData).then(() => {
                // Clear the form or show a success message after submission
                SubmissionForm.reset();
                // Add any additional actions you want to perform after submission
            });
            } else {
              // No user is signed in.
              const courseData = {
                courseName: document.getElementById('courseName').value,
                professor: document.getElementById('professor').value,
                medianGrade: document.getElementById('medianGrade').value,
                semester: document.getElementById('semester').value,
                submitter: 'anonymous'
            };
            addCourseSubmission(courseData).then(() => {
                // Clear the form or show a success message after submission
                SubmissionForm.reset();
                // Add any additional actions you want to perform after submission
            });
            }
            // Add the course data to Firebase
          });

        // Get values from the form
    // Hide the course submission modal
});

document.getElementById('signInWithGoogle').addEventListener('click', function() {
    console.log('here');
    showModalWithFade('loginInfo');
});

document.getElementById('not yet').addEventListender('click', function()
{
    console.log("REREEE");
    hideModelWithFade('loginInfo');
    showModalWithFade('SignupInfo');
})

document.getElementById('already').addEventListender('click', function()
{
    hideModelWithFade('SignupInfo');
    showModalWithFade('loginInfo');
})

// Modify the form submission event listener
document.getElementById('signInWithGoogle').addEventListener('Sign Up', function(event) {
    event.preventDefault();

    // Hide the course submission modal
    hideModalWithFade('SignupInfo');

    // Show the submission message
    showModalWithFade('submissionMessage');

    // Hide the submission message after a delay
    setTimeout(() => {
        hideModalWithFade('submissionMessage');
    }, 1500); // 3 seconds
});

document.getElementById('signInWithGoogle').addEventListener('Sign In', function(event) {
    event.preventDefault();
    // Hide the course submission modal
    hideModalWithFade('loginInfo');

    // Show the submission message
    // Hide the submission message after a delay
});




// Modify the event listener for the close button
var span = document.getElementsByClassName("close")[0];
if (span) {
    span.onclick = function() {
        hideModalWithFade('courseModal');
    }
}

// Close the modal if clicked outside
window.onclick = function(event) {
    var modal = document.getElementById('courseModal');
    if (event.target == modal) {
        hideModalWithFade('courseModal');
    }
}


function addCourseSubmission(courseData) {
    const submissionRef = firebase.database().ref('1XCeMcCC2oDvdCo_6O6O9I1Q6PFR2Av5HhZQV4YY1_yY/Submissions/'+courseData.courseName);
    return submissionRef.set(courseData)
      .then(() => console.log(`Submission added for ${courseData.courseName}`))
      .catch((error) => console.error('Error adding submission:', error));
  }

function addScheduleSubmission(courseName, user) {
    const submissionRef = firebase.database().ref('1XCeMcCC2oDvdCo_6O6O9I1Q6PFR2Av5HhZQV4YY1_yY/Schedules/'+user.email+'/'+courseName);
    
    return submissionRef.set(courseName)
      .then(() => console.log(`Submission added to ${user.email }for ${courseName}`))
      .catch((error) => console.error('Error adding submission:', error));
}
// ...rest of the existing code...
const SubmissionForm = document.getElementById('courseForm1');




    // Add event listener for form submission
    SubmissionForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        console.log("HEUFHFUIE");
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              const courseData = {
                courseName: document.getElementById('courseName').value,
                professor: document.getElementById('professor').value,
                medianGrade: document.getElementById('medianGrade').value,
                semester: document.getElementById('semester').value,
                submitter: user.email
                
            };
            console.log(courseData);
            addCourseSubmission(courseData).then(() => {
                // Clear the form or show a success message after submission
                SubmissionForm.reset();
                // Add any additional actions you want to perform after submission
            });
            } else {
              // No user is signed in.
              const courseData = {
                courseName: document.getElementById('courseName').value,
                professor: document.getElementById('professor').value,
                medianGrade: document.getElementById('medianGrade').value,
                semester: document.getElementById('semester').value,
                submitter: 'anonymous'
            };
            addCourseSubmission(courseData).then(() => {
                // Clear the form or show a success message after submission
                SubmissionForm.reset();
                // Add any additional actions you want to perform after submission
            });
            }
            // Add the course data to Firebase
          });

        // Get values from the form

    });
    
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
        userProfile.setAttribute('data-section', childData.section);
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
    const coursefilterValue = course.substring(0, course.indexOf(" "));
    const descript = profile.getAttribute('data-description');
    const distribution = profile.getAttribute('data-distribution');
    const credit = profile.getAttribute('data-credits');
    const prel1 = profile.getAttribute('data-prelim1');
    const prel2= profile.getAttribute('data-prelim2');
    const prel3 = profile.getAttribute('data-prelim3');
    const section = profile.getAttribute('data-section');
    // Update the secondary panel with course details
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          // ... you can use other user properties as needed
          console.log(prel1);
    if(prel2 === "N/A")
    {
        secondaryelement.innerHTML = `<h3 id = "cn">${course + ": " + name}</h3><p><b>Grade: ${grade}</b></p><p><b>Credits: ${credit}</b></p><p><b>Professor: ${professor}</b></p><p><b>Section: ${section}</b></p><p>Distribution: ${distribution}</p><p><b>Semester: ${semester}</b></p><p>Description: "${descript}"(Cornell University)</p><p><b>Prelim 1: ${prel1}<b></p><p>Approximate Number of Students: ${numstudents}</p><button id = "matchButton1" onclick="location.href='https://classes.cornell.edu/browse/roster/SP24/class/${coursefilterValue}/${course.substring(course.length-4)}'" >explore</button><button id = "matchButton2" >add to schedule</button>`;

    }
    else if(prel3 === "N/A")
    {
        secondaryelement.innerHTML = `<h3 id = "cn">${course + ": " + name}</h3><p><b>Grade: ${grade}</b></p><p><b>Credits: ${credit}</b></p><p><b>Professor: ${professor}</b></p><p><b>Section: ${section}</b></p><p>Distribution: ${distribution}</p><p><b>Semester: ${semester}</b></p><p>Description: "${descript}"(Cornell University)</p><p><b>Prelim 1: ${prel1}<b></p><p><b>Prelim 2: ${prel2}<b></p><p>Approximate Number of Students: ${numstudents}</p><button id = "matchButton1" onclick="location.href='https://classes.cornell.edu/browse/roster/SP24/class/${coursefilterValue}/${course.substring(course.length-4)}'" >explore</button><button id = "matchButton2" >add to schedule</button>`;

    }
    else
    {
        secondaryelement.innerHTML = `<h3 id = "cn">${course + ": " + name}</h3><p><b>Grade: ${grade}</b></p><p><b>Credits: ${credit}</b></p><p><b>Professor: ${professor}</b></p><p><b>Section: ${section}</b></p><p>Distribution: ${distribution}</p><p><b>Semester: ${semester}</b></p><p>Description: "${descript}"(Cornell University)</p><p><b>Approximate Number of Students: ${numstudents}</b></p><button id = "matchButton1" onclick="location.href='https://classes.cornell.edu/browse/roster/SP24/class/${coursefilterValue}/${course.substring(course.length-4)}'" >explore</button><button id = "matchButton2" >add to schedule</button>`;

    }
    const second = document.getElementById('matchButton2');

    second.addEventListener('click', function() {
        
        const sect = profile.getAttribute('data-section');
        const grad = profile.getAttribute('data-grade');
        
        // Create a reference to the user's schedule in Firebase
        const userScheduleRef = firebase.database().ref('1XCeMcCC2oDvdCo_6O6O9I1Q6PFR2Av5HhZQV4YY1_yY/Schedules/' + user.email.substring(0, user.email.length-4).replace('.',''));
        
        // Object to hold the updates
        const courseUpdates = {};
        courseUpdates[course] = {
            grade: grad,
            section: sect,
            course: course // This seems redundant since the key is already the course name
        };
        
        // Update the schedule with the new course information
        userScheduleRef.update(courseUpdates)
            .then(() => console.log(`Submission added to ${user.email} for ${course} with grade ${grad} and section ${sect}`))
            .catch((error) => console.error('Error adding submission:', error));
    });
    
    
        }
        else{
            if(prel2 === "N/A")
            {
                secondaryelement.innerHTML = `<h3 id = "cn">${course + ": " + name}</h3><p><b>Grade: ${grade}</b></p><p><b>Credits: ${credit}</b></p><p><b>Professor: ${professor}</b></p><p><b>Section: ${section}</b></p><p>Distribution: ${distribution}</p><p><b>Semester: ${semester}</b></p><p>Description: "${descript}"(Cornell University)</p><p><b>Prelim 1: ${prel1}<b></p><p>Approximate Number of Students: ${numstudents}</p><button id = "matchButton1" onclick="location.href='https://classes.cornell.edu/browse/roster/SP24/class/${coursefilterValue}/${course.substring(course.length-4)}'" >explore</button><button id = "matchButton2" >add to schedule</button>`;
        
            }
            else if(prel3 === "N/A")
            {
                secondaryelement.innerHTML = `<h3 id = "cn">${course + ": " + name}</h3><p><b>Grade: ${grade}</b></p><p><b>Credits: ${credit}</b></p><p><b>Professor: ${professor}</b></p><p><b>Section: ${section}</b></p><p>Distribution: ${distribution}</p><p><b>Semester: ${semester}</b></p><p>Description: "${descript}"(Cornell University)</p><p><b>Prelim 1: ${prel1}<b></p><p><b>Prelim 2: ${prel2}<b></p><p>Approximate Number of Students: ${numstudents}</p><button id = "matchButton1" onclick="location.href='https://classes.cornell.edu/browse/roster/SP24/class/${coursefilterValue}/${course.substring(course.length-4)}'" >explore</button><button id = "matchButton2" >add to schedule</button>`;
        
            }
            else
            {
                secondaryelement.innerHTML = `<h3 id = "cn">${course + ": " + name}</h3><p><b>Grade: ${grade}</b></p><p><b>Credits: ${credit}</b></p><p><b>Professor: ${professor}</b></p><p><b>Section: ${section}</b></p><p>Distribution: ${distribution}</p><p><b>Semester: ${semester}</b></p><p>Description: "${descript}"(Cornell University)</p><p><b>Approximate Number of Students: ${numstudents}</b></p><button id = "matchButton1" onclick="location.href='https://classes.cornell.edu/browse/roster/SP24/class/${coursefilterValue}/${course.substring(course.length-4)}'" >explore</button><button id = "matchButton2" >add to schedule</button>`;
        
            }

        }
      });
    
       
    
    
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

function Searchfilter(substr) {
    
    const coursefilterValue = document.getElementById(`CourseFilter${panelId}`).value;
    const profiles = document.querySelectorAll(`#${panelId} .userProfile`);
    
    profiles.forEach(profile => {
        const course = profile.getAttribute('data-course');
        
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


