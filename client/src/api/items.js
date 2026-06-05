import api from './client';

export const getItems = (category) =>
  api.get('/items', { params: category ? { category } : {} }).then(r => r.data.items);

export const uploadItem = (formData) =>
  api.post('/items', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(r => r.data.item);

export const deleteItem = (id) =>
  api.delete(`/items/${id}`);
