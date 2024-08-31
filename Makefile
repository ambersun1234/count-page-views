CLUSTER_NAME=views-k3d

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

skaffold-dev:
	@skaffold dev --port-forward

k3d-create:
	@k3d cluster create ${CLUSTER_NAME} --servers 1

k3d-import:
	@k3d image import -c ${CLUSTER_NAME} views-service:latest

k3d-apply:
	@kubectl apply -f ./manifests/views.yaml
	@kubectl apply -f ./manifests/redis.yaml

k3d-unapply:
	@kubectl delete -f ./manifests/views.yaml
	@kubectl delete -f ./manifests/redis.yaml

k3d-delete:
	@k3d cluster delete ${CLUSTER_NAME}

.PHONY: 
	lint 
	style-check
	build
	docker-build
	dev
	k3d-create
	k3d-apply
	k3d-unapply
	k3d-delete
	skaffold-dev
