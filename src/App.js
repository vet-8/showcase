import Home from "./pages/Home";
import { Switch, Route, withRouter, HashRouter } from "react-router-dom";
import SearchClinic from "./pages/SearchClinic";
import Register from "./components/Register";
import BookingDetails from "./pages/BookingDetails";
import BookingResume from "./pages/BookingResume";
import Dokter from "./pages/Dokter";
import User from "./pages/EditUser";
import KlinikAdmin from "./pages/EditClinic";
import Chat from "./pages/chat/components/Chat/Chat";
import Join from "./pages/chat/components/Join/Join";
import Login from "./components/Login";
import Role from "./components/Role";
import UserHistory from "./pages/UserHistory"; //
import EditClinic from "./pages/EditClinic";
import EditDoctor from "./pages/EditDoctor";
import EditUser from "./pages/EditUser";
import ManageDoctor from "./pages/ManageDoctor";
import ForUserEdit from "./pages/ForUserEdit";
// import ForUserHistory from './pages/ForUserHistory'
import EditProfileClinic from './pages/EditProfileClinic'
import ChatDashboard from './pages/chat-firebase/Dashboard/dashboard'
import ChatDashboardNew from './pages/chat-firebase/Dashboard/dashboardNew'


function App() {
  return (
    <HashRouter basename="/">
      <div className="App">
        <Switch>
          <Route path="/dokter">
            <Dokter />
          </Route>

          <Route path="/user">
            <User />
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
          <Route path="/klinik-admin">
            <KlinikAdmin />
          </Route>
          <Route path="/edituser">
            <EditUser />
          </Route>
          <Route path="/editdoctor">
            <EditDoctor />
          </Route>
          <Route path="/editclinic">
            <EditClinic />
          </Route>
          {/* <Route path="/userhistory">
            <UserHistory />
          </Route> */}
          <Route path="/managedoctor">
            <ManageDoctor />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/chat-start" exact component={Join} />
          <Route path="/chat" component={Chat} />
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

// // versi mas Frey
// import Home from "./pages/Home";
// import Dokter from "./pages/Dokter";
// import SearchClinic from "./pages/SearchClinic";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import Role from "./components/Role";
// import { Switch, Route, withRouter } from "react-router-dom";

// // import BookingDetails from "./pages/BookingDetails";
// // import BookingResume from "./pages/BookingResume";
// import User from "./pages/EditUser";
// import KlinikAdmin from "./pages/EditClinic";
// // import Chat from './pages/chat/components/Chat/Chat';
// // import Join from './pages/chat/components/Join/Join';

// import UserHistory from "./pages/UserHistory";
// import EditClinic from "./pages/EditClinic";
// import EditDoctor from "./pages/EditDoctor";
// import EditUser from "./pages/EditUser";
// import ManageDoctor from "./pages/ManageDoctor";

// function App() {
//   return (
//     <div className="App">
//       <Switch>
//         <Route path="/user">
//           <User />
//         </Route>
//         {/* <Route exact path="/book-clinic/:id">
//           <BookingDetails />
//         </Route>
//         <Route exact path="/book-resume">
//           <BookingResume />
//         </Route> */}
//         <Route path="/klinik-admin">
//           <KlinikAdmin />
//         </Route>
//         <Route path="/edituser">
//           <EditUser />
//         </Route>
//         <Route path="/editdoctor">
//           <EditDoctor />
//         </Route>
//         <Route path="/editclinic">
//           <EditClinic />
//         </Route>
//         <Route path="/userhistory">
//           <UserHistory />
//         </Route>
//         <Route path="/managedoctor">
//           <ManageDoctor />
//         </Route>
//         {/* <Route path="/chat-start" exact component={Join} /> */}
//         {/* <Route path="/chat" component={Chat} /> */}
//         <Route exact path="/login">
//           <Login />
//         </Route>
//         <Route exact path="/register/input">
//           <Register />
//         </Route>
//         <Route exact path="/register">
//           <Role />
//         </Route>
//         <Route path="/dokter">
//           <Dokter />
//         </Route>
//         <Route path="/klinik">
//           <SearchClinic />
//         </Route>
//         <Route exact path="/">
//           <Home />
//         </Route>
//       </Switch>
//     </div>
//   );
// }

// export default withRouter(App);
