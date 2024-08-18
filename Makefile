lint:
	@npx eslint .

style-check:
	@npx prettier ./**/*.ts --check

style-write:
	@npx prettier ./**/*.ts --write

dev:
	@npm run dev

build:
	@npm run build

docker-build:
	@docker build -t views-service .

.PHONY: 
	lint 
	style-check
	build
	docker-build
	dev
