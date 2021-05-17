# 🗄 Archival Notice

**This repository is being archived in May 2021.** This repository was originally conceived as a joint project between the [Digital Impact Alliance](https://digitalimpactalliance.org/) (DIAL), [Digital Public Goods Alliance](https://digitalpublicgoods.net/) (DPGA) + [UNICEF Office of Innovation](https://www.unicef.org/innovation/) and [Ovio](https://ovio.org/) to synchronize and share our data. It served its purpose during the many months that we have been maintaining it, and it has allowed all organizations involved to grow our respective datasets and to coordinate efforts in the joint space in which we operate. We now have realized that there are more efficient ways to accomplish the same goals, and we will continue to periodically share and synchronize our data, while each organization maintains and makes their data publicly available through the resources below:
* **Digital Impact Alliance**
	* [Catalog of Digital Solutions](https://solutions.dial.community/products)
	* [Application Public Interface](https://solutions.dial.community/api/v1/products) (API) and [API Documentation](https://solutions.dial.community/api-docs/index.html)
* **Digital Public Goods Alliance**
	* [Digital Public Goods Registry](https://digitalpublicgoods.net/registry) and [repository](https://github.com/unicef/publicgoods-candidates)
	* [Application Public Interface](https://api.digitalpublicgoods.net/) (API) and [API Documentation](https://github.com/unicef/publicgoods-api)
* **Ovio**
	* [Project List](https://ovio.org/projects)



<hr />


# Products

Collection of public goods.

This repository is designed to be both browsed by humans, and consumed directly by other applications that can easily parse machine-readable JSON files.

## Installation

If you want to contribute, clone this repository locally as follows:

* Clone with HTTPS:

	```bash
	git clone --recurse-submodules https://github.com/publicgoods/products.git
	```

* Clone with SSH:

	```bash
	git clone --recurse-submodules git@github.com:publicgoods/products.git
	```

Install dependencies:

```bash
npm install
```

Create your product files inside the `products/` folder. The filename for each product should match the `name` field in that product in [kebab-case](https://wiki.c2.com/?KebabCase). 

The following checks will run automatically (both as a `pre-commit` hook through [Husky](https://github.com/typicode/husky), and in the Continuous Integration (CI)):

* `npm test`: Validates all JSON product files against the JSON [data schema](https://github.com/publicgoods/data-schema/blob/master/product-schema.json)
* `npm run order`: Checks that all JSON properties are listed in the same order as specified in the JSON [data schema](https://github.com/publicgoods/data-schema/blob/master/product-schema.json). If this fails, run `npm run order:fix` to fix.
* `npm run lint`: Ensures that all JSON files are formated properly using 2 spaces for indentation. If this fails, run `npm run lint:fix` to fix.
* `npm run check`: Checks that all files are named according to their product name in *kebab-case*. If this fails, run `npm run check:fix` to fix.


## Bulk Import

A script utility `scripts/import.js` is provided to facilitate the merging of product files coming from another existing dataset:

1. Create a `tmp` folder at the root of this repository:

```bash
mkdir tmp
```

2. Copy all files to be imported into the above `tmp/` folder.

3. From the repository root folder run:

```bash
node scripts/import.js
```

This will find files that exist in both datasets and attempt to merge. For each field that has different values between both sets, it will interactively prompt the user to choose one or the other. At any point in time, the user can abort the script to manually edit any field with a different value. Additional files that do not already exist, will simply be copied over. This script will modify both sets of files in `tmp/` and `products/`. You can then commit the changes in `products/` and discard the files left in `tmp/`.

## License

Licensed under the [CC-0](LICENSE).
