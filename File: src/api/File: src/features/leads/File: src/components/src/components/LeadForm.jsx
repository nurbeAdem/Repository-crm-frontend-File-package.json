import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createLead, patchLead } from '../features/leads/leadsSlice';


export default function LeadForm({ existing, onSaved }) {
const dispatch = useDispatch();
const [form, setForm] = useState(existing || {
customerName: '', category: 'Retail', primaryContact: { name: '', position: '', phone: '', email: '' }, secondaryContact: { name: '', position: '', phone: '', email: '' }, physicalAddress: ''
});


const handleChange = (path, value) => {
const newForm = { ...form };
const keys = path.split('.');
let ptr = newForm;
while (keys.length > 1) {
const k = keys.shift(); ptr[k] = ptr[k] || {}; ptr = ptr[k];
}
ptr[keys[0]] = value;
setForm(newForm);
};


const onSubmit = async (e) => {
e.preventDefault();
try {
if (existing && existing.id) {
await dispatch(patchLead(existing.id, { ...form, updatedAt: new Date().toISOString() }));
} else {
await dispatch(createLead({ ...form, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), status: 'new', flags: [], activities: [] }));
}
onSaved && onSaved();
} catch (err) {
aler
