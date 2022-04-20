const matched_res = require("./uaescd_matched_res2.json");
const Akaree_companies = require("./Akaree_companies.json");
const Ak_Companies = Akaree_companies.map((item) => ({
  id: item._id.$oid,
  orginal_name: item.name,
  name: item.name,

  address: item.address,
  country: item.country?.name,
  city: item.city?.name ?? "N/A",
  description: item.description?.replace(/[^a-zA-Z ]/g, ""),
  email: item.email,
  faxNumber: item.faxNumber,
  numberOfEmployees: item.numberOfEmployees,
  profilePhoto: item.profilePhoto,
  telephone: item.telephone,
  website: item.website,
  vendorType: item.vendorType?.name,
  services: item.services?.map((service) => service.name).join("|"),
  slug: item.slug,
}));
let count0 = 0;
let count1 = 0;
let count2 = 0;
let count3 = 0;
let count4 = 0;
let count5 = 0;
let count6 = 0;
let count7 = 0;

let arr_temp = [];
function start() {
  Ak_Companies.forEach((item) => {
    const frequency = matched_res.filter(
      (item2) => item.id === item2.akaree_id
    ).length;
    if (frequency === 0) {
      count0 = count0 + 1;
    }
    if (frequency === 1) {
      count1 = count1 + 1;
      if (count1 < 200) {
        arr_temp.push(item);
      }
    }
    if (frequency === 2) {
      count2 = count2 + 1;
    }

    if (frequency === 3) {
      count3 = count3 + 1;
    }
    if (frequency === 4) {
      count4 = count4 + 1;
    }

    if (frequency === 5) {
      count5 = count5 + 1;
    }

    if (frequency === 6) {
      count6 = count6 + 1;
    }
    if (frequency === 7) {
      count7 = count7 + 1;
    }
  });

  console.log("number of companies not founded in final mapping  : " + count0);
  console.log("number of companies repeated once in final mapping : " + count1);
  console.log(
    "number of companies  repeated twice in final mapping: " + count2
  );
  console.log(
    "number of companies repeated  3 times in final mapping : " + count3
  );
  console.log(
    "number of companies repeated  4 times in final mapping : " + count4
  );
  console.log(
    "number of companies repeated  5 times in final mapping : " + count5
  );
  console.log(
    "number of companies repeated  6 times in final mapping: " + count6
  );
  console.log(
    "number of companies repeated 7 times in final mapping  : " + count7
  );
  // for (item of arr_temp) {
  //   console.log(item.id);
  // }
}

start();

// for (item of arr_temp ){
//   if (item.website =="N/A"|| item.website=="") {
//     website_count=website_count+1
//   }
//   if (item.address =="N/A"|| item.address=="") {
//     address_count=address_count+1
//   }
//   if (item.email =="N/A"|| item.email=="") {
//     email_count=email_count+1
//   }
//   if (item.profilePhoto =="N/A"|| item.profilePhoto=="") {
//     profilePhoto_count=profilePhoto_count+1
//   }
//   if (item.telephone =="N/A"|| item.telephone=="") {
//     telephone_count=telephone_count+1
//   }
//   if (item.services =="N/A"|| item.services=="") {
//     services_count=services_count+1
//   }
//   if (item.description =="N/A"|| item.description=="") {
//     description_count=description_count+1
//   }
//   if (item.city =="N/A"|| item.city=="") {
//     city_count=city_count+1
//   }
// }
