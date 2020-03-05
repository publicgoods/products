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
