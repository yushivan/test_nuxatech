import { useApi } from '~/server/API';

const api = useApi();

export async function userLogin(email: string, password: string) {
  try {
    const data = { email, password };
    const response = await api.post('/login', data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function userRegister(email: string, password: string) {
  try {
    const data = { email, password };
    const response = await api.post('/register', data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function userUpdate(id: number, first_name: string, last_name: string) {
  try {
    const data = { first_name, last_name };
    const response = await api.patch(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function userDelete(id: number) {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getListUser(page = 1) {
  try {
    const response = await api.get(`/users?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching info:', error);
    throw error;
  }
}

export async function getDetailUser() {
  try {
    const response = await api.get('/users');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching info:', error);
    throw error;
  }
}
