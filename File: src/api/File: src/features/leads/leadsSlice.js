import api from '../../api/api';


const initialState = { items: [], loading: false, error: null };
const FETCH_START = 'leads/fetch_start';
const FETCH_SUCCESS = 'leads/fetch_success';
const FETCH_FAIL = 'leads/fetch_fail';
const ADD_LEAD = 'leads/add';
const UPDATE_LEAD = 'leads/update';
const DELETE_LEAD = 'leads/delete';


export default function leadsReducer(state = initialState, action) {
switch (action.type) {
case FETCH_START: return { ...state, loading: true, error: null };
case FETCH_SUCCESS: return { ...state, loading: false, items: action.payload };
case FETCH_FAIL: return { ...state, loading: false, error: action.payload };
case ADD_LEAD: return { ...state, items: [...state.items, action.payload] };
case UPDATE_LEAD: return { ...state, items: state.items.map(l => l.id === action.payload.id ? action.payload : l) };
case DELETE_LEAD: return { ...state, items: state.items.filter(l => l.id !== action.payload) };
default: return state;
}
}


export const fetchLeads = () => async dispatch => {
dispatch({ type: FETCH_START });
try {
const res = await api.get('/leads');
dispatch({ type: FETCH_SUCCESS, payload: res.data });
} catch (err) {
dispatch({ type: FETCH_FAIL, payload: err.message });
}
};


export const createLead = (lead) => async dispatch => {
try {
const res = await api.post('/leads', lead);
dispatch({ type: ADD_LEAD, payload: res.data });
return res.data;
} catch (err) { throw err; }
};


export const patchLead = (id, patch) => async dispatch => {
try {
const res = await api.patch(`/leads/${id}`, patch);
dispatch({ type: UPDATE_LEAD, payload: res.data });
return res.data;
} catch (err) { throw err; }
};


export const deleteLead = (id) => async dispatch => {
try { await api.delete(`/leads/${id}`); dispatch({ type: DELETE_LEAD, payload: id }); } catch (err) { throw err; }
};
