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

Create your product files inside the `products/` folder. The filename for each product should match the `name` field in that product in [kebab-case](https://wiki.c2.com/?KebabCase). Before pushing changes to the remote repository, make sure that the following commands run successfully (otherwise the Continuous Integration (CI) tests will fail, and your contributions could not be merged until these errors are corrected):

* Validate the JSON schema of all product files:

	```bash
	npm test
	```

* Lint all product files (this command will fix any linting errors in place):

	```bash
	npm run lint
	```

* Check proper naming of all product files. Again, this will check that the filename matches that file `name` field in kebab case (i.e. spaces replaced by dashes):

	```bash
	./scripts/check-filenames.bash
	```

	If this fails, you can automatically rename the product files:

	```bash
	./scripts/check-filenames.bash --fix
	```

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

This will find files that exist in both datasets and attempt to merge. For each field that has different values between both sets, it will interactively prompt the user to choose one or the other. At any point in time, the user can abort the script to manually edit any field with a different value. Additional files that do not already exist, will simply be copied over. This script will modify both sets of files in `tmp/` and `products/`.

Once the script has run successfully, you should run the same checks outlined above: `npm test`, `npm run lint`, `./scripts/check-filenames.bash --fix`, and then commit the changes in `products/` and discard the files left in `tmp/`.

## License

Licensed under the [CC-0](LICENSE).
