const data = require("./uaescd_full.json");
const file = "uaescd_output.csv";
function removeTags(str) {
  if (str === null || str === "") return "N/A";
  else str = str.toString(); // Regular expression to identify HTML tags in // the input string. Replacing the identified // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, "");
}
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
const fs = require("fs/promises");
async function start() {
  for (item of data.CompanyData) {
    const website = item.WebsiteURL ?? "N/A";
    const email = item.EmailId ?? "N/A";
    const profilePhoto = "https://www.uaecsd.com" + item.LogoFileName ?? "N/A";
    const fax = item.FaxNo ?? "N/A";
    const telephone = item.MobileNo || item.TelephoneNo;
    const city = item.City ?? "N/A";
    const country = "United Arab Emirates";
    const name = item.Title ?? "N/A";
    const Description_temp = removeTags(item.Description) ?? "N/A";
    const description = Description_temp?.replace(/[^a-zA-Z ]/g, "") ?? "N/A";
    const address = item.AddressLine1 ?? "N/A";
    const vendorType = item.CategoryData?.[0].CatName ?? "N/A";
    const services = item.Keywords ?? "N/A";
    const POBOX = item.PostBoxNo ?? "N/A";
    const slug = item.Slug ?? "N/A";
    var id = uuid();

    const csvRow = `${id},"${name}","${website}","${telephone}","${description}", "${email}","${address}","${services}" ," ${profilePhoto}","${vendorType}","${city}","${fax}","${POBOX}","${slug}","${country}"`; //console.log(csvRow);
    await fs.writeFile(file, csvRow, { flag: "a+" });
    await fs.writeFile(file, "\r\n", { flag: "a+" });
  }
}
start();
