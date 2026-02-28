import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, CheckCircle, XCircle, Loader2, Trash2 } from 'lucide-react';
import { fetchBookings, updateBookingStatus, deleteBooking } from '../../services/api';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmId, setConfirmId] = useState(null);

    const load = () => {
        setLoading(true);
        fetchBookings().then(data => { setBookings(data); setLoading(false); }).catch(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const handleStatus = async (id, status) => {
        await updateBookingStatus(id, status);
        setBookings(bs => bs.map(b => b.id === id ? { ...b, status } : b));
    };

    const handleDelete = (id) => setConfirmId(id);
    const confirmDelete = async () => {
        await deleteBooking(confirmId);
        setBookings(bs => bs.filter(b => b.id !== confirmId));
        setConfirmId(null);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    const filtered = bookings.filter(b =>
        b.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.pickup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.destination?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Booking Enquiries</h2>
                    <p className="text-sm text-gray-500 mt-1">Review and manage incoming customer requests</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 shadow-sm">
                    Total: {bookings.length}
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" placeholder="Search by name, pickup, or destination..." value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 text-sm focus:outline-none focus:border-blue-400 rounded-lg" />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="py-16 flex justify-center"><Loader2 className="animate-spin text-blue-500" size={32} /></div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="py-4 px-6 font-medium">Customer</th>
                                    <th className="py-4 px-6 font-medium">Trip Details</th>
                                    <th className="py-4 px-6 font-medium">Status</th>
                                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                                {filtered.length === 0 ? (
                                    <tr><td colSpan="4" className="py-12 text-center text-gray-400">No bookings found.</td></tr>
                                ) : filtered.map(b => (
                                    <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="font-medium text-gray-900">{b.customer_name}</div>
                                            <div className="text-xs text-gray-500 mt-1">{b.phone}</div>
                                            {b.email && <div className="text-xs text-gray-400">{b.email}</div>}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-1.5 text-gray-800 font-medium">
                                                <MapPin size={13} className="text-gray-400" /> {b.pickup} → {b.destination}
                                            </div>
                                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                                {b.travel_date && <span className="flex items-center gap-1"><Calendar size={12} />{b.travel_date}</span>}
                                                {b.vehicle_type && <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px]">{b.vehicle_type}</span>}
                                            </div>
                                            {b.message && <div className="text-xs text-gray-400 mt-1 italic">"{b.message}"</div>}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusClass(b.status)}`}>
                                                {b.status?.charAt(0).toUpperCase() + b.status?.slice(1) || 'Pending'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {b.status !== 'confirmed' && (
                                                    <button onClick={() => handleStatus(b.id, 'confirmed')}
                                                        className="p-1.5 text-green-600 hover:bg-green-50 border border-green-200 rounded-md text-xs font-medium flex items-center gap-1">
                                                        <CheckCircle size={13} /> Confirm
                                                    </button>
                                                )}
                                                {b.status !== 'cancelled' && (
                                                    <button onClick={() => handleStatus(b.id, 'cancelled')}
                                                        className="p-1.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-md text-xs font-medium flex items-center gap-1">
                                                        <XCircle size={13} /> Cancel
                                                    </button>
                                                )}
                                                <button onClick={() => handleDelete(b.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md">
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <ConfirmDialog
                open={confirmId !== null}
                title="Delete Booking?"
                message="This booking enquiry will be permanently deleted and cannot be recovered."
                confirmLabel="Delete Booking"
                onConfirm={confirmDelete}
                onCancel={() => setConfirmId(null)}
            />
        </div>
    );
};

export default ManageBookings;
