# Sudoku database schema
Our app will use one database to store users and another to store boards.

### Signature:
`user(id/username, pwd, auth token)`  
`board(id, state, difficulty, answer, style, user, isfinished)`  
Users are keyed by their id/username. Boards are keyed by their state. This is a many-to-one relation, where one user can have many boards associated with them. 

### Relational diagram:


### Example query:
```sh 
SELECT id, state
    FROM Boards
    WHERE isfinished == True
```