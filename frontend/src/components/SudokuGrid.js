import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import _ from "lodash";

axios.defaults.xsrfCookieName = "csrfToken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const SudokuGrid = ({ difficulty, username, savedGrid }) => {
  const createEmptyGrid = () =>
    Array(9).fill(Array(9).fill({ value: "", editable: true }));
  const [gridData, setGridData] = useState(createEmptyGrid());
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [showNumberSelector, setShowNumberSelector] = useState(false);
  const [id, setId] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const url = "http://localhost:8000/api/board/";
  const data = {
    difficulty: difficulty,
    style: "normal",
    user: username,
  };

  const fetchData = async () => {
    try {
      const csrfToken = Cookies.get("csrfToken");
      console.log(`Sending data to ${url}:`, JSON.stringify(data));
      let response = await axios.post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      });
      if (response.status === 200) {
        const parsedInitial = JSON.parse(response.data.initial);
        const parsedState = JSON.parse(response.data.state);
        const parsedAnswer = JSON.parse(response.data.answer);

        const newGrid = parsedState.map((row, rowIndex) =>
          row.map((value, colIndex) => ({
            value: value === 0 ? "" : value.toString(),
            editable: parsedInitial[rowIndex][colIndex] === 0, // editable if parsedInitial has zero
          })),
        );

        setId(response.data.id);
        setGridData(newGrid);
        setCorrectAnswer(parsedAnswer);
      }

      console.log(`${data} response:`, response.data);
    } catch (error) {
      console.error(`Error fetching data:`, error);
    }
  };

  useEffect(() => {
    if (savedGrid) {
      const parsedInitial = JSON.parse(savedGrid.initial);
      const parsedState = JSON.parse(savedGrid.state);

      const newGrid = parsedState.map((row, rowIndex) =>
        row.map((value, colIndex) => ({
          value: value.toString(),
          editable: parsedInitial[rowIndex][colIndex] === 0,
        })),
      );

      setId(savedGrid.id);
      setGridData(newGrid);
    } else {
      fetchData();
    }
  }, [difficulty]);

  const saveGridData = () => {
    const csrfToken = Cookies.get("csrfToken");
    const saveData = {
      board_id: id,
      state: JSON.stringify(
        gridData.map((row) => row.map((cell) => parseInt(cell.value) || 0)), // Convert empty to zero for saving
      ),
    };

    axios
      .post("http://localhost:8000/api/save/", JSON.stringify(saveData), {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      })
      .then(() => console.log("Grid saved"))
      .catch((error) => console.error("Error saving grid:", error));
  };

  const debouncedSaveGridData = _.debounce(saveGridData, 2000);

  const handleCellSelect = (row, col) => {
    if (gridData[row][col].editable) {
      setSelectedCell({ row, col });
      setShowNumberSelector(true);
    }
  };

  const handleNumberSelect = (number) => {
    if (
      selectedCell.row != null &&
      selectedCell.col != null &&
      gridData[selectedCell.row][selectedCell.col].editable
    ) {
      const newGrid = gridData.map((row) => [...row]);

      newGrid[selectedCell.row][selectedCell.col].value = number.toString();
      setGridData(newGrid);
      setSelectedCell({ row: null, col: null });
      setShowNumberSelector(false);
      debouncedSaveGridData();
    }
  };

  const handleSubmit = () => {
    if (!correctAnswer) {
      console.error("No correct answer available for comparison.");
      return;
    }

    // Assuming both gridData and correctAnswer are arrays of arrays
    const isCorrect = gridData.every((row, rowIndex) =>
      row.every(
        (cell, colIndex) =>
          cell.value.toString() ===
          correctAnswer[rowIndex][colIndex].toString(),
      ),
    );

    console.log(isCorrect ? "Correct solution!" : "Incorrect solution.");
  };

  return (
    <Container>
      {gridData.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Col key={colIndex} xs={1}>
              <input
                type="text"
                className="form-control"
                style={{ color: cell.editable ? "black" : "blue" }} // Blue for non-editable cells
                readOnly={!cell.editable}
                value={cell.value || ""}
                onClick={() => handleCellSelect(rowIndex, colIndex)}
              />
            </Col>
          ))}
        </Row>
      ))}
      {showNumberSelector && (
        <Row className="mt-3">
          {[...Array(9)].map((_, index) => (
            <Col key={index} xs={1}>
              <Button
                variant="outline-primary"
                onClick={() => handleNumberSelect(index + 1)}
              >
                {index + 1}
              </Button>
            </Col>
          ))}
        </Row>
      )}
      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SudokuGrid;
