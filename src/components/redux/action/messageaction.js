import { CLEAR_MESSAGE } from "../constant/messagesconstant";

export const clear_message = () => dispatch => {
    dispatch({
        type : CLEAR_MESSAGE,
    });
};