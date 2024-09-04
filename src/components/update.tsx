import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
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
    TextField,
  } from "@mui/material";
  import Grid from '@mui/material/Grid';

function Update() {

    const { id } = useParams();

    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        getUserWithFetch();
    }, []);

    useEffect(() => {
        if (userList.length > 0 && id) {
          const user = userList.find((u: any) => u.id === parseInt(id));
          setSelectedUser(user);
        }
    }, [userList, id]);
    
    const getUserWithFetch = async () => {
        const response = await fetch("https://my-json-server.typicode.com/ThrasyvoulosKafasis/epignosis-users/users");
        const jsonData = await response.json();
        setUserList(jsonData);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setSelectedUser({ ...selectedUser, [name]: value });
    };
    
    const handleSave = async () => {
        if (selectedUser) {
            const response = await fetch(`https://my-json-server.typicode.com/ThrasyvoulosKafasis/epignosis-users/users/${selectedUser.id}`, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedUser),
            });
        
            if (response.ok) {
                alert("User saved successfully!");
            } else {
                alert("Failed to save the user.");
            }
        }
    };

    const handleCancel = () => {
        setSelectedUser(null);
    };

    const handleUserClick = (user: any) => {
        setSelectedUser(user);
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
                            {/* <TableCell align="left">{user.photo}</TableCell> */}
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
                    <h2>Edit {selectedUser.name}'s Details</h2>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell align="left">Name:</TableCell>
                          <TableCell align="left">
                            <TextField
                              name="name"
                              value={selectedUser.name}
                              onChange={handleChange}
                              fullWidth
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left">Email:</TableCell>
                          <TableCell align="left">
                            <TextField
                              name="email"
                              value={selectedUser.email}
                              onChange={handleChange}
                              fullWidth
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left">Phone:</TableCell>
                          <TableCell align="left">
                            <TextField
                              name="phone"
                              value={selectedUser.phone}
                              onChange={handleChange}
                              fullWidth
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left">Address:</TableCell>
                          <TableCell align="left">
                            <TextField
                              name="address"
                              value={selectedUser.address}
                              onChange={handleChange}
                              fullWidth
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left">Company:</TableCell>
                          <TableCell align="left">
                            <TextField
                              name="company"
                              value={selectedUser.company}
                              onChange={handleChange}
                              fullWidth
                            />
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
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>  
                      <Button
                        className="btn-save"
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                    </ButtonGroup>
                  </>
                ) : (
                  <p>Loading user details...</p>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      );
}

export default Update;