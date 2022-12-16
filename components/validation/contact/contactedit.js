import { parsePhoneNumber } from "awesome-phonenumber";
const validateContactEdit = (data,props) =>{
    
    var error={};
     var flag=[]
     var final_flag=true;
    
    if(data.name==="" || data.name===undefined)
    {
        flag.push(false)
        error.name="App: The contact type is required"
    }

    if(data.type==="" || data.type===undefined)
    {
        flag.push(false)
        error.type="App: The contact data is required."
    }

    if(data.name !== "" && data.name!== undefined){
        if(data.name === "Email"){  
    if((!data.type?.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/))){
        flag.push(false)
        error.type="App: The email is invalid."
    }
}
    }
   
    if(data.name !== "" && data.name !== undefined){
        if(data.name === "Tdd Number"){  
        if((!data.type?.match(/^([1-9]+[0-9]*)$/))){
            flag.push(false)
            error.type="App: The tdd number is invalid."
        }
    }
        }
     if(data.name !== "" && data.name !== undefined){
            if(data.name === "Toll Free Number"){  
            if((!data.type?.match(/^([1-9]+[0-9]*)$/))){
                flag.push(false)
                error.type="App: The toll free number is invalid."
            }
        }
     }
     if(data.name !== "" && data.name !== undefined){
        if(data.name === "Phone"){  
        const pn = parsePhoneNumber(data.type, {regionCode:props})
        if (pn?.valid == false) {
            flag.push(false)
            error.type= `APP: The phone number is invalid.`
          }
    }
        }
    for (let value in flag) {
     
        if(flag[value]=== false)
         {
           final_flag = false;
           break;
         }
         
      } 

      return final_flag===true ? true : error;
    }
export default  validateContactEdit

