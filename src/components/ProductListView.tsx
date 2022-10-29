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
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToList, clearList } from '../reducers/listReducer';
import { RootState } from '../store/store';

type IUserInterface = {
    id: number, title: string, price: string, description: string,
}

export default function ProductListView() {

    const [productList, setProductList] = React.useState<IUserInterface[]>([]);
    const [backupList, setBackupList] = React.useState<IUserInterface[]>([]);

    React.useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then(res => {
                setProductList(res.data);
            })
            .catch(e => {
                console.log('e', e);
            })
    }, [])

    const dispatch = useDispatch();

    const keyword = useSelector((store: RootState) => store.listSlice.keyword);

    React.useEffect(() => {
        if ((productList.length > 0) && (keyword.type === "Products")) {
            if (keyword.name.length > 0) {
                if (backupList.length === 0) {
                    setBackupList(productList);
                }
                const _filteredList = productList.filter(item => item.title.includes(keyword.name));
                if (_filteredList.length > 0) {
                    setProductList(_filteredList);
                }
            }
            else {
                setProductList(backupList);
                setBackupList([]);
            }
        }
    }, [keyword]);

    return (
        <Box>
            <List sx={{ width: 400, height: 600, bgcolor: 'background.paper', overflowY: "scroll" }}>
                {
                    productList.map((item, index) => {
                        return (
                            <ListItem key={index} style={{ cursor: "pointer" }}
                                onClick={() => dispatch(addToList(item.title))}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.title} secondary={item.description} />
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