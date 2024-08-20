import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import Button from "../../ui/Button";

function DeleteItem({ pizzaId }) {
    const dispatch = useDispatch()

    return (
        <Button type='small' onClick={() => dispatch(deleteItem(pizzaId))}>delete</Button>
    )
}

export default DeleteItem;