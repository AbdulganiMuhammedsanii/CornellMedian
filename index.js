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
fs.readFile('Course.json', 'utf-8', async (err, data) => {
  if (err) throw err;

  var obj = JSON.parse(data);
  console.log("good")

  const coursesRef = ref(db, '1XCeMcCC2oDvdCo_6O6O9I1Q6PFR2Av5HhZQV4YY1_yY/Courses/');
  const snapshot = await get(coursesRef);

  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
      var childKey = childSnapshot.key;
      console.log(childKey)
      if(obj[childKey]) {
        if (obj[childKey].Name == null){
          addSubElements(
            childKey, 
            { key: 'Description', value: obj[childKey].description },
            { key: 'credits', value: obj[childKey].credits },
            {key: 'distribution', value: obj[childKey].distribution},
            {key: 'Name', value: ""},
          );
        }
        else{
          addSubElements(
            childKey, 
            { key: 'Description', value: obj[childKey].description },
            { key: 'credits', value: obj[childKey].credits },
            {key: 'distribution', value: obj[childKey].distribution},
            {key: 'Name', value: obj[childKey].Name},
          );
        }
      }
    });
  } else {
    console.log("No data available");
  }
});

/*
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
        return pgTags ? pgTags.innerHTML : null;
      });


      const creds = await page.evaluate(() => {
        const pgTags = document.querySelector('.credit-val');
        return pgTags ? pgTags.innerHTML : null;
      });

      // Append to existing data
      allCoursesData[childData.Course] = {
        description: description,
        credits: creds
      };
      await page.close();
    }

    // Write the updated JSON back to file
    const jsonString = JSON.stringify(allCoursesData, null, 2);
    fs.writeFileSync('Courses.json', jsonString);

    await browser.close();
  } else {
    console.log("No data available");
  }
})();
*/

function addSubElements(parentKey, subElement1, subElement2, subElement3, subElement4) {
  const updates = {};
  updates[`${parentKey}/${subElement1.key}`] = subElement1.value;
  updates[`${parentKey}/${subElement2.key}`] = subElement2.value;
  updates[`${parentKey}/${subElement3.key}`] = subElement3.value;
  updates[`${parentKey}/${subElement4.key}`] = subElement4.value;

  return update(ref(db,  '1XCeMcCC2oDvdCo_6O6O9I1Q6PFR2Av5HhZQV4YY1_yY/Courses/'), updates)
  .then(() => console.log(`Data updated for ${parentKey}`))
  .catch((error) => console.error('Error updating database:', error));
}

