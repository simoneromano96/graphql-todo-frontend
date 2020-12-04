FROM node:14-buster-slim as build

# Create /app
RUN mkdir /app

# Change CWD to /app
WORKDIR /app

# Copy all files
COPY . .

# Install deps
RUN npm i

RUN rm -rf /app/dist

# Build app
RUN npm run build

# RUN ls -al /app/dist
# RUN ls -al /app/dist/_assets
# RUN cat /app/dist/index.html

FROM nginx:alpine as production

COPY --from=build /app/dist /usr/share/nginx/html

# RUN ls -al /usr/share/nginx/html
# RUN ls -al /usr/share/nginx/html/_assets
# RUN cat /usr/share/nginx/html/index.html
