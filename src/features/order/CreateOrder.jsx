import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import EmptyCart from '../cart/EmptyCart'
import Store from '../../store';
import { clearCart } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData)

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true'
  }

  const errors = {};
  if(!isValidPhone(order.phone)) 
    errors.phone = "please enter a valid phone number, we might need it to contact you";
  if(Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  Store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`);
}

function CreateOrder() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'; 

  const dispatch = useDispatch()
  const formError = useActionData()
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(store => store.cart.cart);

  const totalCartPrice = cart.reduce((acc, arr) => acc + arr.totalPrice, 0)
  const priorityPrice = withPriority ? (totalCartPrice * 20 ) / 100 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const {username, address, position, status: addressStatus, error: errorAddress} = useSelector(store => store.user);

  const isLoadingAddress = addressStatus === 'loading';

  if(!cart.length) return <EmptyCart/>

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" action="/order/new">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
          { formError?.phone && 
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{formError.phone}</p>
          }
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input 
              className="input w-full" 
              type="text" 
              name="address" 
              disabled={isLoadingAddress} 
              defaultValue={address}
              required 
            />
            { addressStatus === 'error' && 
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{errorAddress}</p>
            }
          </div>
          {!position.latitude && !position.longitude && 
          ( <span className="absolute right-[3px] top-[3px] sm:right-[5px] sm:top-[5px]">
              <Button type='small' 
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(fetchAddress())
                }}>Get position</Button>
            </span>)
          }
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.latitude && position.longitude ? `${position.latitude}, ${position.longitude}` : ''} />
        </div>

        <div>
          <Button disabled={isSubmitting || isLoadingAddress} type='primary'>{isSubmitting ? 'placing order...' : 'order now for ' + formatCurrency(`${totalPrice}`)}</Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
