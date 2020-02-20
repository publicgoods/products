# products

Collection of public goods.

This repository is designed to be both browsed by humans, and consumed directly by other applications that can easily parse machine-readable json files.

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

Create your product files inside the `products/` folder, and before pushing changes to the remote repository, make sure that the following commands run successfully (otherwise the Continuous Integration (CI) tests will fail, and your contributions could not be merged until these errors are corrected):

* Validate the JSON schema of all product files:

	```bash
	npm test
	```

* Lint all product files (this command will fix any linting errors in place):

	```bash
	npm run lint
	```

* Check proper naming of all product files:

	```bash
	./scripts/check-filenames.bash
	```

	If this fails, you can automatically rename the product files:

	```bash
	./scripts/check-filenames.bash --fix
	```

## License

Licensed under the [CC-0](LICENSE).