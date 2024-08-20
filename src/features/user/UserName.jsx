import { useSelector } from "react-redux";

const UserName = () => {
    const username = useSelector(store => store.user.username);

    if(!username) return null;

    return (
        <div className="text-sm font-semibold hidden md:block">{username}</div>
    )
}

export default UserName