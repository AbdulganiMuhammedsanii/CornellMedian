const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, update, } = require('firebase/database');
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

// Initialize Firebase
(async () => {
  const coursesRef = ref(db, '1XCeMcCC2oDvdCo_6O6O9I1Q6PFR2Av5HhZQV4YY1_yY/Courses/');
  const snapshot = await get(coursesRef);

  if (snapshot.exists()) {
    const browser = await puppeteer.launch();
    
    // Read existing data
    let allCoursesData = {};
    if (fs.existsSync('Times.json')) {
      allCoursesData = JSON.parse(fs.readFileSync('Times.json', 'utf8'));
    }

    for (const childSnapshot of Object.values(snapshot.val())) {
      var childData = childSnapshot;

      const page = await browser.newPage();
      await page.goto('https://classes.cornell.edu/browse/roster/SP24/class/' + childData.Course.substring(0, childData.Course.indexOf(" ")) + '/' + childData.Course.substring(childData.Course.length - 4));

      const section = await page.evaluate(() => {
        const pgTags = document.querySelector('.pattern-only');
        if(pgTags){
          const result = pgTags.innerHTML.substring(pgTags.innerHTML.length - 10);
          var res = "";
          for (let i = 0; i < result.length; i++) {
            if(result[i] == "T" || result[i] == "R" || result[i] == "F" || result[i] == "M" || result[i] == "w")
            {
              res+=result[i];
            }
          }
          return res;
        }
        return null;
      });


      // Append to existing data
      allCoursesData[childData.Course] = {
        section:section
      };
      await page.close();
    }

    // Write the updated JSON back to file
    const jsonString = JSON.stringify(allCoursesData, null, 2);
    fs.writeFileSync('Times.json', jsonString);

    await browser.close();
  } else {
    console.log("No data available");
  }
})();


