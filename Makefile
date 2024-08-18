lint:
	@npx eslint .

style-check:
	@npx prettier ./**/*.ts --check

style-write:
	@npx prettier ./**/*.ts --write

build:
	@npm run build

.PHONY: 
	lint 
	style-check
	build
