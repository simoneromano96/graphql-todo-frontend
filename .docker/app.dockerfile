FROM node:alpine as build

# Create /app
RUN mkdir /app

# Change CWD to /app
WORKDIR /app

# Copy all files
COPY . .

# Install deps
RUN npm i

# Build app
RUN npm run build

RUN ls -al /app/dist

FROM nginx:alpine as production

COPY --from=build /app/dist /usr/share/nginx/html
