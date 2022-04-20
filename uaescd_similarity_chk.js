const fs = require("fs/promises");
const Akaree_companies = require("./Akaree_companies.json");
var stringSimilarity = require("string-similarity");
const uaescd_companies = require("./uaescd_output.json");

async function start() {
  const uae_companies = uaescd_companies.map((item) => ({
    id: item.id,
    orginal_name: item.name.replace(/[^a-zA-Z ]/g, ""),
    name: item.name
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z ]/g, "")
      .replace("&", "")
      .replace("Company", "")
      .replace("building", "")
      .replace("general", "")
      .replace("materials", "")
      .replace("material", "")
      .replace("services", "")
      .replace("real", "")
      .replace("electrical", "")
      .replace("aluminium", "")
      .replace("glass", "")
      .replace("maintenance", "")
      .replace("elec", "")
      .replace("estate", "")
      .replace("co,al", "")
      .replace("trading", "")
      .replace("contracting", "")
      .replace("international", "")
      .replace("al", "")
      .replace("est,al", "")
      .replace("trading,al", "")
      .replace("sanitary", "")
      .replace("technical", "")
      .replace("llc", "")
      .replace("engineering", "")
      .replace("equipment", "")
      .replace("east", "")
      .replace("industries", "")
      .replace("construction", "")
      .replace("llc,al", "")
      .trim(),
    website: item.website,
    telephone: item.telephone,
    description: item.description?.replace(/[^a-zA-Z ]/g, ""),
    email: item.email,
    address: item.address?.replace(/[^a-zA-Z ]/g, ""),
    services: item.services,
    profilePhoto: item.profilePhoto,
    vendorType: item.vendorType,
    city: item.city,
    fax: item.fax,
    POBOX: item.POBOX,
    slug: item.slug,
    country: item.country,
  }));
  const Ak_Companies = Akaree_companies.map((item) => ({
    id: item._id.$oid,
    orginal_name: item.name,
    name: item.name
      .replace(/[^a-zA-Z ]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z ]/g, "")
      .replace("engineering", "")
      .replace("al", "")
      .replace("consultancy", "")
      .replace("est", "")
      .replace("technical", "")
      .replace("technologies", "")
      .replace("electrical", "")
      .replace("civil", "")
      .replace("works", "")
      .replace("design", "")
      .replace("materials", "")
      .replace("maintenance", "")
      .replace("consultancies", "")
      .replace("general", "")
      .replace("&", "")
      .replace("llc", "")
      .replace("consulting", "")
      .replace("construction", "")
      .replace("contractor", "")
      .replace("contracting", "")
      .replace("company", "")
      .replace("building", "")
      .replace("trading", "")
      .replace("consultant", "")
      .replace("engineers", ""),
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

  const finalResult = [];

  //Ak_Companies.forEach((element, index) => {
  for (element of Ak_Companies) {
    for (item of uae_companies) {
      const similarity = stringSimilarity.compareTwoStrings(
        element.name,
        item.name
      );
      //const csvRow = `${element.id}, "${element.name}", "${item.id}", "${item.name}", "${similarity}"`;

      if (similarity >= 0.82) {
        const uae_scd_res = uae_companies.find((x) => x.id == item.id);
        const Akaree_res = Ak_Companies.find((y) => y.id == element.id);

        const row = {
          similarity: similarity,
          akaree_id: Akaree_res.id,
          uaescd_id: uae_scd_res.id,
          akaree_orginalName: Akaree_res.orginal_name,
          uaescd_orginalName: uae_scd_res.orginal_name,
          akaree_name: Akaree_res.name,
          uaescd_name: uae_scd_res.name,
          akaree_address: Akaree_res.address,
          uaescd_address: uae_scd_res.address,
          akaree_description: Akaree_res.description,
          uaescd_description: uae_scd_res.description,
          akaree_email: Akaree_res.email,

          uaescd_email: uae_scd_res.email,
          akaree_faxNumber: Akaree_res.faxNumber,
          uaescd_fax: uae_scd_res.fax,
          akaree_numberOfEmployees: Akaree_res.numberOfEmployees,
          akaree_profilePhoto: Akaree_res.profilePhoto,
          uaescd_profilePhoto: uae_scd_res.profilePhoto,
          akaree_telephone: Akaree_res.telephone,
          uaescd_telephone: uae_scd_res.telephone,
          akaree_website: Akaree_res.website,
          uaescd_website: uae_scd_res.website,
          akaree_city: Akaree_res.city,
          uaescd_city: uae_scd_res.city,
          akaree_country: Akaree_res.country,
          uaescd_country: uae_scd_res.country,
          akaree_services: Akaree_res.services,
          uaescd_services: uae_scd_res.services,
          akaree_vendorType: Akaree_res.vendorType,
          uaescd_vendorType: uae_scd_res.vendorType,
          akaree_slug: Akaree_res.slug,
          uaescd_slug: uae_scd_res.slug,
          uaescd_PoBox: uae_scd_res.POBOX,
        };
      }
    }
  }
  await fs.writeFile("uaescd_matched_res2.json", JSON.stringify(finalResult), {
    flag: "a+",
  });
}

start();

// // check frequency of words
// var str = uae_companies.join(",").toLowerCase();
// console.log(str);
// const num = 40;
// const findMostFrequent = (str = "", num = 1) => {
//   const strArr = str.split(" ");
//   const map = {};
//   strArr.forEach((word) => {
//     if (map.hasOwnProperty(word)) {
//       map[word]++;
//     } else {
//       map[word] = 1;
//     }
//   });
//   const frequencyArr = Object.keys(map).map((key) => [key, map[key]]);
//   frequencyArr.sort((a, b) => b[1] - a[1]);
//   return frequencyArr.slice(0, num).map((el) => el[0]);
// };
// //console.log(findMostFrequent(str, num));
