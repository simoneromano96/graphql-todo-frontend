FROM node:14-buster-slim  as Build

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

FROM nginx:alpine

COPY --from=Build /app/dist /usr/share/nginx/html
