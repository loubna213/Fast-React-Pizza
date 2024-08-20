import { Outlet, useNavigation } from "react-router-dom";
import Header from './Header';
import Loader from './Loader';
import CartOverview from '../features/cart/CartOverview';

function AppLayout() {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading';

  return (
    <div div className="grid grid-rows-[auto_1fr_auto] h-screen">
      {isLoading && <Loader/>}
      <Header/>
      <div className="overflow-y-scroll">
        <main className="max-w-3xl mx-auto">
            <Outlet/>
        </main>
      </div>
      <CartOverview/>
    </div>
  );
}
  
  export default AppLayout;
  