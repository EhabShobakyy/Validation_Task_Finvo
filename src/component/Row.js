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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [childOpen, setChildOpen] = React.useState([]);
  const [accountCentersOpen, setAccountCentersOpen] = React.useState([]);
  const [accountNamesOpen, setAccountNamesOpen] = React.useState([]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleChildToggle = (index) => {
    const newChildOpen = [...childOpen];
    newChildOpen[index] = !newChildOpen[index];
    setChildOpen(newChildOpen);

    // Reset accountCentersOpen and accountNamesOpen for the clicked child row
    setAccountCentersOpen([]);
    setAccountNamesOpen([]);
  };

  const handleAccountCentersToggle = (childIndex, centerIndex) => {
    const newAccountCentersOpen = [...accountCentersOpen];
    newAccountCentersOpen[childIndex] = newAccountCentersOpen[childIndex] || [];
    newAccountCentersOpen[childIndex][centerIndex] =
      !newAccountCentersOpen[childIndex][centerIndex];
    setAccountCentersOpen(newAccountCentersOpen);

    // Reset accountNamesOpen for the clicked cost center row
    setAccountNamesOpen([]);
  };

  const handleAccountNamesToggle = (childIndex, centerIndex, accountIndex) => {
    const newAccountNamesOpen = [...accountNamesOpen];
    newAccountNamesOpen[childIndex] = newAccountNamesOpen[childIndex] || [];
    newAccountNamesOpen[childIndex][centerIndex] =
      newAccountNamesOpen[childIndex][centerIndex] || [];
    newAccountNamesOpen[childIndex][centerIndex][accountIndex] =
      !newAccountNamesOpen[childIndex][centerIndex][accountIndex];
    setAccountNamesOpen(newAccountNamesOpen);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleToggle}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
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
                    (centerKey, centerIndex) => (
                      <>
                        <TableRow key={centerKey}>
                          <TableCell>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => handleChildToggle(centerIndex)}
                            >
                              {childOpen[centerIndex] ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </IconButton>
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
                              in={childOpen[centerIndex]}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box sx={{ margin: 1 }}>
                                <Table size="small" aria-label="purchases">
                                  <TableBody>
                                    {row.parent.cost_centers[centerKey]
                                      .account_names &&
                                      Object.keys(
                                        row.parent.cost_centers[centerKey]
                                          .account_names
                                      ).map((accountKey, accountIndex) => (
                                        <>
                                          <TableRow key={accountKey}>
                                            <TableCell>
                                              <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() =>
                                                  handleAccountCentersToggle(
                                                    centerIndex,
                                                    accountIndex
                                                  )
                                                }
                                              >
                                                {accountCentersOpen[
                                                  centerIndex
                                                ] &&
                                                accountCentersOpen[centerIndex][
                                                  accountIndex
                                                ] ? (
                                                  <KeyboardArrowUpIcon />
                                                ) : (
                                                  <KeyboardArrowDownIcon />
                                                )}
                                              </IconButton>
                                            </TableCell>
                                            <TableCell
                                              component="th"
                                              scope="row"
                                            >
                                              {accountKey}
                                            </TableCell>
                                            <TableCell
                                              component="th"
                                              scope="row"
                                            >
                                              {
                                                row.parent.cost_centers[
                                                  centerKey
                                                ].account_names[accountKey][0]
                                                  .amount
                                              }
                                            </TableCell>
                                          </TableRow>
                                          <TableRow>
                                            <TableCell colSpan={3}>
                                              <Collapse
                                                in={
                                                  accountCentersOpen[
                                                    centerIndex
                                                  ] &&
                                                  accountCentersOpen[
                                                    centerIndex
                                                  ][accountIndex]
                                                }
                                                timeout="auto"
                                                unmountOnExit
                                              >
                                                <Box sx={{ margin: 1 }}>
                                                  <Table
                                                    size="small"
                                                    aria-label="purchases"
                                                  >
                                                    <TableBody>
                                                      {row.parent.cost_centers[
                                                        centerKey
                                                      ].account_names[
                                                        accountKey
                                                      ].map(
                                                        (
                                                          account,
                                                          nestedAccountIndex
                                                        ) => (
                                                          <TableRow
                                                            key={
                                                              nestedAccountIndex
                                                            }
                                                          >
                                                            <TableCell>
                                                              <IconButton
                                                                aria-label="expand row"
                                                                size="small"
                                                                onClick={() =>
                                                                  handleAccountNamesToggle(
                                                                    centerIndex,
                                                                    accountIndex,
                                                                    nestedAccountIndex
                                                                  )
                                                                }
                                                              >
                                                                {accountNamesOpen[
                                                                  centerIndex
                                                                ] &&
                                                                accountNamesOpen[
                                                                  centerIndex
                                                                ][
                                                                  accountIndex
                                                                ] &&
                                                                accountNamesOpen[
                                                                  centerIndex
                                                                ][accountIndex][
                                                                  nestedAccountIndex
                                                                ] ? (
                                                                  <KeyboardArrowUpIcon />
                                                                ) : (
                                                                  <KeyboardArrowDownIcon />
                                                                )}
                                                              </IconButton>
                                                            </TableCell>
                                                            <TableCell
                                                              component="th"
                                                              scope="row"
                                                            >
                                                              {account.description !==
                                                              null
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
                                      ))}
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
