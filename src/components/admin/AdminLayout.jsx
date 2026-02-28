import React, { useState, Suspense } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Map,
    Car,
    CalendarCheck,
    Menu,
    X,
    LogOut,
    ExternalLink
} from 'lucide-react';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
        { name: 'Tour Packages', path: '/admin/packages', icon: <Map size={20} /> },
        { name: 'Vehicles', path: '/admin/vehicles', icon: <Car size={20} /> },
        { name: 'Bookings', path: '/admin/bookings', icon: <CalendarCheck size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 bg-white border-r border-gray-200 z-50 w-64 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 lg:static lg:inset-auto flex flex-col`}
            >
                {/* Logo Area */}
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <span className="text-xl font-bold">
                        <span className="text-india-blue-700">XYZ</span>
                        <span className="text-india-saffron-500"> Admin</span>
                    </span>
                    <button
                        className="ml-auto lg:hidden text-gray-500 hover:text-gray-700"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
                        Menu
                    </div>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (item.path !== '/admin' && location.pathname.startsWith(item.path));

                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive
                                    ? 'bg-india-blue-50 text-india-blue-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <span className={isActive ? 'text-india-blue-600' : 'text-gray-400'}>
                                    {item.icon}
                                </span>
                                {item.name}
                            </NavLink>
                        );
                    })}
                </div>

                {/* Footer Sidebar */}
                <div className="p-4 border-t border-gray-100">
                    <a
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                    >
                        <ExternalLink size={20} className="text-gray-400" />
                        View Live Site
                    </a>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium">
                        <LogOut size={20} className="text-red-400" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Topbar */}
                <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-gray-200 bg-white shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            className="text-gray-500 hover:text-gray-700 lg:hidden p-1 rounded-md hover:bg-gray-100"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">
                            {navItems.find(item => location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path)))?.name || 'Admin Panel'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-india-blue-100 text-india-blue-700 flex items-center justify-center font-bold text-sm">
                                A
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold text-gray-700">Admin User</p>
                                <p className="text-xs text-gray-500">Travels Owner</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content View */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
                    <Suspense fallback={
                        <div className="flex h-full items-center justify-center">
                            <div className="w-8 h-8 border-4 border-india-blue-200 border-t-india-blue-600 rounded-full animate-spin"></div>
                        </div>
                    }>
                        <Outlet />
                    </Suspense>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
