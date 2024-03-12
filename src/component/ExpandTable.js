import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import { useEffect, useState } from "react";
import Row from "./Row";

export default function CollapsibleTable() {
  const [apiData, setApiData] = useState([]);
  const [transformedArray, setTransformedArray] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  // FETCH API DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://54.85.104.19:8000/reporting/expense_report/?from=2/1/2022&to=5/4/2022&filter_by=month`
        );
        setApiData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const transformedArray = Object.entries(apiData).map(
      ([date, data], index) => {
        const name = Object.keys(data)[0];
        const parent = data[name];

        // Parse the input date
        const parsedDate = new Date(date);
        // Format the date to display the month name
        const formattedDate = parsedDate.toLocaleString("en-US", {
          month: "long",
        });

        return {
          date: formattedDate,
          id: index,
          name,
          parent,
        };
      }
    );

    setTransformedArray(transformedArray);
  }, [apiData]);
  // Calculate the sum
  useEffect(() => {
    // Calculate the sum and update the state
    const sum = transformedArray.reduce(
      (acc, el) => acc + el.parent.total_amount,
      0
    );
    setTotalSum(sum);
  }, [transformedArray]);

  return (
    <TableContainer
      component={Paper}
      sx={{ background: "#8593910d", width: 1000, margin: "auto" }}
    >
      <Table aria-label="collapsible table">
        <TableHead sx={{ background: "#d9e1f2" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Row Labels</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">
              Grand Total
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transformedArray.map((row) => (
            <Row key={row.id} row={row} totalAmount={row.parent.total_amount} />
          ))}

          <TableRow sx={{ background: "#d9e1f2" }}>
            <TableCell sx={{ fontWeight: 600 }} component="th" scope="row">
              Grand Total
            </TableCell>
            <TableCell sx={{ fontWeight: 600, paddingRight: 4 }} align="right">
              {totalSum}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
