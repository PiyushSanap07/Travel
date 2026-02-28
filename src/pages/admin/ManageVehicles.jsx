import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Loader2, Users, Briefcase } from 'lucide-react';
import { fetchVehicles, createVehicle, updateVehicle, deleteVehicle } from '../../services/api';
import ImageUpload from '../../components/admin/ImageUpload';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

const EMPTY_FORM = {
    name: '', model: '', seating: '', luggage: '', image: '', pricePerKm: '', category: 'small', status: 'available'
};

const ManageVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [confirmId, setConfirmId] = useState(null);

    const load = () => {
        setLoading(true);
        fetchVehicles().then(data => { setVehicles(data); setLoading(false); }).catch(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const openAdd = () => { setForm(EMPTY_FORM); setEditItem(null); setShowModal(true); };
    const openEdit = (v) => { setForm({ ...v }); setEditItem(v); setShowModal(true); };
    const closeModal = () => { setShowModal(false); setEditItem(null); };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (editItem) { await updateVehicle(editItem.id, form); }
            else { await createVehicle(form); }
            load();
            closeModal();
        } finally { setSaving(false); }
    };

    const handleDelete = (id) => setConfirmId(id);
    const confirmDelete = async () => {
        await deleteVehicle(confirmId);
        setVehicles(v => v.filter(x => x.id !== confirmId));
        setConfirmId(null);
    };

    const filtered = vehicles.filter(v =>
        v.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Fleet Management</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your vehicles and pricing</p>
                </div>
                <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
                    <Plus size={18} /> Add New Vehicle
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" placeholder="Search vehicles or categories..." value={searchTerm}
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
                                    <th className="py-4 px-6 font-medium">Vehicle</th>
                                    <th className="py-4 px-6 font-medium">Capacity</th>
                                    <th className="py-4 px-6 font-medium">Rate</th>
                                    <th className="py-4 px-6 font-medium">Status</th>
                                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                                {filtered.length === 0 ? (
                                    <tr><td colSpan="5" className="py-12 text-center text-gray-400">No vehicles found.</td></tr>
                                ) : filtered.map(v => (
                                    <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 bg-gray-50 rounded-md border border-gray-100 flex items-center justify-center overflow-hidden">
                                                    <img src={v.image} alt={v.name} className="h-full object-contain" onError={e => e.target.src = 'https://via.placeholder.com/64x48'} />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">{v.name}</div>
                                                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">{v.model}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex gap-3">
                                                <span className="flex items-center gap-1 text-gray-600" title="Seating"><Users size={14} className="text-gray-400" /> {v.seating}</span>
                                                <span className="flex items-center gap-1 text-gray-600" title="Luggage"><Briefcase size={14} className="text-gray-400" /> {v.luggage}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6"><div className="font-semibold text-gray-900">{v.pricePerKm}</div></td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${v.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {v.status === 'available' ? 'Available' : 'Maintenance'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openEdit(v)} className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-md"><Edit2 size={18} /></button>
                                                <button onClick={() => handleDelete(v.id)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900">{editItem ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={22} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            {[
                                { label: 'Vehicle Name', key: 'name', placeholder: 'e.g. Innova Crysta' },
                                { label: 'Model', key: 'model', placeholder: 'e.g. 6-7 Seater SUV' },
                                { label: 'Seating', key: 'seating', placeholder: 'e.g. 6-7 Passengers' },
                                { label: 'Luggage', key: 'luggage', placeholder: 'e.g. 4-5 Bags' },
                                { label: 'Price Per Km', key: 'pricePerKm', placeholder: 'e.g. ₹16-20/km' },
                            ].map(({ label, key, placeholder }) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <input type="text" value={form[key] || ''} placeholder={placeholder}
                                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" />
                                </div>
                            ))}
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Image</label>
                                <ImageUpload value={form.image} onChange={url => setForm(f => ({ ...f, image: url }))} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-400">
                                    {['small', 'family', 'group', 'large', 'luxury'].map(c => (
                                        <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-400">
                                    <option value="available">Available</option>
                                    <option value="maintenance">Maintenance</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 p-6 pt-0">
                            <button onClick={closeModal} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
                            <button onClick={handleSave} disabled={saving} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-70 flex items-center justify-center gap-2">
                                {saving && <Loader2 size={16} className="animate-spin" />}
                                {editItem ? 'Save Changes' : 'Add Vehicle'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmDialog
                open={confirmId !== null}
                title="Remove Vehicle?"
                message="This vehicle will be permanently removed from the fleet."
                confirmLabel="Remove Vehicle"
                onConfirm={confirmDelete}
                onCancel={() => setConfirmId(null)}
            />
        </div>
    );
};

export default ManageVehicles;
