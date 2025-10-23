let url = 'http://localhost:3000/login/auth';
let urlDashboard = "http://localhost:3000/dashboard"

document.getElementById("form-login").addEventListener("submit",
  async function(event) {
        event.preventDefault()
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        try {  
            const userData = {
              username : username,
              password : password,
            }
            const response = await fetch(url,{
              method: 'POST',
              body : JSON.stringify(userData),
              headers :{
                "Content-Type" : "application/json"
              }
            })
              .then((res) => {
                if(res.ok){
                  return res.json();
                }else{
                  throw new Error(`Response status: ${response.status}`)
                }
              }) 
              .then((data) => {
                console.log("masuk halaman admin")
                console.log(data)
                    window.location.href = urlDashboard;
              })
              .catch(err => {
                console.log(err)
              })
      }catch(error) {
        console.error(error)
      } 
    
})
