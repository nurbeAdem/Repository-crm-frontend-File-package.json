import React from 'react';
import * as XLSX from 'xlsx';
import { useDispatch } from 'react-redux';
import { createLead } from '../features/leads/leadsSlice';


export default function LeadUpload() {
const dispatch = useDispatch();


const handleFile = async (e) => {
const file = e.target.files[0]; if (!file) return;
const data = await file.arrayBuffer();
const workbook = XLSX.read(data);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });


for (const row of json) {
const lead = {
customerName: row['Customer Name'] || row['customerName'] || '',
category: row['Category'] || 'Retail',
primaryContact: {
name: row['Primary Contact Name'] || '',
position: row['Primary Contact Position'] || '',
phone: row['Primary Phone'] || '',
email: row['Primary Email'] || ''
},
secondaryContact: {
name: row['Secondary Contact Name'] || '',
position: row['Secondary Contact Position'] || '',
phone: row['Secondary Phone'] || '',
email: row['Secondary Email'] || ''
},
physicalAddress: row['Address'] || '',
status: 'new',
flags: [],
activities: [],
createdAt: new Date().toISOString(),
updatedAt: new Date().toISOString()
};
try { await dispatch(createLead(lead)); } catch (err) { console.error('Upload error', err); }
}
alert('Upload finished.');
};


return (
<div className="card p-3 mb-3">
<h5>Bulk Upload Leads (Excel)</h5>
<input type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} className="form-control" />
<small className="form-text text-muted">Use template columns: Customer Name, Category, Primary Contact Name, Primary Phone, Primary Email, Secondary Contact Name, Secondary Phone, Address</small>
</div>
);
}
