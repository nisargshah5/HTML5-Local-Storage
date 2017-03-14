// Code goes here
//Function To Display Popup

var dt;
function div_show() {
document.getElementById('abc').style.display = "block";
}
function close1(){
    document.getElementById('abc').style.display = "none";
     $( "#submit" ).replaceWith( $('<button id="submit" data-sbt="sbt" class="submitUpdate" value="sub">Submit</button>').click(function () {
        formData();}));
    document.getElementById("form").reset();
   
}

$("#searchBox").keyup(function(){
    var input, filter, table, tr, td, i;
    input = document.getElementById("searchBox");
    filter = input.value.toLowerCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        if(tr[i].innerHTML.toLowerCase().indexOf(filter)>-1)
        {
            tr[i].style.display="";
        }
        else {
                tr[i].style.display = "none";
        }
    }  
});

 
function displayTable(parsedObject){
  //retrieve object from local storage
  retrieved_object = localStorage.getItem('data_obj');
  parsedObject1 = JSON.parse(retrieved_object);
 // console.log(JSON.stringify(parsedObject1));
    //document.getElementById("dataTable").innerHTML="";
    var i=1;
    var html = "<table id='dataTable' border='1|1'>";
    html+="<tr>";
    for (var key in parsedObject1[0]){
        if (i<5) { i++;
        html+="<th>"+key+"</th>";
    }}
    html+="<th class='editDelete'>View</th>";
    html+="<th class='editDelete'>Edit</th>";
    html+="<th class='editDelete'>Delete</th>";
    html+="</tr>";

    for (var i in parsedObject1 ) {
      
        html+="<tr id='dispTR"+i+"'>";
        html+="<td>"+parsedObject1[i].Name+"</td>";
        html+="<td>"+parsedObject1[i].Email+"</td>";
        html+="<td>"+parsedObject1[i].Contact+"</td>";
        html+="<td>"+parsedObject1[i].Location+"</td>";
    //    html+="<td>"+parsedObject1[i].Post+"</td>";
    //    html+="<td>"+parsedObject1[i].Education+"</td>";
        html+="<td><button id='viewObj"+i+"' class='viewtObj' onclick='viewObj("+i+")' >View</button></td>";
        html+="<td><button id='editObj' class='editObj' onclick='editObj("+i+")'>Edit</button></td>";
        html+="<td><button id='deleteObj' class='deleteObj'  onclick='deleteObj("+i+")'>Delete</button></td>";

        html+="</tr>"; 
        
       
        //var txt2 = $("<div id="zzz"></div>");
       
    }
    html+="</table>";
    document.getElementById("dataDispaly").innerHTML = html;
}


function viewObj(i){
    $("#viewDiv"+i).toggle();
    if(!($('#viewDiv'+i)[0])){
        var viewVar = "view";
        retrieved_object = localStorage.getItem('data_obj');
        parsedObject1 = JSON.parse(retrieved_object);
        //var div1 = "<div id='viewDiv"+i+"' border='1|1' style='background-color:#5ED465; '></div>";
        var post="<span > Post : "+parsedObject1[i].Post+"</span> </br>";
        var edu ="<span> Education : "+parsedObject1[i].Education+"</span>";
        
        dt = $("<div id='viewDiv"+i+"'  style='background-color:#5ED465; '></div>").html(post+edu);
        //$("#viewObj"+i).text("Close").css("background-color:red");
        $("#dispTR"+i).after(dt);

    }
}


function editObj(i){
    document.getElementById('abc').style.display = "block";
    var editName = $('#name').val(parsedObject1[i].Name);
    var editEmail = $('#email').val(parsedObject1[i].Email);
    var editContact = $('#contact').val(parsedObject1[i].Contact);
    var editLocation = $('#location').val(parsedObject1[i].Location);
    var editPost = $('#post').val(parsedObject1[i].Post);
    var editEducation = $('#education').val(parsedObject1[i].Education);

    $( "#submit" ).replaceWith( $('<button id="submit" value="'+i+'"  data-sbt="aaa" >Update</button>').click(function () {
        formData();}));
}

function deleteObj(i){

    var table = $("#dataTable").val();
    var parseObj = parsedObject1.splice(i,1);
    localStorage.setItem('data_obj', JSON.stringify(parsedObject1));
    displayTable(parseObj);
} 

function formData(){  
  var flag=true;
  
  //console.log(document.getElementById("submit").value);
  var store=document.querySelectorAll('.formTextBox');

    for(var val of store){ 
        var chk=document.getElementById("perr"+val.getAttribute('id'));         
        if(val.value==""){ 
            flag=false;
            if(!chk){
                val.insertAdjacentHTML('afterend','<p style="font-size: 16px;padding: 10px;background-color: #f44336; color: white;margin-bottom: 15px;margin-top: 5px; " data-valid id="perr'+val.getAttribute('id')+'">Please enter  '+val.getAttribute('id')+' field</p>');
            }
        }
        else{
            if(chk){  
                chk.remove();
            }
            
        }
    }          
  
    if(flag){

        //Function to Hide Popup
        document.getElementById('abc').style.display = "none";
        
        var fName = document.getElementById("name");
        var fEmail = document.getElementById("email");
        var fContact = document.getElementById("contact");
        var fLocation = document.getElementById("location");
        var fPost = document.getElementById("post");
        var fEducation = document.getElementById("education");
        
        var formArray = {Name: fName.value,Email: fEmail.value, Contact: fContact.value,Location: fLocation.value, 
                        Post:fPost.value, Education: fEducation.value};
        
        // Parse the serialized data back into an aray of objects
        var localArray = JSON.parse(localStorage.getItem('data_obj'));

        var btnUpdate = document.getElementById("submit").getAttribute("data-sbt");

        if(btnUpdate=="aaa"){

            var i = document.getElementById("submit").value;

            localArray[i] = formArray;

            localStorage.setItem('data_obj', JSON.stringify(localArray) );
            displayTable(localArray);
            
        }

        if(btnUpdate=="sbt"){

            // Push the new data (whether it be an object or anything else) onto the array
            var local = localArray.push(formArray);

            // Re-serialize the array back into a string and store it in localStorage
            localStorage.setItem('data_obj', JSON.stringify(localArray));
            //function call for display in table
            displayTable(local);
            document.form.reset();
        }      
    }  
}

// Json File

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  
  if (xhttp.readyState == 4 && xhttp.status ==200) {

  var obj = xhttp.responseText;
  var parsedObject = JSON.parse(obj);  
  var data = JSON.stringify(parsedObject);
 
  
    var parsedObject1 = localStorage.getItem('data_obj');
      if(!parsedObject1) {
        //parsing data of JSON
        //Storing Json Object in local storage
        localStorage.setItem('data_obj', data );
        
        //function call for display in table
        displayTable(data);
      }
      else{
         displayTable(data);
      }
  }
}; 
//get method
xhttp.open('GET', 'data.json');
xhttp.send();

