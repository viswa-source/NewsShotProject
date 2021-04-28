<template>
 <div class="main">
   <button @click="upload">GET</button>
   <div class="card" v-for="data in data" :key="data">
    <img :src="data.imgSrc" width="200" height="200" alt="">
    <li>{{data.title}} </li>    
   </div>
 </div>
</template>

<script>
import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'
 var firebaseConfig = {
    apiKey: "AIzaSyCBtJj6_IPaUpRu_zdTOdgFcU7a1B_F3Y4",
    authDomain: "vuenews-247ff.firebaseapp.com",
    databaseURL: "https://vuenews-247ff-default-rtdb.firebaseio.com",
    projectId: "vuenews-247ff",
    storageBucket: "vuenews-247ff.appspot.com",
    messagingSenderId: "623389680566",
    appId: "1:623389680566:web:e7b96f6e34ba27ba315717",
    measurementId: "G-VVD9K50P4X"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default {
 data(){
   return{
     data:[]
   }
 },
 async created(){
 const firestore = firebase.firestore()
 const docRef = firestore.collection('TotalData')
 docRef.get().then((data) => {
    data.forEach((doc) => {
      this.data.push(doc.data());
        console.log(doc.data());
    });
});
    
 },
 methods:{
   readURL(event) {
     /* const fileSelector = document.getElementById('img').files[0] */
     console.log(URL.createObjectURL(event.target.files[0]))
/*       const fileSelector = document.getElementById('img');
      console.log(fileSelector.file) */

},
    upload(){
          
   }
 }
}
</script>

<style>
body{
  background:#adadad;
}
.main{
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
}
.card{
  color:rgb(0, 0, 0);
  background:#ffffff;
  margin:20px;
  width:300px;
  padding: 2rem;
  border-radius: 30px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
