// import React, { useEffect, useState } from 'react';
// import { getUsers, getUserHistory } from '../api/api';
// import UserModal from './UserModal';

// const Leaderboard = () => {
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             const userList = await getUsers();
//             setUsers(userList.sort((a, b) => b.Points - a.Points)); // Sort by points
//         };
//         fetchUsers();
//     }, []);

//     const handleUserClick = async (username) => {
//         const history = await getUserHistory(username);
//         setSelectedUser({ username, history: history.data });
//     };

//     return (
//         <div>
//             <h2>Leaderboard</h2>
//             <ul>
//                 {users.map(user => (
//                     <li key={user.username} onClick={() => handleUserClick(user.username)}>
//                         {user.username} - {user.Points} points
//                     </li>
//                 ))}
//             </ul>
//             {selectedUser && (
//                 <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
//             )}
//         </div>
//     );
// };

// export default Leaderboard;


import React, { useEffect, useState } from 'react';
import { getUsers, getUserHistory } from '../api/api';
import UserModal from './UserModal';

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const userList = await getUsers();
            setUsers(userList.sort((a, b) => b.points - a.points)); 
        };
        fetchUsers();
    }, []);

    const handleUserClick = async (username) => {
        const history = await getUserHistory(username);
        setSelectedUser({ username, history: history.data });
    };

    const determinePrize = (rank) => {
        // Define how prizes are awarded based on rank
        if (rank === 1) return 'Gold';
        if (rank === 2) return 'Silver';
        if (rank === 3) return 'Bronze';
        return 'Participant'; // Default prize for other ranks
    };

    return (
        <div>
            <h2>Leaderboard</h2>
            <ul>
                {users.map(user => (
                    <li key={user.username} onClick={() => handleUserClick(user.username)}>
                        <strong>{user.firstName}</strong> - Rank: {user.rank}, Prize: {determinePrize(user.rank)}, Points: {user.points}
                    </li>
                ))}
            </ul>
            {selectedUser && (
                <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
            )}
        </div>
    );
};

export default Leaderboard;
