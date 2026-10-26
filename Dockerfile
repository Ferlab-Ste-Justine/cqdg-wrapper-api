# First image to compile typescript to javascript
FROM node:24.22.1-alpine AS build-image
WORKDIR /code
COPY . .
RUN npm install
RUN npm run build

# Second image, that creates an image for production
FROM node:24.22.1-alpine AS prod-image
WORKDIR /code
COPY --from=build-image ./code/dist ./dist
COPY package* extensionless-resolve.mjs ./
RUN npm install --production

CMD [ "npm", "run", "start" ]
