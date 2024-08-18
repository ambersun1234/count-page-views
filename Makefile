lint:
	@npx eslint .

style-check:
	@npx prettier ./**/*.ts --check

style-write:
	@npx prettier ./**/*.ts --write

.PHONY: 
	lint 
	style-check
