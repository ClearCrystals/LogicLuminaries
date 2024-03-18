import random


class Sudoku:
    """
    A class representing a Sudoku puzzle.

    Attributes:
        DIFFICULTY (dict): A dictionary mapping difficulty levels to the number of cells to remove.
        board (list): A 2D list representing the Sudoku board.
        difficulty (str): The difficulty level of the Sudoku puzzle.

    Methods:
        __init__(self, difficulty="Medium"): Initializes a Sudoku object
        generate_sudoku(self): Generates Sudoku by solving then removing cells based on difficulty.
        sudoku_status(self): Checks the status of the Sudoku puzzle (complete or incomplete).
        solve_sudoku(self): Solves the Sudoku puzzle using backtracking.

    """

    def __init__(self, difficulty="Medium"):
        """
        Initializes a Sudoku object with the specified difficulty level.

        Args:
            difficulty (str, optional): The difficulty of the Sudoku puzzle
        """
        self.board = [[0 for _ in range(9)] for _ in range(9)]
        self.difficulty = difficulty
        self.generate_sudoku()

    def generate_sudoku(self):
        """
        Generates a Sudoku puzzle by solving a puzzle then removes cells based on difficulty.
        """
        self.solve_sudoku()
        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        random.shuffle(numbers)

        # Fill the board with the shuffled numbers
        for row in range(9):
            for col in range(9):
                self.board[row][col] = numbers[(row * 3 + row // 3 + col) % 9]

        # Remove numbers based on difficulty
        num_to_remove = 81 - self.__DIFFICULTY[self.difficulty]
        while num_to_remove > 0:
            row = random.randint(0, 8)
            col = random.randint(0, 8)
            if self.board[row][col] != 0:
                self.board[row][col] = 0
                num_to_remove -= 1

    def sudoku_status(self):
        pass

    def solve_sudoku(self):
        pass
