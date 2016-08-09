export const get = (name) => JSON.parse(localStorage.getItem(name));

export const set = (name, obj) => localStorage.setItem(name, JSON.stringify(obj));
