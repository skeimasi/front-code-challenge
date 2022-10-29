import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import axios from 'axios';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { addToList, clearList, ListType } from '../reducers/listReducer';
import { RootState } from '../store/store';

type IUserInterface = {
    id: number, username: string, email: string, phone: string,
    name: {
        firstname: string, lastname: string
    },
}

export default function UserListView() {

    const [userList, setUserList] = React.useState<IUserInterface[]>([]);
    const [backupList, setBackupList] = React.useState<IUserInterface[]>([]);

    React.useEffect(() => {
        axios.get("https://fakestoreapi.com/users")
            .then(res => {
                setUserList(res.data);
            })
            .catch(e => {
                console.log('e', e);
            })
    }, [])

    const dispatch = useDispatch();

    const keyword = useSelector((store: RootState) => store.listSlice.keyword);

    React.useEffect(() => {
        if ((userList.length > 0) && (keyword.type === "Users")) {
            if (keyword.name.length > 0) {
                if (backupList.length === 0) {
                    setBackupList(userList);
                }
                const _filteredList = userList.filter(item => item.username.includes(keyword.name));
                if (_filteredList.length > 0) {
                    setUserList(_filteredList);
                }
            }
            else {
                setUserList(backupList);
                setBackupList([]);
            }
        }
    }, [keyword]);

    return (
        <Box>
            <List sx={{ width: 400, height: 600, bgcolor: 'background.paper', overflowY: "scroll" }}>
                {
                    userList.map((item, index) => {
                        return (
                            <ListItem key={index} style={{ cursor: "pointer" }}
                                onClick={() => dispatch(addToList(item.username))}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.username} secondary={item.email} />
                            </ListItem>
                        )
                    })
                }
            </List>
            <Button variant='contained' fullWidth style={{ marginTop: 10 }}
                onClick={() => dispatch(clearList())}>
                Clear List
            </Button>
        </Box>
    );
}