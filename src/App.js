import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from './pages/Homepage'
import './default.scss'
import Registartion from "./pages/Registartion";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import { checkUserSession } from "./redux/User/user.actions";
import { useDispatch } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import WithAdminAuth from "./hoc/withAdminAuth";
import AdminToolbar from "./components/AdminToolbar";
//hoc
import WithAuth from "./hoc/withAuth";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import OrderPlaced from "./components/OrderPlaced";
import Restaurant from "./pages/Restaurant";


const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <AdminToolbar />
      <Switch>
        <Route exact path="/" render={() => (
          <HomepageLayout >
            <HomePage />
          </HomepageLayout>
        )} />
        <Route exact path="/search" render={() => (
          <MainLayout>
            <Search />
          </MainLayout>
        )} />
        <Route path="/search/:filterType" render={() => (
          <MainLayout>
            <Search />
          </MainLayout>
        )} />
        <Route path="/cart" render={() => (
          <MainLayout>
            <Cart />
          </MainLayout>
        )} />
        <Route path="/payment" render={() => (
          <MainLayout>
            <Payment />
          </MainLayout>
        )} />
        <Route path="/orderPlaced" render={() => (
          <MainLayout>
            <OrderPlaced />
          </MainLayout>
        )} />
        <Route exact path="/registartion" render={() => (
          <MainLayout >
            <Registartion />
          </MainLayout>
        )} />
        <Route exact path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />
        <Route path="/recovery" render={() => (
          <MainLayout>
            <Recovery />
          </MainLayout>
        )} />
        <Route path="/dashboard" render={() => (
          <WithAuth>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </WithAuth>
        )} />
        <Route path="/admin" render={() => (
          // <WithAdminAuth>
          <MainLayout>
            <Admin />
          </MainLayout>
          // </WithAdminAuth>
        )} />
        <Route path="/restaurant" render={() => (
          // <WithAdminAuth>
          <MainLayout>
            <Restaurant />
          </MainLayout>
          // </WithAdminAuth>
        )} />
      </Switch>
    </div>
  );
}

export default App;
