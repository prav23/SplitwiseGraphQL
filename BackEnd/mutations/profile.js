// const Customer = require("../dbSchema/cust_profile");

// const customerUpdate = async (args) => {
//     let customer = await Customer.findOne({ email_id: args.email_id });
//     if (customer) {
//         console.log("Inside Customer : ", args.email_id);
//         customer.name = args.name?args.name:customer.name;
//         customer.phone = args.phone?args.phone:customer.phone;
//         customer.dob = args.dob?args.dob:customer.dob;
//         customer.city = args.city?args.city:customer.city;
//         customer.state = args.state?args.state:customer.state;
//         customer.country = args.country?args.country:customer.country;
//         customer.nick_name = args.nick_name?args.nick_name:customer.nick_name;
//         customer.about = args.about?args.about:customer.about;
//         customer.favourite_restaurant = args.favourite_restaurant?args.favourite_restaurant:customer.favourite_restaurant;
//         customer.favourite_hobby = args.favourite_hobby?args.favourite_hobby:customer.favourite_hobby;
//         customer.blog_url = args.blog_url?args.blog_url:customer.blog_url;

//         let updated = await customer.save();
//         if (updated) {
//             return { status: 200, message: "CUSTOMER_UPDATED" };
//         }
//         else {
//             return { status: 500, message: "CUSTOMER_UPDATE_ERROR" };
//         }
//     }
//     else {
//         return { status: 500, message: "INTERNAL_SERVER_ERROR" };
//     }
// };

// exports.customerUpdate = customerUpdate;