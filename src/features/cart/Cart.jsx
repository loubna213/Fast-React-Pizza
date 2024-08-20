import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import { clearCart } from './cartSlice';


function Cart() {
  const cart = useSelector(store => store.cart.cart);
  const username = useSelector(store => store.user.username)
  const dispatch = useDispatch()

  function handleClearCart() {
    dispatch(clearCart())
  }

  if(!cart.length) return <EmptyCart/>

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      {
        cart.map(item => <CartItem item={item} key={item.pizzaId}/>)
      }

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type='primary'>Order pizzas</Button>
        <Button type='secondary' onClick={handleClearCart}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
