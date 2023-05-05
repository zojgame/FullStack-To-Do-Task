FROM node:latest 
WORKDIR /app/back
COPY . .
RUN npm install
EXPOSE 7000
ENV PORT=80
ENV HOST=0.0.0.0
CMD ["npm", "start"]