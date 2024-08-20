import { Link, NavLink } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
    return (
      <header className="flex items-center justify-between sm:px-6 px-4 py-3 border-b border-stone-200 uppercase bg-yellow-400">
        <Link to='/' className="tracking-widest">Fast React Pizza CO.</Link>
        <SearchOrder/>
        <nav>
            <NavLink to='/' className="pr-3">Home</NavLink>
            <NavLink to='menu' className="pr-3">Menu</NavLink>
            <NavLink to='order/new' className="pr-3">Order</NavLink>
            <NavLink to='cart' className="pr-3">Cart</NavLink>
            <NavLink to='user' className="pr-3">User</NavLink>
        </nav>
        <UserName/>
      </header>
    );
  }
  
  export default Header;
  