import { Box, TextField } from "@mui/material";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { setKeyword } from "../reducers/listReducer";

const WithSearchbar = (WrappedComponent: FC) => {

    const dispatch = useDispatch();

    return function WithSearchbarComponent(props: any) {
        return <Box padding={2} bgcolor="white">
            <TextField placeholder="Search..." style={{ width: 400, marginBottom: 5 }}
                onChange={(e) => dispatch(setKeyword({
                    name: e.target.value, ...props
                }))}
            />
            <WrappedComponent />
        </Box>
    }
}

export default WithSearchbar;