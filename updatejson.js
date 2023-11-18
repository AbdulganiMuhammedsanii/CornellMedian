const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get } = require('firebase/database');
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

(async () => {
  const coursesRef = ref(db, '1XCeMcCC2oDvdCo_6O6O9I1Q6PFR2Av5HhZQV4YY1_yY/Courses/');
  const snapshot = await get(coursesRef);

  if (snapshot.exists()) {
    const browser = await puppeteer.launch();
    
    // Read existing data
    let allCoursesData = {};
    if (fs.existsSync('Courses.json')) {
      allCoursesData = JSON.parse(fs.readFileSync('Courses.json', 'utf8'));
    }

    for (const childSnapshot of Object.values(snapshot.val())) {
      var childData = childSnapshot;

      const page = await browser.newPage();
      await page.goto('https://classes.cornell.edu/browse/roster/SP24/class/' + childData.Course.substring(0, childData.Course.indexOf(" ")) + '/' + childData.Course.substring(childData.Course.length - 4));

      const description = await page.evaluate(() => {
        const pgTags = document.querySelector('.catalog-descr');
        return pgTags ? pgTags.innerHTML : -1;
      });

      const reqs = await page.evaluate(() => {
        const pgTags = document.querySelector('.catalog-distr');
        return pgTags ? pgTags.innerHTML : -1;
      });

      const creds = await page.evaluate(() => {
        const pgTags = document.querySelector('.credit-val');
        return pgTags ? pgTags.innerHTML : -1;
      });

      const name = await page.evaluate(() => {
        const pgTags = document.querySelector('.title-coursedescr a');
        return pgTags ? pgTags.innerHTML : -1;
      });

      // Append to existing data
      if(reqs != -1)
      {
        allCoursesData[childData.Course] = {
            description: description,
            distribution: reqs.substring(reqs.indexOf("(")),
            credits: creds,
            Name: name
          };
          console.log(allCoursesData[childData.Course])
      }
      else{
        allCoursesData[childData.Course] = {
            description: description,
            distribution: null,
            credits: creds,
            Name: name
          };
          console.log(allCoursesData[childData.Course])
      }

      console.log("aqui")
      await page.close();
    }

    // Write the updated JSON back to file
    console.log("here")
    const jsonString = JSON.stringify(allCoursesData, null, 2);
    console.log("lol")
    fs.writeFileSync('Course.json', jsonString);
    console.log("gayy")

    await browser.close();
  } else {
    console.log("No data available");
  }
})();


/*
    const name = await page.evaluate(() => {
    const courseCode = childData.Course.substring(0, childData.Course.indexOf(" "));
    const courseNumber = childData.Course.substring(childData.Course.length - 4);
  const selector = `.dtitle${courseCode}${courseNumber}`;
  const pgTags = document.querySelector(selector);
  return pgTags ? pgTags.innerHTML : null;
});
*/