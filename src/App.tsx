import { useSelector } from 'react-redux';
import './App.css';
import { OverlayLoader } from './components/OverlayLoader/OverlayLoader';
import RouteDefinitions from './components/Routes/RouteDefinitions';
import Footer from './layouts/Footer/Footer';
import Navi from './layouts/Navi/Navi';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';



function App() {
  const authState = useSelector((state: any) => state.auth);
  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const lastPathSegment = pathArray[pathArray.length - 1];

  return (
    <div className={
      authState.isAuthenticated &&
        (
          lastPathSegment !== "katalog" &&
          lastPathSegment !== "hakkimizda" &&
          lastPathSegment !== "bireyler-icin" &&
          lastPathSegment !== "kurumlar-icin" &&
          lastPathSegment !== "blog" &&
          lastPathSegment !== "basinda-biz" &&
          lastPathSegment !== "takvim-anasayfa" &&
          lastPathSegment !== "codecademy" &&
          lastPathSegment !== ""
        ) ||
        lastPathSegment?.includes("giris") ||
        pathArray?.includes("sifremi-unuttum") ||
        pathArray?.includes("reset-password") ||
        lastPathSegment?.includes("kayit-ol") ? "App bg-front-white" : "App bg-front-dark"}


      style={lastPathSegment === "katalog" ? { marginTop: '11rem' } : { marginTop: '0' }} >
      <>
        <ToastContainer />
        <Navi />
        <OverlayLoader />
        <RouteDefinitions />
        <Footer />

      </>
    </div>
  );
}

export default App;
