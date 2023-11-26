import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FormUser from "./pages/FormUser";
import Login from "./pages/Login";
import Layout from "./layouts/Layout";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <div className="dark:bg-slate-900 bg-slate-50 min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/create" element={<FormUser isEdit={false} />} />
            <Route path="/edit/:id" element={<FormUser isEdit={true} />} />
          </Route>
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
