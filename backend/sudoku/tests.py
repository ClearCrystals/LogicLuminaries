from django.test import TestCase
from sudoku.models import Users, Boards
from .sudoku import Sudoku, KillerSudoku
import json
from django.contrib.auth.hashers import check_password
from rest_framework.test import APITestCase
from sudoku.serializers import UsersSerializer, BoardSerializer


class UserModelTests(TestCase):
    def test_add_single_user(self):
        # Adding a single user to the database
        user = Users.objects.create(
            id="testuser", pwd="testpassword", email="test@gmail.com"
        )
        self.assertIsNotNone(user.pk)
        user.delete()

    def test_delete_single_user(self):
        # Deleting a single user from the database
        user = Users.objects.create(
            id="deleteuser", pwd="password", email="delete@gmail.com"
        )
        user_id = user.pk
        user.delete()
        self.assertFalse(Users.objects.filter(pk=user_id).exists())

    def test_add_two_users(self):
        # Adding two users to the database
        Users.objects.create(id="user1", pwd="pass1", email="user1@gmail.com")
        Users.objects.create(id="user2", pwd="pass2", email="user2@gmail.com")
        self.assertEqual(Users.objects.count(), 2)

    def test_modify_user_password(self):
        # Modify a user's password
        Users.objects.create(id="modifyuser", pwd="oldpassword", email="mod@gmail.com")
        Users.objects.filter(id="modifyuser").update(pwd="newpassword")
        self.assertEqual(Users.objects.get(id="modifyuser").pwd, "newpassword")

    def test_modify_user_email(self):
        # Modify a user's email
        Users.objects.create(id="emailuser", pwd="password", email="old@gmail.com")
        Users.objects.filter(id="emailuser").update(email="new@gmail.com")
        self.assertEqual(Users.objects.get(id="emailuser").email, "new@gmail.com")


class SudokuAlgoTests(TestCase):
    def test_sudoku_status(self):
        # Check the sudoku_status for a completed board
        sudoku = Sudoku()
        completed_board = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9],
        ]
        sudoku.board = completed_board
        self.assertTrue(sudoku.sudoku_status() == 100.0)

        # Check for an incomplete board
        incomplete_board = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 0, 7, 9],
        ]
        sudoku.board = incomplete_board
        self.assertFalse(sudoku.sudoku_status() == 100.0)

    def test_solve_sudoku(self):
        # Check that the solution is a valid
        sudoku = Sudoku()
        test_board = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9],
        ]
        sudoku.board = test_board
        self.assertTrue(sudoku.solve_sudoku())

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
        # Test out creation and solution and see each part is a set
        sudoku = Sudoku("Easy")
        sudoku._generate_sudoku()
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
        # Test difficulty setting
        for difficulty in ["Easy", "Medium", "Hard"]:
            sudoku = Sudoku(difficulty=difficulty)
            self.assertEqual(sudoku.difficulty, difficulty)

    def test_board_initialization_easy(self):
        # Test easy with correct number of blanks
        sudoku = Sudoku("Easy")
        total_zeros = sum(cell == 0 for row in sudoku.board for cell in row)
        self.assertEqual(total_zeros, 41)

    def test_board_initialization_med(self):
        # Test med with correct number of blanks
        sudoku = Sudoku("Medium")
        total_zeros = sum(cell == 0 for row in sudoku.board for cell in row)
        self.assertEqual(total_zeros, 53)

    def test_board_initialization_hard(self):
        # Test hard with correct number of blanks
        sudoku = Sudoku("Hard")
        total_zeros = sum(cell == 0 for row in sudoku.board for cell in row)
        self.assertEqual(total_zeros, 64)


class KillerSudokuAlgoTests(TestCase):
    def test_killer_sudoku_init(self):
        killer_sudoku = KillerSudoku("Hard")
        self.assertEqual(len(killer_sudoku.board), 9)
        self.assertEqual(killer_sudoku.difficulty, "Hard")

    def test_killer_sudoku_status(self):
        killer_sudoku = KillerSudoku("Hard")
        status = killer_sudoku.sudoku_status()
        self.assertTrue(0 <= status <= 100)

    def test_solve_killer_sudoku(self):
        killer_sudoku = KillerSudoku("Hard")
        result = killer_sudoku.solve_sudoku()
        self.assertTrue(result)

    def test_is_cage_valid(self):
        killer_sudoku = KillerSudoku("Hard")
        for cage_id in killer_sudoku.cages:
            self.assertTrue(killer_sudoku.is_cage_valid(cage_id))

    def test_generate_killer_sudoku(self):
        killer_sudoku = KillerSudoku("Hard")
        killer_sudoku._generate_sudoku()
        self.assertEqual(len(killer_sudoku.board), 9)

    def test_difficulty_setting_initialization(self):
        for difficulty in ["Easy", "Medium", "Hard"]:
            killer_sudoku = KillerSudoku(difficulty=difficulty)
            self.assertEqual(killer_sudoku.difficulty, difficulty)

    def test_cage_composition(self):
        killer_sudoku = KillerSudoku("Medium")
        all_cells = set()
        for cage in killer_sudoku.cages.values():
            cage_cells = set(cage["cells"])
            self.assertTrue(all_cells.isdisjoint(cage_cells))
            all_cells.update(cage_cells)

    def test_cage_sum_integrity(self):
        killer_sudoku = KillerSudoku("Medium")
        for cage_id, cage in killer_sudoku.cages.items():
            expected_sum = cage["sum"]
            actual_sum = sum(
                killer_sudoku.solved_board[row][col] for row, col in cage["cells"]
            )
            self.assertEqual(expected_sum, actual_sum)

    def test_serialization(self):
        killer_sudoku = KillerSudoku("Medium")
        serialized = json.dumps(killer_sudoku.board)
        deserialized = json.loads(serialized)
        self.assertEqual(killer_sudoku.board, deserialized)


class UsersSerializerTest(APITestCase):
    def setUp(self):
        self.user_attributes = {
            "id": "testuser",
            "pwd": "testpassword",
            "email": "test@gmail.com",
        }
        self.serializer_data = UsersSerializer().data

    def test_contains_expected_fields(self):
        self.assertEqual(set(self.serializer_data.keys()), set(["id", "pwd", "email"]))

    def test_password_field_encrypted(self):
        serializer = UsersSerializer(data=self.user_attributes)
        if serializer.is_valid():
            user = serializer.save()
            self.assertTrue(check_password(self.user_attributes["pwd"], user.pwd))


class BoardSerializerTest(APITestCase):
    def setUp(self):
        self.user = Users.objects.create(
            id="testuser", pwd="testpassword", email="test@gmail.com"
        )
        self.board_attributes = {
            "id": 1,
            "state": "[[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]]",
            "answer": "[[5,3,4,6,7,8,9,1,2],[6,7,2,1,9,5,3,4,8],[1,9,8,3,4,2,5,6,7],[8,5,9,7,6,1,4,2,3],[4,2,6,8,5,3,7,9,1],[7,1,3,9,2,4,8,5,6],[9,6,1,5,3,7,2,8,4],[2,8,7,4,1,9,6,3,5],[3,4,5,2,8,6,1,7,9]]",
            "initial": "[[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]]",
            "difficulty": "Easy",
            "style": "Classic",
            "user": self.user,
            "isFinished": False,
        }
        self.serializer_data = BoardSerializer().data

    def test_contains_expected_fields(self):
        self.assertEqual(
            set(self.serializer_data.keys()),
            set(
                [
                    "id",
                    "state",
                    "answer",
                    "initial",
                    "difficulty",
                    "style",
                    "user",
                    "isFinished",
                ]
            ),
        )
