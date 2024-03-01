# Docker Containeriation
1. Open `Docker Desktop` and navigate to project repo
2. To do a basic build: `docker-compose up`
3. To stop the emulation: `docker-compose down`

or 
- Just run a detached head and map a port 
building image(go in the backend folder): 
`docker build -t sudoku-backend .`
`docker run -d -p 8000:8000 sudoku-backend`
http://localhost:8000
Nothing there as there isn't a backend implemented.

building just the frontend(go in the frontend folder) 
`docker build -t sudoku-frontend .`
`docker run -d -p 3000:3000 sudoku-frontend`
http://localhost:3000