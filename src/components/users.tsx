import React, { useState, useEffect } from "react";
import {
  Button,
  TableCell,
  ButtonGroup,
  Container,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Box,
  Avatar,
  Paper,
} from "@mui/material";
import Grid from '@mui/material/Grid';

const Users = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any>(null); // New state for the selected user


  useEffect(() => {
    getUserWithFetch();
  }, []);

  const getUserWithFetch = async () => {
    const response = await fetch("https://my-json-server.typicode.com/ThrasyvoulosKafasis/epignosis-users/users");
    const jsonData = await response.json();
    var result: any = [];

    for(var i in jsonData) {
      result.push(jsonData[i]);
    }
    setUserList(result);
  };

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
  };

  const UpdateUser = (id: any) => {
    window.location.href = "/update/" + id;
  };

  return (
    <Container>
      <Grid container spacing={3} style={{ marginTop: 20 }}>
        {/* Left Side: List of Users */}
        <Grid item xs={4}>
          <Paper elevation={3}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <h2>Contact List</h2>
            </Box>
            <Table>
              <TableHead className="row-header">
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((user: any, selectedUser: any) => (
                  <TableRow
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    style={{
                      backgroundColor:
                        selectedUser && selectedUser.id === user.id
                          ? "#f0f0f0"
                          : "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <TableCell align="left">{user.name}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        {/* Right Side: User Details */}
        <Grid item xs={8}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            {selectedUser ? (
              <>
                <h2>{selectedUser.name}'s Details</h2>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">Name:</TableCell>
                      <TableCell align="left">{selectedUser.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Surname:</TableCell>
                      <TableCell align="left">{selectedUser.surname}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Username:</TableCell>
                      <TableCell align="left">{selectedUser.username}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Email:</TableCell>
                      <TableCell align="left">{selectedUser.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Phone:</TableCell>
                      <TableCell align="left">{selectedUser.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Address:</TableCell>
                      <TableCell align="left">{selectedUser.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Company:</TableCell>
                      <TableCell align="left">{selectedUser.company}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Avatar:</TableCell>
                      <TableCell align="left">
                        <Avatar src={selectedUser.avatar} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <ButtonGroup
                  color="primary"
                  aria-label="outlined primary button group"
                >
                  <Button
                    className="btn-save"
                    onClick={() => UpdateUser(selectedUser.id)}
                  >
                    Save
                  </Button>
                </ButtonGroup>
              </>
            ) : (
              <p>Please select a user from the list.</p>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Users;
