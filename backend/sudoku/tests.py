from django.test import TestCase
from sudoku.models import Users
from .sudoku import Sudoku

# class UserModelTests(TestCase):
#     def test_add_single_user(self):
#         # adding a single user to the database
#         user = Users.objects.create(id="testuser", pwd="testpassword", email="test@gmail.com")
#         self.assertIsNotNone(user.pk)
#         user.delete()

#     def test_delete_single_user(self):
#         # deleting a single user from the database
#         user = Users.objects.create(id="deleteuser", pwd="password", email="delete@gmail.com")
#         user_id = user.pk
#         user.delete()
#         self.assertFalse(Users.objects.filter(pk=user_id).exists())

#     def test_add_two_users(self):
#         #adding two users to the database
#         Users.objects.create(id="user1", pwd="pass1", email="user1@gmail.com")
#         Users.objects.create(id="user2", pwd="pass2", email="user2@gmail.com")
#         self.assertEqual(Users.objects.count(), 2)

#     def test_modify_user_password(self):
#         # mod a user's password
#         user = Users.objects.create(id="modifyuser", pwd="oldpassword", email="mod@gmail.com")
#         Users.objects.filter(id="modifyuser").update(pwd="newpassword")
#         self.assertEqual(Users.objects.get(id="modifyuser").pwd, "newpassword")

#     def test_modify_user_email(self):
#         # modi a user's email
#         user = Users.objects.create(id="emailuser", pwd="password", email="old@gmail.com")
#         Users.objects.filter(id="emailuser").update(email="new@gmail.com")
#         self.assertEqual(Users.objects.get(id="emailuser").email, "new@gmail.com")

class SudokuAlgoTests(TestCase):
    # def test_sudoku_status(self):
    #     # Check the sudoku_status for a completed board
    #     sudoku = Sudoku()
    #     completed_board = [
    #         [5, 3, 4, 6, 7, 8, 9, 1, 2],
    #         [6, 7, 2, 1, 9, 5, 3, 4, 8],
    #         [1, 9, 8, 3, 4, 2, 5, 6, 7],
    #         [8, 5, 9, 7, 6, 1, 4, 2, 3],
    #         [4, 2, 6, 8, 5, 3, 7, 9, 1],
    #         [7, 1, 3, 9, 2, 4, 8, 5, 6],
    #         [9, 6, 1, 5, 3, 7, 2, 8, 4],
    #         [2, 8, 7, 4, 1, 9, 6, 3, 5],
    #         [3, 4, 5, 2, 8, 6, 1, 7, 9],
    #     ]
    #     self.assertTrue(sudoku.sudoku_status(completed_board))

    #     # Check for an incomplete board
    #     incomplete_board = [
    #         [5, 3, 4, 6, 7, 8, 9, 1, 2],
    #         [6, 7, 2, 1, 9, 5, 3, 4, 8],
    #         [1, 9, 8, 3, 4, 2, 5, 6, 7],
    #         [8, 5, 9, 7, 6, 1, 4, 2, 3],
    #         [4, 2, 6, 8, 5, 3, 7, 9, 1],
    #         [7, 1, 3, 9, 2, 4, 8, 5, 6],
    #         [9, 6, 1, 5, 3, 7, 2, 8, 4],
    #         [2, 8, 7, 4, 1, 9, 6, 3, 5],
    #         [3, 4, 5, 2, 8, 6, 0, 7, 9],
    #     ]
    #     self.assertFalse(sudoku.sudoku_status(incomplete_board))

    def test_generate_sudoku(self):
        # Check that board is 9x9
        sudoku = Sudoku("Easy")
        sudoku.generate_sudoku()
        self.assertEqual(len(sudoku.board), 9)
        for row in sudoku.board:
            self.assertEqual(len(row), 9)

    # def test_solve_sudoku(self):
    #     # Check that the solution is a valid
    #     sudoku = Sudoku()
    #     test_board = [
    #         [5, 3, 0, 0, 7, 0, 0, 0, 0],
    #         [6, 0, 0, 1, 9, 5, 0, 0, 0],
    #         [0, 9, 8, 0, 0, 0, 0, 6, 0],
    #         [8, 0, 0, 0, 6, 0, 0, 0, 3],
    #         [4, 0, 0, 8, 0, 3, 0, 0, 1],
    #         [7, 0, 0, 0, 2, 0, 0, 0, 6],
    #         [0, 6, 0, 0, 0, 0, 2, 8, 0],
    #         [0, 0, 0, 4, 1, 9, 0, 0, 5],
    #         [0, 0, 0, 0, 8, 0, 0, 7, 9],
    #     ]
    #     solution = sudoku.solve_sudoku(test_board)
    #     self.assertTrue(sudoku.sudoku_status(solution))

    def test_valid_board_solution(self):
        # Check that each col and row has 9 nums (sets) ie unique
        sudoku = Sudoku()
        solution = sudoku.solve_sudoku()
        for i in range(9):
            row = solution[i]
            column = []  
            for j in range(9):  
                element = solution[j][i]  
                column.append(element)  
            self.assertTrue(len(set(row)) == 9)
            self.assertTrue(len(set(column)) == 9)

    def test_generated_board_solution_validity(self):
        # test out creation and solution and see each part is a set
        sudoku = Sudoku("Easy")
        sudoku.generate_sudoku()
        solution = sudoku.solve_sudoku()
        for i in range(9):
            row = solution[i]
            column = []
            for j in range(9): 
                element = solution[j][i]  
                column.append(element)  
            self.assertTrue(len(set(row)) == 9)
            self.assertTrue(len(set(column)) == 9)

    def test_difficulty_setting_initialization(self):
        # test difficulty setting
        for difficulty in ["Easy", "Medium", "Hard"]:
            sudoku = Sudoku(difficulty=difficulty)
            self.assertEqual(sudoku.difficulty, difficulty)


    def test_board_initialization_easy(self):
        # test easy with correct number of blanks
        sudoku = Sudoku("Easy")
        total_zeros = sum(cell == 0 for row in sudoku.board for cell in row)
        self.assertEqual(total_zeros, 41)

    def test_board_initialization_med(self):
        # test med with correct number of blanks
        sudoku = Sudoku("Medium")
        total_zeros = sum(cell == 0 for row in sudoku.board for cell in row)
        self.assertEqual(total_zeros, 53)

    def test_board_initialization_hard(self):
        # test hard with correct number of blanks
        sudoku = Sudoku("Hard")
        total_zeros = sum(cell == 0 for row in sudoku.board for cell in row)
        self.assertEqual(total_zeros, 64)
