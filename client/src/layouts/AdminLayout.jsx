import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import Footer from "../components/admin/Footer";
import { loadAdminAssets } from "../utils/loadAdminAssets";

const AdminLayout = () => {
    loadAdminAssets(); // ✅ Load admin assets on component mount
      
    
  return (
    <>
        <div className="sb-nav-fixed">
            <div id="layoutSidenav">
                <Header />
                <Sidebar />
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <Outlet />
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    </>
  );
};

export default AdminLayout;
