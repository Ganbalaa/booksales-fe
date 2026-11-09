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

// 1. Import halaman Genres (Index, Create, Edit)
import GenresIndex from "./pages/admin/genres/index"
import GenresCreate from "./pages/admin/genres/create"
import GenresEdit from "./pages/admin/genres/edit"

// 2. Import halaman Authors (Index, Create, Edit)
import AuthorsIndex from "./pages/admin/authors/index"
import AuthorsCreate from "./pages/admin/authors/create"
import AuthorsEdit from "./pages/admin/authors/edit" 

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="books" element={<Books />} />
          </Route>

          {/* Auth */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Admin */}
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App