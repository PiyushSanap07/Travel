import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, MapPin, X, Loader2 } from 'lucide-react';
import { fetchPackages, createPackage, updatePackage, deletePackage } from '../../services/api';
import ImageUpload from '../../components/admin/ImageUpload';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

const EMPTY_FORM = {
    name: '', destinations: '', duration: '', price: '', image: '', category: 'heritage', emoji: '🗺️', status: 'active'
};

const ManagePackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [confirmId, setConfirmId] = useState(null); // ID pending delete

    const load = () => {
        setLoading(true);
        fetchPackages().then(data => { setPackages(data); setLoading(false); }).catch(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const openAdd = () => { setForm(EMPTY_FORM); setEditItem(null); setShowModal(true); };
    const openEdit = (pkg) => { setForm({ ...pkg }); setEditItem(pkg); setShowModal(true); };
    const closeModal = () => { setShowModal(false); setEditItem(null); };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (editItem) {
                await updatePackage(editItem.id, form);
            } else {
                await createPackage(form);
            }
            load();
            closeModal();
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = (id) => setConfirmId(id);
    const confirmDelete = async () => {
        await deletePackage(confirmId);
        setPackages(p => p.filter(x => x.id !== confirmId));
        setConfirmId(null);
    };

    const toggleStatus = async (pkg) => {
        const newStatus = pkg.status === 'active' ? 'hidden' : 'active';
        await updatePackage(pkg.id, { ...pkg, status: newStatus });
        setPackages(ps => ps.map(p => p.id === pkg.id ? { ...p, status: newStatus } : p));
    };

    const filtered = packages.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.destinations?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Tour Packages</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your holiday packages</p>
                </div>
                <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
                    <Plus size={18} /> Add New Package
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" placeholder="Search by name or destination..." value={searchTerm}
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
                                    <th className="py-4 px-6 font-medium">Package</th>
                                    <th className="py-4 px-6 font-medium">Price / Duration</th>
                                    <th className="py-4 px-6 font-medium">Status</th>
                                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                                {filtered.length === 0 ? (
                                    <tr><td colSpan="4" className="py-12 text-center text-gray-400">No packages found.</td></tr>
                                ) : filtered.map(pkg => (
                                    <tr key={pkg.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-4">
                                                <img src={pkg.image} alt={pkg.name} className="w-16 h-12 object-cover rounded-md shadow-sm" onError={e => e.target.src = 'https://via.placeholder.com/64x48'} />
                                                <div>
                                                    <div className="font-semibold text-gray-900">{pkg.emoji} {pkg.name}</div>
                                                    <div className="flex items-center text-xs text-gray-500 mt-1"><MapPin size={12} className="mr-1" />{pkg.destinations}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-medium text-gray-900">{pkg.price}</div>
                                            <div className="text-xs text-gray-500 mt-1">{pkg.duration}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${pkg.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${pkg.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                                {pkg.status === 'active' ? 'Live' : 'Hidden'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => toggleStatus(pkg)} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md" title={pkg.status === 'active' ? 'Hide' : 'Publish'}>
                                                    {pkg.status === 'active' ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                                <button onClick={() => openEdit(pkg)} className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-md"><Edit2 size={18} /></button>
                                                <button onClick={() => handleDelete(pkg.id)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add / Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900">{editItem ? 'Edit Package' : 'Add New Package'}</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={22} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            {[
                                { label: 'Package Name', key: 'name', placeholder: 'e.g. Golden Triangle Tour' },
                                { label: 'Destinations', key: 'destinations', placeholder: 'e.g. Delhi – Agra – Jaipur' },
                                { label: 'Duration', key: 'duration', placeholder: 'e.g. 5 Days / 4 Nights' },
                                { label: 'Price', key: 'price', placeholder: 'e.g. ₹15,999' },
                                { label: 'Emoji', key: 'emoji', placeholder: 'e.g. 🏛️' },
                            ].map(({ label, key, placeholder }) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <input
                                        type="text" value={form[key] || ''} placeholder={placeholder}
                                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                                    />
                                </div>
                            ))}
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Package Image</label>
                                <ImageUpload value={form.image} onChange={url => setForm(f => ({ ...f, image: url }))} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white">
                                    {['heritage', 'beach', 'mountain', 'adventure', 'wildlife', 'spiritual'].map(c => (
                                        <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 p-6 pt-0">
                            <button onClick={closeModal} className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
                            <button onClick={handleSave} disabled={saving} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-70 flex items-center justify-center gap-2">
                                {saving && <Loader2 size={16} className="animate-spin" />}
                                {editItem ? 'Save Changes' : 'Add Package'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom delete confirmation */}
            <ConfirmDialog
                open={confirmId !== null}
                title="Delete Package?"
                message="This package will be permanently removed. This action cannot be undone."
                confirmLabel="Delete Package"
                onConfirm={confirmDelete}
                onCancel={() => setConfirmId(null)}
            />
        </div>
    );
};

export default ManagePackages;
