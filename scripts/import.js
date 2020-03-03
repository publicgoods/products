/* This script utility is provided to assist in adding an existing dataset
 * of products and merging it into the existing dataset.
 *
 * 1. Create a `tmp` folder at the root of this repository:
 * 2. Copy all files to be imported into the above `tmp/` folder.
 * 3. From the repository root folder run:
 *    node scripts/import.js
 *
 * This will find files that exist in both datasets and attempt to merge. 
 * For each field that has different values between both sets, it will 
 * interactively prompt the user to choose one or the other. 
 * At any point in time, the user can abort the script to manually edit any 
 * field with a different value. Additional files that do not already exist, 
 * will simply be copied over. This script will modify both sets of files 
 * in `tmp/` and `products/`.
 * 
 * Once this script has run successfully, you should run the following checks:
 *
 * npm test
 * npm run lint
 * ./scripts/check-filenames.bash --fix
 *
 * and finally commit the changes in `products/` and discard the files 
 * left in `tmp/`.
 */

const fs = require("fs")
const path = require("path")
const glob = require("glob")
const inquirer = require("inquirer")

const productsPath = "./products/"
const importPath = "./tmp/"

/* Given two different values, let the user choose between the two
 * Alternatively, the user can choose to abort, and make additional
 * edits outside the scope of this script, and resume later
 */
async function chooseField(value1, value2, field) {
  let answer = await inquirer.prompt({
    type: "list",
    name: "choice",
    message:
      '"' + field + '"" field differs between files, choose which one to keep:',
    choices: [
      { name: "[1] Keep the existing value(s): " + JSON.stringify(value1), value: 1 },
      { name: "[2] Use importing value(s):     " + JSON.stringify(value2), value: 2 },
      { name: "Abort to edit file manually", value: 0 }
    ]
  })
  if (answer["choice"] === 1) {
    return value1
  } else if (answer["choice"] === 2) {
    return value2
  } else {
    return null
  }
}

glob("*.json", { cwd: productsPath }, async (err, productFiles) => {
  let products = []

  // iterate over all product files
  for (let i = 0; i < productFiles.length; i++) {
    // read data from the file
    jsonData = fs.readFileSync(
      path.join(productsPath, productFiles[i]),
      "utf8",
      function(err) {
        if (err) {
          console.log(
            "An error occured while reading JSON Object from file: " +
              productFiles[i]
          )
          return console.log(err)
        }
      }
    )

    // parse data from JSON into array of dictionaries
    products[i] = JSON.parse(jsonData)
    // append the actual filename
    products[i]["filename"] = productFiles[i]
  }

  glob("*.json", { cwd: importPath }, async (err, importFiles) => {
    for (let i = 0; i < importFiles.length; i++) {
      // read data from the file
      jsonData = fs.readFileSync(
        path.join(importPath, importFiles[i]),
        "utf8",
        function(err) {
          if (err) {
            console.log(
              "An error occured while reading JSON Object from file: " +
                importFiles[i]
            )
            return console.log(err)
          }
        }
      )

      // parse data from JSON into dictionary
      importProduct = JSON.parse(jsonData)
      // append the actual filename
      importProduct["filename"] = importFiles[i]

      // search for duplicates of this product into existing set if 
      // any of these conditions is met:
      // - same name field
      // - same filename
      // - if repositoryURL exists and is the same
      let dup = null
      for (j = 0; j < productFiles.length; j++) {
        if (
          products[j]["filename"] == importProduct["filename"] ||
          products[j]["name"] == importProduct["name"] ||
          (importProduct.hasOwnProperty("repositoryURL") &&
            products[j]["repositoryURL"] == importProduct["repositoryURL"])
        ) {
          console.log(
            "Duplicate found between " +
              productsPath +
              products[j]["filename"] +
              " and " +
              importPath +
              importFiles[i]
          )
          dup = j
        }
      }

      // If duplicate is found, iterate over all fields, and propmpt
      // the user for input where fields differ
      if (dup) {
        console.log(
          'Merging product name "' +
            importProduct["name"] +
            '" from file ' +
            importFiles[i]
        )
        // iterate over all properties in the imported Product
        for (var prop in importProduct) {
          // exclude those Javascript object properties found in all objects
          if (Object.prototype.hasOwnProperty.call(importProduct, prop)) {
            // ignore filename, it is not part of the object proper
            if (prop != "filename") {
              // because some fields are arrays or objects, direct comparison 
              // fails in those cases. Thus, for the purpose of comparison, 
              // stringify those objects and compare strings instead
              if (
                JSON.stringify(products[dup][prop]) !=
                JSON.stringify(importProduct[prop])
              ) {
                let choice = await chooseField(
                  products[dup][prop],
                  importProduct[prop],
                  prop
                )
                if (choice) {
                  importProduct[prop] = choice
                } else {
                  console.log("Aborting...")
                  process.exit(1)
                }
              }
            }
          }
        }
        console.log("\n")
      }

      // Regardless of whether there was a duplicate or not the imported 
      // object contains the object with all the fields to import. 
      // Save that copy in both folders.
      delete importProduct["filename"]
      let fname =
        importProduct["name"]
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/ /g, "-") + ".json"
      let fnames = [
        path.join(productsPath, fname),
        path.join(importPath, fname)
      ]
      for (e in fnames) {
        fs.writeFileSync(
          fnames[e],
          JSON.stringify(importProduct, null, 2),
          "utf8",
          function(err) {
            if (err) {
              console.log(
                "An error occured while writing JSON Object to file: " +
                  fnames[e]
              )
              return console.log(err)
            }
          }
        )
      }
    }
  })
})
