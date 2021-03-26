import Home from "./pages/public-all/home/Home";
import { Switch, Route, withRouter, HashRouter } from "react-router-dom";
import SearchClinic from "./pages/public-all/search/SearchClinic";
import Register from "./pages/public-all/login-reigster/Register";
import BookingDetails from "./pages/patient/booking/BookingDetails";
import BookingResume from "./pages/patient/booking-resume/BookingResume";
import Dokter from "./pages/veterinarian/Dokter";
import Login from "./pages/public-all/login-reigster/Login";
import Role from "./pages/public-all/login-reigster/Role";
import UserHistory from "./pages/patient/user-profile/UserHistory";
import EditDoctor from "./pages/veterinarian/edit-profil/EditDoctor";
import ManageDoctor from "./pages/admin/manage-doctor/ManageDoctor";
import ForUserEdit from "./pages/patient/user-profile/edit-profil/ForUserEdit";
import EditProfileClinic from './pages/admin/edit-profil/EditProfileClinic'
import ChatDashboard from './pages/public-all/chat-firebase/Dashboard/dashboard'
import ChatDashboardNew from './pages/public-all/chat-firebase/Dashboard/dashboardNew'


function App() {
  return (
    <HashRouter basename="/">
      <div className="App">
        <Switch>
          <Route path="/dokter">
            <Dokter />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/klinik">
            <SearchClinic />
          </Route>
          <Route exact path="/book-clinic/:id">
            <BookingDetails />
          </Route>
          <Route exact path="/book-resume">
            <BookingResume />
          </Route>
          <Route path="/editdoctor">
            <EditDoctor />
          </Route>
          <Route path="/managedoctor">
            <ManageDoctor />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/register/input">
            <Register />
          </Route>
          <Route exact path="/register">
            <Role />
          </Route>
          <Route exact path="/foruser/edit-profile">
            <ForUserEdit />
          </Route>
          <Route exact path="/forclinic/edit-profile">
            <EditProfileClinic />
          </Route>
          <Route exact path="/foruser/appointments">
            <UserHistory />
          </Route>
          <Route exact path = '/chat-dashboard'>
            <ChatDashboard/>
          </Route>
          <Route exactpath = '/chat-dashboard/new-chat'>
            <ChatDashboardNew/>
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default withRouter(App);
