var admin = require("firebase-admin");
const puppeteer = require('puppeteer');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});



var serviceAccount = require("C:/Users/admin/Downloads/vuenews-247ff-firebase-adminsdk-fy2pg-34dcfba820.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vuenews-247ff-default-rtdb.firebaseio.com"
});
const db = admin.firestore();

const docRef = db.collection('TotalData').doc(new Date().toISOString());


(async () => {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto('https://www.dailythanthi.com/', { waitUntil: 'networkidle2' });
    var url=''



    let data = await page.evaluate(async () => {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time =today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        let imgSrc = document.querySelector('img[class="img-responsive img-sec "]').src
        let title=document.querySelector('div[class="NewsWithTopImage"] > a > h4').innerText
        return {
            imgSrc,
            title,
            time,
            date
        }
    })
    




    let shotResult = await page.screenshot({
        fullPage: true
      }).then((result) => {
        console.log(`${data.date} got some results.`);
        return result;
      }).catch(e => {
        console.error(`[${data.date}] Error in snapshotting news`, e);
        return false;
      });
    if (shotResult) {
        return cloudinaryPromise(shotResult, `${data.date}`);
    }
    




function cloudinaryPromise(shotResult, cloudinary_options) {
    
    return new Promise(function(res, rej){
      cloudinary.v2.uploader.upload_stream(cloudinary_options,
        function (error, cloudinary_result) {
          if (error){
            console.error('Upload to cloudinary failed: ', error);
            rej(error);
            }
            console.log(cloudinary_result)
            data.url=cloudinary_result.url
            docRef.set(data);
          res(cloudinary_result);
        }
      ).end(shotResult);
    });
    }
    






    await browser.close();
})()


