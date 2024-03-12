#### System Architecture

```mermaid
flowchart TD
subgraph Users
    A(Usesr Interaction: Login, Moves)
end

subgraph Front End
	B(Javascript: Send user input to backend)
end
	
subgraph Back End
	C(Python: Gather user's data with Django)
	D(Python: Edit user's board)
end

subgraph Algorithms
    E(Methods to run Sudoku Game: Create board, edit board)
end

subgraph Database
	F[(MySQL: Data Storage)]
end

A <--> B
B <--> C
B <--> D
C <--> F
D <--> E
```

