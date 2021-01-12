FROM node:14.15.4-alpine3.12 AS base
WORKDIR /baseBuild
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY ./ ./
RUN npm run build


FROM base
WORKDIR /app
COPY --from=base /baseBuild/package*.json ./
RUN npm ci --production
COPY --from=base /baseBuild/dist ./src
RUN rm -rf ../baseBuild
EXPOSE 4000

CMD ["npm","start"]