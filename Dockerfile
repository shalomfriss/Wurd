FROM node:carbon

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --save boardgame.io
RUN npm install
COPY . .

# Expose the public http port
EXPOSE 8000

# Start server
CMD ["npm", "run", "dev"]
