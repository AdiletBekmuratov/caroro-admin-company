import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import SignIn from "./components/SignIn";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { getMe } from "./redux/slices/auth";
import Vehicles from "./components/Vehicles";

function App() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);
  useEffect(() => {
    const getUser = async () => {
      await dispatch(getMe());
    };

    getUser();
  }, []);

  return (
    <BrowserRouter>
      {user ? (
        <Layout>
          <Routes>
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="*" element={<Navigate to={"/companies"} replace />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="*" element={<Navigate to={"/signIn"} replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
