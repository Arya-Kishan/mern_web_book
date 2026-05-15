import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundayPage from "./pages/ErrorBoundayPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserWithJwtAsync,
  selectLoggedInUser,
  selectPrecheckUser,
} from "./Redux/Auth/AuthSlice";
import logo from "./assets/logo.svg";
const MainLandingPage = lazy(
  () => import("./pages/LandingPage/MainLandingPage"),
);
import Loader from "./components/Loader";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MyImage from "./components/MyImage";
import { toast } from "react-toastify";
import { handleError } from "./helper/CreateError.jsx";
import Home from "./Admin/Home.jsx";
import { onMessage } from "firebase/messaging";
import { messaging } from "./services/Firebase.jsx";
import usePermission from "./hooks/usePermission.jsx";
import SocketContextProvider from "./Context/SocketContext.jsx";

const LoginPage = lazy(() => import("./pages/Auth/LoginPage"));
const SignUpPage = lazy(() => import("./pages/Auth/SignUpPage"));
const ProtectedPage = lazy(() => import("./pages/ProtectedPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const RequestLimit = lazy(() => import("./pages/RequestLimit"));
const HomePage = lazy(() => import("./pages/HomePage/Home.jsx"));
import Lottie from "lottie-react";
import animationData from "./assets/animation/dolphin.json";
import ShowAfterInterval from "./components/common/ShowAfterInterval.jsx";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

function App() {
  const preCheckUser = useSelector(selectPrecheckUser);
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const { checkNotificationPermission } = usePermission();
  const isChatPage = window.location.pathname.includes("/home/chat");

  // FALLBACK COMPONENT
  const FallBack = () => {
    return (
      <div className="w-full h-dvh flex flex-col gap-8 justify-center items-center">
        <MyImage className="w-[100px] h-[100px]" src={logo} alt="" />
        <div className="w-[50px] h-[50px]">
          <Loader />
        </div>
      </div>
    );
  };

  const handleGlobalError = async (error, info) => {
    console.log(error);
    console.log(info);
    handleError(
      `${error?.name}:${error?.message}`,
      "Error caught by react error boundary",
      `Error Boundary - ${error.stack.split("at").slice(0, 5).join("at")}`,
    );
    toast("Error Occured");
  };

  useEffect(() => {
    dispatch(checkUserWithJwtAsync(null));
    onMessage(messaging, (payload) => {
      toast(
        <div>
          <p>{payload.notification.title}</p>
          <p>{payload.notification.body}</p>
        </div>,
      );
    });
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      checkNotificationPermission(loggedInUser);
    }
  }, [loggedInUser]);

  return (
    <ErrorBoundary fallback={<ErrorBoundayPage />} onError={handleGlobalError}>
      <SocketContextProvider>
        <div className="w-full h-[100dvh] bg-[#0A0A46]">
          {preCheckUser ? (
            <BrowserRouter>
              <Suspense fallback={<FallBack />}>
                <Routes>
                  <Route path="/" element={<MainLandingPage />} />
                  <Route
                    path="/home"
                    element={<Navigate to={"/home/tasks"} />}
                  />
                  <Route
                    path="/home/*"
                    element={
                      <ProtectedPage>
                        <HomePage />
                      </ProtectedPage>
                    }
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/requestLimit" element={<RequestLimit />} />
                  <Route path="/admin" element={<Home />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          ) : (
            <FallBack />
          )}
        </div>
        <ShowAfterInterval showDuration={1600} hideDuration={60000 * 2}>
          <div
            className={`w-full h-screen fixed ${isChatPage ? "-bottom-24" : "-bottom-14"} left-0 pointer-events-none opacity-50 flex justify-end items-end sm:hidden`}
          >
            <Lottie animationData={animationData} loop={true} />
          </div>
        </ShowAfterInterval>
      </SocketContextProvider>
    </ErrorBoundary>
  );
}

export default App;
