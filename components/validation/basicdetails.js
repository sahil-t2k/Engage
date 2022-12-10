const validatebasicDetails = (data) => {
    var error = {};
    var flag = []
    var final_flag = true;

    if (data.property_name === "") {
        flag.push(false)
        error.property_name = "App: The property name is required"
    }
    if (data.property_category === "") {
        flag.push(false)
        error.property_category = "App: The property category is required"
    }

    if (data.established_year === "") {
        flag.push(false)
        error.established_year = " App: The established date is required"
    }

    if (data.star_rating === "") {
        flag.push(false)
        error.star_rating = "App: The star rating is required"
    }


    if (data.description_title === '') {
        flag.push(false)
        error.description_title = "App: The description title is required"
    }
    if (data.description_body === '') {
        flag.push(false)
        error.description_body = "App: The description body is required"
    }
    if (data.established_year != '') {
        if (data.established_year > data.description_date != '') {
            flag.push(false)
            error.established_year = "App: The established date shouldn't be current or future date."
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
export default validatebasicDetails

