import { useDispatch, useSelector } from "react-redux";
import {addSneaker, updateSneaker, deleteSneaker} from "../store/actions";

const handleAddSneaker = (sneakerData) =>
{
    dispatch(addSneaker(sneakerData));
}

const handleUpdateSneaker = (sneakerId, updatedData) =>
{
    dispatch(updateSneaker(sneakerId, updatedData));
}

const handleDeleteSneaker = (sneakerId) =>
{
    dispatch(deleteSneaker(sneakerId));
}

const AdminSneaker = () =>
{
    return (
        <>
        <h1>Админка для кроссовок</h1>
        </>
    )
}
export default AdminSneaker;