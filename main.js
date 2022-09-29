
let form = document.getElementById("form")
let list = document.getElementById('list')
form.addEventListener('submit',addItem)
window.addEventListener('DOMContentLoaded',remember)

function remember(){

    axios.get("https://crudcrud.com/api/cf39668d4a244a4cb6f7d95d5c7378d8/appointmentData")
    .then((response)=>{
        console.log(response)
        for(let i=0;i<response.data.length;i++){
            let serial = response.data[i]
            addElement(serial)

        }
    })
//     var key = Object.keys(localStorage)
//     i=key.length
//     for(let j=0;j<i;j++){
//         console.log(key[j])
//         let serial = localStorage.getItem(key[j])
//         let Obj = JSON.parse(serial)
//         addElement(Obj)
//     }
 }

function addItem(e){
    e.preventDefault()

    //get values
    let name = document.getElementById("name").value 
    let email = document.getElementById("email").value 
    let phone= document.getElementById("phone").value

    //make values to object
    myObj = {
        name : name,
        email: email,
        phone :  phone
    }

    //check if exist on localStorage
    if(localStorage.getItem("user"+myObj.email )!== null ){
        var del = document.getElementById(myObj.email) 
        del.remove();
    }

    addElement(myObj)
    //add to local
    serial = JSON.stringify(myObj)
    axios.post("https://crudcrud.com/api/cf39668d4a244a4cb6f7d95d5c7378d8/appointmentData",myObj)
}

    function addElement(Obj){

        
        
        

        //create li element
        var li = document.createElement('div')
        li.className='row list-group'
        li.id= Obj.email
        li.style.color="white"

        //create textnode
        var col1 = document.createElement('div')
        var text= document.createTextNode("Name: "+
         Obj.name+" Email: "+Obj.email+" Phone: "+ Obj.phone)
         col1.appendChild(text)
         col1.className= "col col-sm-6 mt-2"

         //create delete btn
         var col2 = document.createElement("div")
         var delBtn = document.createElement('button')
         delBtn.className = "btn btn-danger btn-sm  float-right"
         delBtn.appendChild(document.createTextNode("X"))
         delBtn.addEventListener("click",removeItem)
         col1.appendChild(delBtn)
         

         //createEdit btn 
         var col3 = document.createElement('div')
         var editBtn = document.createElement('button')
         editBtn.className = "btn btn-primary btn-sm float-right mr-2"
         editBtn.value="edit"
        editBtn.innerText="edit"
        editBtn.addEventListener('click',editItem)
        col1.appendChild(editBtn)

        //add to li 
        li.appendChild(col1)


        // to delete existing
        

        // add li to list
    
        list.appendChild(li)

        
       async  function removeItem(e){
            var li = e.target.parentElement.parentElement
            
            axios.delete('https://crudcrud.com/api/cf39668d4a244a4cb6f7d95d5c7378d8/appointmentData/'+Obj._id)
            await list.removeChild(li)

        }
    
        function  editItem(e){
            //to be writen
            var li = e.target.parentElement
            localStorage.removeItem('user'+Obj.email)      
            document.getElementById("expense").value = Obj.name
            document.getElementById("desc").value  = Obj.email
            document.getElementById("cat").value = Obj.phone
    
            list.removeChild(li)
    
        }

    }

    
    
   
   
   
   
    
   
    
    
    

    
