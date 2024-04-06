import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import _ from 'lodash';

axios.defaults.xsrfCookieName = 'csrfToken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const SudokuGrid = () => {
  const createEmptyGrid = () => Array(9).fill(Array(9).fill(''));
  const [gridData, setGridData] = useState(createEmptyGrid());
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [showNumberSelector, setShowNumberSelector] = useState(false);
  const [id, setId] = useState(0)
   
  const url ="http://localhost:8000/api/board/"
  const data = {
    difficulty: "Easy",
    style: "normal",
    user: "user"
  }
  useEffect(() => {
     
    const fetchData = async () => {
        const csrfToken = Cookies.get('csrfToken')
        try {
            const csrfToken = Cookies.get('csrfToken')
            console.log(`Sending data to ${url}:`, JSON.stringify(data));
            let response = await axios.post(url, JSON.stringify(data), {
                headers: {
                    
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                }
            });
            if (response.status === 200) { // Assuming 200 is the success status code
                console.log("Fetched data:", response.data);

                // Assuming response.data.state is your grid data
                // Parse it to a format that your component can use
                const parsedGridData = JSON.parse(response.data.state);
                setId(response.data.id)
                setGridData(parsedGridData); 
            }

            console.log(`${data} response:`, response.data);
        } catch (error) {
            console.error(`Error during ${data}:`, error);
        }
      }

      fetchData()
    }, []);

  const saveGridData = () => {
    const csrfToken = Cookies.get('csrfToken')
    let d = {
      board_id: id,
      state: JSON.stringify(gridData),
      //row: ,
      //column: ,
      //num: ,
    }
    axios.post("http://localhost:8000/api/save/", JSON.stringify(d), {
      headers: {
          
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
      }
    })
      .then(response => {
        console.log('Grid saved');
      })
      .catch(error => {
        console.error('Error saving grid', error);
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
      let newData = gridData.map(row => [...row]);
  
      newData[selectedCell.row][selectedCell.col] = number.toString();
      setGridData(newData);
      setSelectedCell({ row: null, col: null }); // Optionally deselect after choosing a number
      setShowNumberSelector(false);
  
      debouncedSaveGridData();
    }
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
              <Button variant="outline-primary" onClick={() => handleNumberSelect(index + 1)}>
                {index + 1}
              </Button>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SudokuGrid;
