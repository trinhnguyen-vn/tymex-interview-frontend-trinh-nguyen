FROM node:18-alpine AS base
# Set the working directory inside the container
WORKDIR /app
# Copy application code
COPY . ./
# Install the application dependencies
RUN yarn install


FROM node:lts-alpine AS build
WORKDIR /app
# Copy the node_modules from the base image
COPY --from=base /app/node_modules ./node_modules
# Copy the rest of the application code
COPY . ./

# Set environment variable for production
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_HOST_URL=
ENV SERVER_API_HOST_URL=

# Build the Next.js application
RUN yarn build

FROM node:lts-alpine AS production
WORKDIR /app
COPY --from=build /app/public ./public

# Set mode "standalone" in file "next.config.js"
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

# Expose the port on which the Next.js application will run (adjust as needed)
EXPOSE 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
CMD ["node", "server.js"]
