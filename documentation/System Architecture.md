#### System Architecture

```mermaid
flowchart TD
subgraph Users
    A(Usesr Interaction: \nLogin \nMoves)
end

subgraph Front End
	B(Send user input to backend)
end
	
subgraph Back End
	C(Python: \nGather user's data with Django \nEdit user's board)
end

subgraph Algorithms
    D(Methods to run Sudoku Game: \nCreate board \nEdit board)
end

subgraph Database
	E[(MySQL: \nUser data \nBoard data)]
end

Users <--> Front End
B <--> C
C <--> D
C <--> E
```

