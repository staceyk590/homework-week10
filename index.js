const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const fetch= require("node-fetch");

const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "pink",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "red",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};



const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "color",
      message: "What is your favorite color?"
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
  ]);
}


promptUser()
 .then(async function(answers) {
   // const html = generateHTML(answers);
   let userInfo = await fetchUsers(answers.github);
   console.log("userInfo", userInfo);
   console.log("name", userInfo.data.name);
   console.log("Location", userInfo.data.location);
   console.log("Followers", userInfo.data.followers);
   console.log("Following",userInfo.data.following);
   console.log("Public Repositories", userInfo.data.public_repos);
   console.log("Bio", userInfo.data.bio);
   const html = generateHTML(answers, userInfo);

   return writeFileAsync("index.html", html);
 })
 .then( function() {
   //let userInfo = await fetchUsers();
   
   console.log("Successfully wrote to index.html");
 })
 .catch(function(err) {
   console.log(err);
 });


const fetchUsers = async (user) => {
   const api_call = await fetch("https://api.github.com/users/" + user);
   const data = await api_call.json();
 
   return {data}};
 


  
  
  


 function generateHTML(answers, userInfo) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
      <link rel="stylesheet" href="style.css" />
      <style>
      .photo-header {
        background-color: ${colors[answers.color].headerBackground};
        color: ${colors[answers.color].headerColor};
      }
      .wrapper {
        background-color: ${colors[answers.color].wrapperBackground};
        .card {
          background-color: ${colors[answers.color].headerBackground};
          color: ${colors[answers.color].headerColor};
        }
        .photo-header img {
          border: 6px solid ${colors[answers.color].photoBorderColor};
          }
      </style>
      <title>Document</title>
      
</head>

<body>
<div class="info">
  <div class="wrapper jumbotron jumbotron-fluid">
  <div class="container center-block text-center">
    
    <h1 class="display-4">Hi! My name is ${userInfo.data.name}</h1>
      <h2class="list-group-item">${userInfo.data.company}</h2>
  </div>
  
  
  <div class="row">
    <div class="col-sm-12 center-block text-center">
    <p>${userInfo.data.location}</p>
  <a  href="${userInfo.data.html_url}">Github</a>
  <a href="${userInfo.data.blog}"> Blog</a>

  </div>
  </div>
  </div>
  

  <div class="container text-center">
    <h1>BIO</h1>      
    <p>${userInfo.data.bio}</p>
  </div>

  
<div class="info container-fluid bg-3 text-center">    
  <div class="row">
    <div class="col-sm-6">
      <p>Followers ${userInfo.data.followers}</p>
    </div>
    <div class="info col-sm-6"> 
      <p>Following ${userInfo.data.following}</p>
    </div>
  </div>
</div>
<div class="info container-fluid bg-3 text-center">  
  <div class="row">
    <div class="col-sm-12">
      <p>Public Repositories ${userInfo.data.public_repos}</p>
    </div>
</div>
</div>
  </div>
  </div>
</body>
</html>`;
}
