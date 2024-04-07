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

    __DIFFICULTY = {"Easy": 40, "Medium": 28, "Hard": 17}

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
        total_cells = 81
        num_to_remove = total_cells - self.__DIFFICULTY[self.difficulty]
        while num_to_remove > 0:
            row = random.randint(0, 8)
            col = random.randint(0, 8)
            if self.board[row][col] != 0:
                self.board[row][col] = 0
                num_to_remove -= 1

    def sudoku_status(self):
        """
        Returns the completion percentage of the Sudoku Puzzle.

        Returns:
            float: The completion percentage of the Sudoku puzzle.
        """
        total_cells = 81
        filled_cells = sum(cell != 0 for row in self.board for cell in row)
        percentage = (filled_cells / total_cells) * 100
        return percentage

    def __is_safe(self, row, col, num):
        """
        Checks if it is safe to place a number in a specific cell.

        Args:
            row (int): The row index of the cell.
            col (int): The column index of the cell.
            num (int): The number to be placed in the cell.

        Returns:
            bool: True if it is safe to place the number, False otherwise.
        """
        # Check the row
        for x in range(9):
            if self.board[row][x] == num:
                return False

        # Check the column
        for x in range(9):
            if self.board[x][col] == num:
                return False

        # Check the 3x3 grid
        start_row = row - row % 3
        start_col = col - col % 3
        for i in range(3):
            for j in range(3):
                if self.board[i + start_row][j + start_col] == num:
                    return False

        return True

    def solve_sudoku(self):
        """
        Solves the Sudoku puzzle using backtracking.

        Returns:
            bool: True if the puzzle is solvable, False otherwise.
        """
        for row in range(9):
            for col in range(9):
                if self.board[row][col] == 0:
                    for num in range(1, 10):
                        if self.__is_safe(row, col, num):
                            self.board[row][col] = num
                            if self.solve_sudoku():
                                return self.board
                            self.board[row][col] = 0
                    return False
        return True
