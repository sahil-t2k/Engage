const validateAddress = (data) => {
  var error = {};
  var flag = []
  var final_flag = true;
   
  if (data.address_street_address === "") {
    flag.push(false)
    error.address_street_address = "App: The street address is required"
  }

  if (data.address_landmark === "") {
    flag.push(false)
    error.address_landmark = "App: The address landmark is required"
  }

  if (data.address_city === "") {
    flag.push(false)
    error.address_city = "App: The address city is required"
  }

  if (data.address_province === "") {
    flag.push(false)
    error.address_province = "App: The address province is required"
  }

  if (data.address_latitude === "") {
    flag.push(false)
    error.address_latitude = "App: The address latitude is required"
  }


  if (data.address_longitude === '') {
    flag.push(false)
    error.address_longitude = "App: The address longitude is required"
  }


  if (data.address_zipcode === '') {
    flag.push(false)
    error.address_zipcode = "App: The address zipcode is required"
  }


  if (data.address_precision === '') {
    flag.push(false)
    error.address_precision = "App: The address precision is required"
  }

  if (data?.address_precision != "" || data?.address_precision != undefined) {
    if (!(/^(?=(\D*\d\D*){0,5}$)-?\d*(\.\d{0,2})?$/.test(data?.address_precision))) {
      {
        flag.push(false)
        error.address_precision = "App: Invalid address precision format."
      }
    }
  }



  //check latitudes 
  if (data.address_latitude !== '') {
    if (!(/^([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/).test(data.address_latitude)) {
      flag.push(false)
      error.address_latitude = 'APP: Invalid latitude value.'
    }
    else if ((data?.address_latitude < -90) || (data?.address_latitude > 90)) {
      
      flag.push(false)
      error.address_latitude = 'APP: The value of latitude should be between -90 to +90'
    }
  }
  //check longitude 
  if (data.address_longitude !== '') {
    if (!(/^([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/).test(data.address_longitude)) {
      flag.push(false)
      error.address_longitude = 'APP: Invalid longitude value.'
    }
   else if ((data?.address_longitude < -180) || (data?.address_longitude > 180)) {
      flag.push(false)
      error.address_longitude = 'APP: The value of latitude should be between -180 to +180'
    }
  }
  //check zip code
  if (data.address_zipcode !== '') {
    if (!(/^[1-9][0-9]{5}$/).test(data.address_zipcode)) {
      flag.push(false)
      error.address_zipcode = 'APP: Invalid zip code'
    }
  }
  //check precision
  if (data.address_precision !== '') {
    if (data.address_precision < 0 || data.address_precision > 1000) {
      flag.push(false)
      error.address_precision = 'APP: Precision should be between 0-1000'
    }
  }
  for (let value in flag) {

    if (flag[value] === false) {
      final_flag = false;
      break;
    }

  }

  return final_flag === true ? true : error;
}
export default validateAddress
