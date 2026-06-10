import api from './client';

export const getOutfits = () =>
  api.get('/outfits').then(r => r.data.outfits);

export const saveOutfit = (top_id, bottom_id, outer_id = null, shoes_id = null, accessory_id = null) =>
  api.post('/outfits', { top_id, bottom_id, outer_id, shoes_id, accessory_id }).then(r => r.data.outfit);

export const deleteOutfit = (id) =>
  api.delete(`/outfits/${id}`);
