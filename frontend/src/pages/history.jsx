import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';

export default function History() {
    
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([])
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
        try {
           const history = await getHistoryOfUser();
           setMeetings(history);
        } catch (err) {

        }
        }
         fetchHistory();
    }, [])

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`
    }

    return (
        <div>
            <IconButton onClick={() => routeTo("/home")}>
                <HomeIcon/>
            </IconButton>

            {meetings.length > 0 ? (
                meetings.map((meeting) => (
                    <Card 
                        key={`${meeting.meetingCode}-${meeting.date}`} 
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    >
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Code: {meeting.meetingCode}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Date: {formatDate(meeting.date)}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography variant="body1" sx={{ padding: 2 }}>
                    No meeting history found
                </Typography>
            )}
        </div>
    );

}