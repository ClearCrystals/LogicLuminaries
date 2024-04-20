import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import _ from "lodash";

axios.defaults.xsrfCookieName = "csrfToken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const SudokuGrid = ({ difficulty, username, savedGrid }) => {
  const createEmptyGrid = () => Array(9).fill(Array(9).fill(""));
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
        // Assuming 200 is the success status code
        console.log("Fetched data:", response.data);

        // Assuming response.data.state is your grid data
        // Parse it to a format that your component can use
        const parsedGridData = JSON.parse(response.data.state);
        const parsedAnswer = JSON.parse(response.data.answer);

        setId(response.data.id);
        setGridData(parsedGridData);
        setCorrectAnswer(parsedAnswer);
      }

      console.log(`${data} response:`, response.data);
    } catch (error) {
      console.error(`Error during ${data}:`, error);
    }
  };

  useEffect(() => {
    if (savedGrid != undefined) {
      console.log(savedGrid)
      const parsedGridData = JSON.parse(savedGrid.state);
      const parsedAnswer = JSON.parse(savedGrid.answer);
  
      setId(savedGrid.id);
      setGridData(parsedGridData);
      setCorrectAnswer(parsedAnswer);
    } else {
      fetchData();
    }
    
  }, [difficulty]);

  const saveGridData = () => {
    const csrfToken = Cookies.get("csrfToken");
    let d = {
      board_id: id,
      state: JSON.stringify(gridData),
      //row: ,
      //column: ,
      //num: ,
    };
    axios
      .post("http://localhost:8000/api/save/", JSON.stringify(d), {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      })
      .then((response) => {
        console.log("Grid saved");
      })
      .catch((error) => {
        console.error("Error saving grid", error);
      });
  };

  const debouncedSaveGridData = _.debounce(saveGridData, 2000);

  const handleCellSelect = (row, col) => {
    setSelectedCell({ row, col });
    setShowNumberSelector(true);
  };

  const handleNumberSelect = (number) => {
    if (selectedCell.row != null && selectedCell.col != null) {
      // Deep copy of gridData
      let newData = gridData.map((row) => [...row]);
      //toString()
      newData[selectedCell.row][selectedCell.col] = number;
      setGridData(newData);
      setSelectedCell({ row: null, col: null }); // Optionally deselect after choosing a number
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
          cell.toString() === correctAnswer[rowIndex][colIndex].toString(),
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
                value={cell}
                readOnly
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
