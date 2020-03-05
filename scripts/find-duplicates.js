/* Utility to find duplicates in product JSON files in the current folder
 * Execute inside the products subfolder with:
 * node ../scripts/find-duplicates.js
 */

const fs = require("fs");
const glob = require("glob");

path = "";

// scan for all json files in path
glob(path + "*.json", {}, async (err, files) => {
  let i = 0;
  let products = [];

  for (i = 0; i < files.length; i++) {
    // read data from the file
    jsonData = fs.readFileSync(files[i], "utf8", function(err) {
      if (err) {
        console.log(
          "An error occured while reading JSON Object from file: " + files[i]
        );
        return console.log(err);
      }
    });
    products[i] = JSON.parse(jsonData);

    products[i]["filename"] = files[i];
  }

  console.log("Loaded " + i + " products");

  let dups = 0;
  for (j = 0; j < i; j++) {
    for (k = j + 1; k < i; k++) {
      if (
        products[j]["name"] == products[k]["name"] ||
        (products[j].hasOwnProperty("repositoryURL") &&
          products[j].hasOwnProperty("repositoryURL") &&
          products[j]["repositoryURL"] == products[k]["repositoryURL"])
      ) {
        console.log(
          "Duplicate found between " +
            products[j]["filename"] +
            " and " +
            products[k]["filename"]
        );
        dups += 1;
      }
    }
  }

  console.log(
    dups + " duplicates found based on either name or repositoryURL."
  );
});
