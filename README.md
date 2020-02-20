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

Create your product files inside the `products/` folder, and before pushing changes to the remote repository, make sure that the two following commands run successfully:

```bash
npm test
npm run lint
```

## License

Licensed under the [CC-0](LICENSE).