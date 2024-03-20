import './index.css'
import AddCounsellors from './_root/admin pages/AddCounsellors'
import { Route, Routes } from 'react-router-dom'

//private
import RootLayout from './_root/RootLayout'
//admin
import AdminLayout from './_root/admin pages/AdminLayout'
import AddBuddy from './_root/admin pages/AddBuddy'
import CreateGroup from './_root/admin pages/CreateGroup'

import ViewGroup from './_root/admin pages/ViewGroup'
import ViewCounsellor from './_root/admin pages/ViewCounsellor'
import ViewBuddy from './_root/admin pages/ViewBuddy'
import CreatePost from './_root/admin pages/CreatePost'
import Group from './_root/admin pages/Group'
import Counsellor from './_root/admin pages/Counsellor'
import Buddy from './_root/admin pages/Buddy'
import Post from './_root/admin pages/Post'
import Home from './_root/Home'
import EditGroups from './_root/admin pages/EditGroups'
import EditCounsellor from './_root/admin pages/EditCounsellor'
import EditBuddy from './_root/admin pages/EditBuddy'
import AuthLayout from './_auth/AuthLayout'
import LoginForm from './_auth/forms/LoginForm'
import RegisterForm from './_auth/forms/RegisterForm'

function App() {

  return (
    <main className='flex h-screen'>
        <Routes>
          {/*public routes*/}
          <Route element={<AuthLayout/>}>
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='/register' element={<RegisterForm/>}/>
          </Route>

          {/*private routes*/}
          <Route element={<RootLayout/>}>
              <Route element={<AdminLayout/>}>
                  <Route index path="/" element={<Home/>}/>
                  <Route path="/groups" element={<Group/>}/>
                  <Route path="/view-group" element={<ViewGroup/>}/>
                  <Route path="/create-group" element={<CreateGroup/>}/>
                  <Route path="/edit-group" element={<EditGroups/>}/>

                  <Route path="/counsellor" element={<Counsellor/>}/>
                  <Route path="/view-counsellor" element={<ViewCounsellor/>}/>
                  <Route path="/add-counsellor" element={<AddCounsellors/>}/>
                  <Route path="/edit-counsellor" element={<EditCounsellor/>}/>

                  <Route path="/buddy" element={<Buddy/>}/>
                  <Route path="/view-buddies" element={<ViewBuddy/>}/>
                  <Route path="/add-buddy" element={<AddBuddy/>}/>
                  <Route path="/edit-buddy" element={<EditBuddy/>}/>

                  <Route path="/posts" element={<Post/>}/>
                  <Route path="/create-post" element={<CreatePost/>}/>
                </Route>
          </Route>
        </Routes>
    </main>
  )
}

export default App
