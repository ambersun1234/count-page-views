FROM node:20 AS build_layer
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM node:20-alpine AS final_layer
COPY --from=build_layer /app/dist /dist
ENTRYPOINT [ "node", "/dist/server.js" ]
