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
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};

//const github = document.querySelector ("answers.github");
const nameContainer = document.querySelector(".main__profile-name");
//const unContainer = document.querySelector("main__profile-username");
//const reposContainer = document.querySelector(".main__profile-repos");
//const urlContainer = document.querySelector(".main__profile-url");


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


function generateHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
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
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    
    <h1 class="display-4">Hi! My favorite color is ${answers.color}</h1>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
    </ul>
  </div>
  <div class="main-profile">
      <div class="row">
        <div class="col-md-6">
          <p class="main__profile-name main__profile-key"></p>
        <div class="col-md-6">
          <p class="main__profile-repo main__profile-key"></p>
          <p class="main__profile-url main__profile-key"></p>
        </div>
        </div>
      </div>
  </div>
  </div>
</body>
</html>`;
}




const fetchUsers = async (user) => {
   const api_call = await fetch('https://api.github.com/users/staceyk590');
   const data = await api_call.json();
   return {data}
   console.log(data)};


  
//const showData = () => {
 // fetchUsers (staceyk560). then((res) => {
 //   console.log(res);
 // })
//};

promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("index.html", html);
  })
  .then(function() {
    fetchUsers();
    console.log("Successfully wrote to index.html");
  })
  .catch(function(err) {
    console.log(err);
  });