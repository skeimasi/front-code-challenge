import { AppBar, Box, Chip, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductListView from '../../components/ProductListView';
import UserListView from '../../components/UserListView';
import WithSearchBar from '../../hoc/WithSearchbar';
import { removeFromList } from '../../reducers/listReducer';
import { RootState } from '../../store/store';
import './App.css';

function App() {

  const selectedList = useSelector((store: RootState) => store.listSlice.items);
  const dispatch = useDispatch();

  const UserListWithSearchBar = React.useMemo(() => WithSearchBar(UserListView), []);
  const ProductListWithSearchBar = React.useMemo(() => WithSearchBar(ProductListView), []);

  return (
    <div className="App">
      <AppBar style={{ padding: 5 }}>
        <Typography>Code Challenge</Typography>
      </AppBar>

      <div className='list'>
        <UserListWithSearchBar type="Users" />
        <ProductListWithSearchBar type="Products" />
        <Box width={400} height={725} bgcolor="white" padding={2} overflow="scroll">
          {
            (selectedList.length > 0) &&
            <Typography>Tap to delete</Typography>
          }
          {
            selectedList.map((item, index) => {
              return (
                <Chip variant='filled' label={item} color='primary' style={{ margin: 5 }}
                  onClick={() => {
                    dispatch(removeFromList(index));
                  }} />
              )
            })
          }
        </Box>
      </div>
    </div>
  );
}

export default App;
