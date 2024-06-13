import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../context/AuthContext";
export default function AppLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={"/signIn"} />;
  }
  return (
    <>
      {/*HEADER_STARTS  */}
      <div className="fixed top-0 z-20  w-full bg-white ">
        <Header />
      </div>
      {/* HEADER_ENDS */}

      {/* MAIN_OUTLET STARTS  */}
      <main>
        <Outlet />
      </main>
      {/* MAIN_OUTLET ENDS  */}

      {/* FOOTER_STARTS */}

      <div className="  fixed bottom-0 h-12 w-full sm:hidden">
        <Footer />
      </div>
      {/* FOOTER_ENDS */}
    </>
  );
}
//  <div className="custom-scroll mb-16  mt-[4.5rem] lg:mt-20">
//    <div className="mx-auto max-w-7xl max-lg:max-w-4xl  ">
//      <Outlet />
//    </div>
//  </div>;
