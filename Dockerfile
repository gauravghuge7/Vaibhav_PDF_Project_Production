# Step 1: Use an official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if it exists)
COPY package*.json ./

# Step 4: Install dependencies while suppressing warnings
RUN npm install --frozen-lockfile --loglevel=error

# Step 5: Copy the rest of the project files into the container
COPY . .

# Step 6: Build the Next.js project while ignoring warnings
RUN npm run build --silent

# Step 7: Expose port 3000 (default for Next.js)
EXPOSE 3000

# Step 8: Start the Next.js app in production mode
CMD ["npm", "run", "dev"]
