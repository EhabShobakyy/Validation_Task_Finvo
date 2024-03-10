// Row component
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
// Import Add and Remove icons from Material-UI
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function Row(props) {
  const { row } = props;
  console.log("row", row);
  const [open, setOpen] = React.useState(false);
  const [childOpen, setChildOpen] = React.useState([]);
  const [accountNamesOpen, setAccountNamesOpen] = React.useState([]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleChildToggle = (index) => {
    const newChildOpen = [...childOpen];
    newChildOpen[index] = !newChildOpen[index];
    setChildOpen(newChildOpen);

    // Reset accountNamesOpen for the clicked child row
    setAccountNamesOpen([]);
  };

  const handleAccountNamesToggle = (childIndex, accountIndex) => {
    const newAccountNamesOpen = [...accountNamesOpen];
    newAccountNamesOpen[childIndex] = newAccountNamesOpen[childIndex] || [];
    newAccountNamesOpen[childIndex][accountIndex] =
      !newAccountNamesOpen[childIndex][accountIndex];
    setAccountNamesOpen(newAccountNamesOpen);
  };

  const isLastLayer = (layer) => {
    return layer === "description";
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {!isLastLayer(row.parent.layer) && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleToggle}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.parent.total_amount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {Object.keys(row.parent.cost_centers).map(
                    (centerKey, index) => (
                      <>
                        <TableRow key={centerKey}>
                          <TableCell>
                            {!isLastLayer(centerKey) && (
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => handleChildToggle(index)}
                              >
                                {childOpen[index] ? (
                                  <KeyboardArrowUpIcon />
                                ) : (
                                  <KeyboardArrowDownIcon />
                                )}
                              </IconButton>
                            )}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {centerKey}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.parent.cost_centers[centerKey].total_amount}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={3}>
                            <Collapse
                              in={childOpen[index]}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box sx={{ margin: 1 }}>
                                <Table size="small" aria-label="purchases">
                                  <TableBody>
                                    {row.parent.cost_centers[centerKey]
                                      .account_names &&
                                      row.parent.cost_centers[
                                        centerKey
                                      ].account_names["account 1"].map(
                                        (account, accountIndex) => (
                                          <TableRow key={accountIndex}>
                                            <TableCell>
                                              {!isLastLayer(account) && (
                                                <IconButton
                                                  aria-label="expand row"
                                                  size="small"
                                                  onClick={() =>
                                                    handleAccountNamesToggle(
                                                      index,
                                                      accountIndex
                                                    )
                                                  }
                                                >
                                                  {accountNamesOpen[index] &&
                                                  accountNamesOpen[index][
                                                    accountIndex
                                                  ] ? (
                                                    <KeyboardArrowUpIcon />
                                                  ) : (
                                                    <KeyboardArrowDownIcon />
                                                  )}
                                                </IconButton>
                                              )}
                                            </TableCell>
                                            <TableCell
                                              component="th"
                                              scope="row"
                                            >
                                              {account.description !== null
                                                ? account.description
                                                : "-"}
                                            </TableCell>
                                            <TableCell
                                              component="th"
                                              scope="row"
                                            >
                                              {account.amount}
                                            </TableCell>
                                          </TableRow>
                                        )
                                      )}
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </>
                    )
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Row;
