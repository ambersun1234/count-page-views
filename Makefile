lint:
	@npx eslint .

check:
	@npx prettier ./**/*.ts --check

.PHONY: 
	lint 
	check
