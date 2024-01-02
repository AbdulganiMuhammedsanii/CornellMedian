const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, remove} = require('firebase/database');
const fs = require('fs');

// Your Firebase configuration
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
    snapshot.forEach((childSnapshot) => {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      console.log(childKey)
      if(childData.Name == -1)
      {
        remove(ref(db, '1XCeMcCC2oDvdCo_6O6O9I1Q6PFR2Av5HhZQV4YY1_yY/Courses/'+childKey))
        .then(() => console.log('Element removed successfully.'))
        .catch(error => console.error('Error removing element:', error));
      }
    });
  } else {
    console.log("No data available");
  }


})();