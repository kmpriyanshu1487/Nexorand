import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { getUsers } from '../api/api';

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedTab, setSelectedTab] = useState("Daily");

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterData(selectedTab);
    }, [selectedTab, leaderboardData]);

    const fetchUsers = async () => {
        try {
            const users = await getUsers(); // Fetch users from the API
            setLeaderboardData(users); // Set the fetched data to the state
            filterData(selectedTab); // Filter data according to the selected tab
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const filterData = (tab) => {
        let data = [];
        if (tab === "Daily" || tab === "Weekly" || tab === "Monthly") {
            data = leaderboardData.slice(0, 10); 
        }
        setFilteredData(data);
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <div className="flex justify-between w-full h-20 bg-blue-400 items-center flex-row">
                <div>
                    <h2 className="text-2xl pl-6 font-bold">3982 Today</h2>
                    <p className="text-lg pl-6 font-medium">₹2875.00</p>
                </div>
                <div className="flex items-center">
                    <p className="mr-2">LeaderBoard</p>
                    <PersonOutlineIcon className="mr-6" />
                </div>
            </div>

            <div className="flex justify-center mt-7 mb-5 px-10">
                <div className="flex gap-4">
                    <Button
                        variant={selectedTab === "Daily" ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => handleTabChange("Daily")}
                    >
                        Daily
                    </Button>
                    <Button
                        variant={selectedTab === "Weekly" ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => handleTabChange("Weekly")}
                    >
                        Weekly
                    </Button>
                    <Button
                        variant={selectedTab === "Monthly" ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => handleTabChange("Monthly")}
                    >
                        Monthly
                    </Button>
                </div>
            </div>

            <TableContainer component={Paper} sx={{ width: "100%", maxWidth: 1240 }}>
                <Table aria-label="leaderboard table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Prize</TableCell>
                            <TableCell align="right">Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((data) => (
                            <TableRow key={data.rank}>
                                <TableCell component="th" scope="row">
                                    <div className="flex flex-row items-center">
                                        <div className="flex justify-center mr-2">
                                            <PersonOutlineIcon />
                                        </div>
                                        <div>
                                            <div className="font-medium">{data.name}</div>
                                            <div style={{ fontSize: ".6rem", color: "gray" }}>
                                                Rank: {data.rank}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="center">{data.price}</TableCell>
                                <TableCell align="right">{data.points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Leaderboard;
