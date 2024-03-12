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
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [childOpen, setChildOpen] = React.useState([]);
  const [accountCentersOpen, setAccountCentersOpen] = React.useState([]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleChildToggle = (index) => {
    const newChildOpen = [...childOpen];
    newChildOpen[index] = !newChildOpen[index];
    setChildOpen(newChildOpen);

    // Reset accountCentersOpen and accountNamesOpen for the clicked child row
    setAccountCentersOpen([]);
  };

  const handleAccountCentersToggle = (childIndex, centerIndex) => {
    const newAccountCentersOpen = [...accountCentersOpen];
    newAccountCentersOpen[childIndex] = newAccountCentersOpen[childIndex] || [];
    newAccountCentersOpen[childIndex][centerIndex] =
      !newAccountCentersOpen[childIndex][centerIndex];
    setAccountCentersOpen(newAccountCentersOpen);
  };

  return (
    <React.Fragment>
      {/* FIRST TABLE */}
      <TableRow onClick={handleToggle} style={{ cursor: "pointer" }}>
        <TableCell className="row_parent" component="th" scope="row">
          <IconButton aria-label="expand row" size="small" className="icons">
            {open ? "-" : "+"}
          </IconButton>
          {row.name}
        </TableCell>
        <TableCell
          className="row_parent"
          sx={{ paddingRight: 4 }}
          align="right"
        >
          {row.parent.total_amount}
        </TableCell>
      </TableRow>
      {/* SECOND TABLE */}
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 12,
            paddingTop: 12,
          }}
          colSpan={12}
        >
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{
              background: "white",
              borderTopLeftradius: 4,
              borderTopRightradius: 4,
            }}
          >
            <Typography
              sx={{
                padding: 2,
                paddingBottom: 0,
                fontWeight: "600",
                fontSize: 14,
              }}
              variant="h6"
              gutterBottom
              component="div"
            >
              Cost Centers
            </Typography>
            <Box>
              <Table aria-label="purchases">
                <TableBody>
                  {Object.keys(row.parent.cost_centers).map(
                    (centerKey, centerIndex) => (
                      <>
                        {/* Second Layer */}
                        <TableRow
                          key={centerIndex}
                          onClick={() => handleChildToggle(centerIndex)}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell
                            sx={{
                              paddingTop: 2,
                              paddingBottom: 2,
                              paddingRight: 2,
                              paddingLeft: 2,
                              fontWeight: 600,
                            }}
                            component="th"
                            scope="row"
                          >
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              sx={{ fontWeight: "600" }}
                              className="icons"
                            >
                              {childOpen[centerIndex] ? "-" : "+"}
                            </IconButton>
                            {centerKey}
                          </TableCell>
                          <TableCell
                            align="right"
                            component="th"
                            scope="row"
                            sx={{ paddingRight: 2, fontWeight: 600 }}
                          >
                            {row.parent.cost_centers[centerKey].total_amount}
                          </TableCell>
                        </TableRow>
                        {/* Fourth Layer */}
                        <TableRow>
                          <TableCell colSpan={12}>
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
                                          <TableRow
                                            key={accountKey}
                                            style={{
                                              border: "1px solid #d9e1f2",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              handleAccountCentersToggle(
                                                centerIndex,
                                                accountIndex
                                              )
                                            }
                                          >
                                            <TableCell
                                              component="th"
                                              scope="row"
                                            >
                                              <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                className="icons"
                                              >
                                                {accountCentersOpen[
                                                  centerIndex
                                                ] &&
                                                accountCentersOpen[centerIndex][
                                                  accountIndex
                                                ]
                                                  ? "-"
                                                  : "+"}
                                              </IconButton>
                                              {accountKey}
                                            </TableCell>
                                            {/* <TableCell
                                              component="th"
                                              scope="row"
                                            >
                                              {
                                                row.parent.cost_centers[
                                                  centerKey
                                                ].account_names[accountKey][0]
                                                  .amount
                                              }
                                            </TableCell> */}
                                          </TableRow>
                                          <TableRow>
                                            <TableCell colSpan={12}>
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
                                                  <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                    component="div"
                                                    sx={{
                                                      fontSize: 14,
                                                      fontWeight: 600,
                                                    }}
                                                  >
                                                    Details
                                                  </Typography>
                                                  <Table
                                                    size="small"
                                                    aria-label="purchases"
                                                  >
                                                    <TableHead>
                                                      <TableRow>
                                                        <TableCell
                                                          sx={{
                                                            fontWeight: 600,
                                                          }}
                                                        >
                                                          Description
                                                        </TableCell>

                                                        <TableCell
                                                          sx={{
                                                            fontWeight: 600,
                                                          }}
                                                          align="right"
                                                        >
                                                          Price
                                                        </TableCell>
                                                      </TableRow>
                                                    </TableHead>
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
                                                            <TableCell
                                                              component="th"
                                                              scope="row"
                                                            >
                                                              {account.description !==
                                                              null
                                                                ? account.description
                                                                : "لا يوجد تفاصيل"}
                                                            </TableCell>
                                                            <TableCell
                                                              component="th"
                                                              scope="row"
                                                              align="right"
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
