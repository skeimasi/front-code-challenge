import { Help } from '@mui/icons-material';
import { AppBar, Box, Chip, IconButton, Modal, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductListView from '../../components/ProductListView';
import UserListView from '../../components/UserListView';
import WithSearchBar from '../../hoc/WithSearchbar';
import { removeFromList } from '../../reducers/listReducer';
import { RootState } from '../../store/store';
import './App.css';
import ArzwallLogo from '../../assets/images/logo-ivest.png';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function App() {

  const selectedList = useSelector((store: RootState) => store.listSlice.items);
  const dispatch = useDispatch();

  const UserListWithSearchBar = React.useMemo(() => WithSearchBar(UserListView), []);
  const ProductListWithSearchBar = React.useMemo(() => WithSearchBar(ProductListView), []);

  const [help, showHelp] = React.useState(false);

  return (
    <div className="App">
      <AppBar style={{ padding: 5, display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
        <img alt="#" src={ArzwallLogo} height={30} />
        <Typography>Code Challenge</Typography>
        <IconButton onClick={() => showHelp(true)}>
          <Help style={{ color: "white" }} />
        </IconButton>
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

      <Modal open={help} onClose={() => showHelp(false)}>
        <Box sx={style} dir='rtl'>
          <Typography variant='h4'>آیتم های مورد نیاز</Typography>
          <Typography>با استفاده از api  های فیک دو لیست دریافت کرده و در دو کامپوننت مجزا نمایش داده شوند</Typography>
          <Typography>هر کدام از لیست ها قابلیت فیلتر داشته باشند</Typography>
          <Typography>با کلیک بر روی آیتم های هر لیست ، آن آیتم به لیست دست راستی اضافه شود</Typography>
          <Typography>با کلیک بر روی آیتم های لیست دست راست، آن آیتم حذف شود</Typography>
          <Typography>از typescript , redux , material ui  استفاده شود</Typography>
          <Typography></Typography>
        </Box>
      </Modal>

    </div>
  );
}

export default App;
