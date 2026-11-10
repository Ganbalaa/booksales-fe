import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/public"
import PublicLayout from "./layouts/public"
import Books from "./pages/public/books"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import AdminLayout from "./layouts/admin"
import Dashboard from "./pages/admin"
import AdminBooks from "./pages/admin/books"
import BookCreate from "./pages/admin/books/create"

import GenresIndex from "./pages/admin/genres/index"
import GenresCreate from "./pages/admin/genres/create"
import GenresEdit from "./pages/admin/genres/edit"

import AuthorsIndex from "./pages/admin/authors/index"
import AuthorsCreate from "./pages/admin/authors/create"
import AuthorsEdit from "./pages/admin/authors/edit" 

// 1. Import komponen ProtectedRoute yang baru dibuat
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes (Bisa diakses siapa saja) */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="books" element={<Books />} />
          </Route>

          {/* Auth (Bisa diakses siapa saja) */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* 
            2. ADMIN ROUTES BUNGKUS DENGAN PROTECTED ROUTE 
            Hanya user yang login dengan role 'admin' yang bisa lewat
          */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              
              <Route path="books">
                <Route index element={<AdminBooks />} />
                <Route path="create" element={<BookCreate />} />
              </Route>

              {/* Rute Genres (Index, Create, Edit) */}
              <Route path="genres">
                <Route index element={<GenresIndex />} />
                <Route path="create" element={<GenresCreate />} />
                <Route path="edit/:id" element={<GenresEdit />} /> 
              </Route>

              {/* Rute Authors (Index, Create, Edit) */}
              <Route path="authors">
                <Route index element={<AuthorsIndex />} />
                <Route path="create" element={<AuthorsCreate />} />
                <Route path="edit/:id" element={<AuthorsEdit />} /> 
              </Route>
            </Route>

          </Route>
          {/* Akhir dari Protected Route */}

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App