import { Route, Routes } from 'react-router-dom';
import Homepage from '../../pages/Homepage/Homepage'
import AboutUs from '../../pages/AboutUs/AboutUs'
import ForInstitutionsPage from '../../pages/ForInstitutionsPage/ForInstitutionsPage'
import PlatformPage from '../../pages/PlatformPage/PlatformPage'
import ApplicationCard from '../../components/ApplicationCard/ApplicationCard'
import { ForIndividuals } from '../../pages/ForIndividuals/ForIndividuals';
import Calendar from '../../pages/Calendar/Calendar';
import Profile from '../../pages/Profile/Profile';
import LoginPage from '../../pages/LoginPage/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import CatalogPage from '../../pages/CatalogPage/CatalogPage';
import SignUp from '../../pages/SignUp/SignUp';
import Blog from '../../pages/Blog/Blog';
import MediaNews from '../../pages/MediaNews/MediaNews';
import Codecademy from '../../pages/Codecademy/Codecademy';
import AssesmentsPage from '../../pages/AssesmentsPage/AssesmentsPage';
import EducationsPage from '../../pages/EducationsPage/EducationsPage';
import EducationProgramContent from '../../pages/EducationProgramContent/EducationProgramContent';
import CertificatePage from '../../pages/CertificatePage/CertificatePage';
import SkillPage from '../../pages/SkillPage/SkillPage';
import SocialMediaPage from '../../pages/SocialMediaPage/SocialMediaPage';
import LanguagePage from '../../pages/LanguagePage/LanguagePage';
import PersonalInformationPage from '../../pages/PersonalInformationPage/PersonalInformationPage';
import AnalysisReport from '../../pages/AnalysisReport/AnalysisReport';
import SessionsPage from '../../pages/SessionsPage/SessionsPage';
import AdminPanel from '../../pages/AdminPanel/AdminPanel';
import EducationalBackgroundPage from '../../pages/EducationalBackgroundPage/EducationalBackgroundPage';
import MyExperiences from '../../pages/MyExperiences/MyExperiences';
import AnnouncementsPage from '../../pages/AnnouncementsPage/AnnouncementsPage';
import SettingsPage from '../../pages/SettingsPage/SettingsPage';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import NotFound from '../../pages/NotFound/NotFound';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import AdminProtectedRoute from './AdminProtectedRoute';
import AnnouncementPanel from '../../pages/AdminPanel/AnnouncementPanel/AnnouncementPanel';
import EducationPanel from '../../pages/AdminPanel/EducationPanel/EducationPanel';
import LessonPanel from '../../pages/AdminPanel/LessonPanel/LessonPanel';
import RolePanel from '../../pages/AdminPanel/RolePanel/RolePanel';
import SessionPanel from '../../pages/AdminPanel/SessionPanel/SessionPanel';
import StudentPanel from '../../pages/AdminPanel/StudentPanel/StudentPanel';
import UserPanel from '../../pages/AdminPanel/UserPanel/UserPanel';


type Props = {}

const RouteDefinitions = (props: Props) => {
    return (
        <Routes>
            <Route path="*" Component={NotFound} />
            <Route path="/" Component={Homepage} />
            <Route path="/hakkimizda" Component={AboutUs} />
            <Route path="/kurumlar-icin" Component={ForInstitutionsPage} />
            <Route path="/bireyler-icin" Component={ForIndividuals} />
            <Route path="/takvim-anasayfa" Component={Calendar} />
            <Route path="/takvim" Component={Calendar} />
            <Route path="/platform" element={<ProtectedRoute><PlatformPage /></ProtectedRoute>} />
            <Route path="/basvuru" Component={ApplicationCard} />
            <Route path="/profilim" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/blog" Component={Blog} />
            <Route path="/basinda-biz" Component={MediaNews} />
            <Route path="/giris" Component={LoginPage} />
            <Route path="/kayit-ol" Component={SignUp} />
            <Route path="/katalog" Component={CatalogPage} />
            <Route path="/codecademy" Component={Codecademy} />
            <Route path="/platform-katalog" Component={CatalogPage} />
            <Route path="/degerlendirmeler" Component={AssesmentsPage} />
            <Route path="/egitimlerim" Component={EducationsPage} />
            <Route path="/duyurular" Component={AnnouncementsPage} />
            <Route path="/profilim/profilimi-duzenle/sertifikalarim" element={<ProtectedRoute><CertificatePage /></ProtectedRoute>} />
            <Route path="/profilim/profilimi-duzenle/yetkinliklerim" element={<ProtectedRoute><SkillPage /></ProtectedRoute>} />
            <Route path="/profilim/profilimi-duzenle/medya-hesaplarim" element={<ProtectedRoute><SocialMediaPage /></ProtectedRoute>} />
            <Route path="/profilim/profilimi-duzenle/yabanci-dil" element={<ProtectedRoute><LanguagePage /></ProtectedRoute>} />
            <Route path="/profilim/profilimi-duzenle/kisisel-bilgilerim" element={<ProtectedRoute><PersonalInformationPage /></ProtectedRoute>} />
            <Route path="/profilim/profilimi-duzenle/egitim-hayatim" element={<ProtectedRoute><EducationalBackgroundPage /></ProtectedRoute>} />
            <Route path="/profilim/profilimi-duzenle/deneyimlerim" element={<ProtectedRoute><MyExperiences /></ProtectedRoute>} />
            <Route path="/egitimlerim/egitim-detaylari/:educationProgramId" element={<EducationProgramContent></EducationProgramContent>} />
            <Route path="/profilim/degerlendirmeler/rapor/tobeto-iste-basari-yetkinlikleri/1" element={<ProtectedRoute><AnalysisReport /></ProtectedRoute>} />
            <Route path="/profilim/profilimi-duzenle/deneyimlerim" element={<ProtectedRoute><MyExperiences /></ProtectedRoute>} />
            <Route path="/profilim/profilimi-duzenle/ayarlar" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

            <Route path="/admin-panel" element={<AdminProtectedRoute><StudentPanel /></AdminProtectedRoute>} />
            <Route path="/admin-panel/ogrenciler" element={<AdminProtectedRoute><StudentPanel /></AdminProtectedRoute>} />
            <Route path="/admin-panel/dersler" element={<AdminProtectedRoute><LessonPanel /></AdminProtectedRoute>} />
            <Route path="/admin-panel/duyurular" element={<AdminProtectedRoute><AnnouncementPanel /></AdminProtectedRoute>} />
            <Route path="/admin-panel/egitimler" element={<AdminProtectedRoute><EducationPanel /></AdminProtectedRoute>} />
            <Route path="/admin-panel/oturumlar" element={<AdminProtectedRoute><SessionPanel /></AdminProtectedRoute>} />
            <Route path="/admin-panel/roller" element={<AdminProtectedRoute><RolePanel /></AdminProtectedRoute>} />
            <Route path="/admin-panel/kullanicilar" element={<AdminProtectedRoute><UserPanel /></AdminProtectedRoute>} />
            <Route path="/sifremi-unuttum" Component={ForgotPassword} />
            <Route path="/reset-password/:userId/:resetToken" Component={ResetPassword} />


        </Routes >
    )
}
export default RouteDefinitions;
