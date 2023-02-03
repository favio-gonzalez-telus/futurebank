import { setActiveOption, setItemlist } from './';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import useId from '@mui/material/utils/useId';

export const startCreatingAcount = (token, account_name, customer_id, currency_id) => {
    return async (dispatch) => {
        const result = await createAccount(token, account_name, customer_id, currency_id);

        if (!result.ok) return result;
        dispatch (startGettingAccounts(token, customer_id));
    }
}

export const startUpdatingAcount = (token, customer_id, account_id, account_name) => {
    return async (dispatch) => {
        const result = await updateAccount(token, account_id, account_name);

        if (!result.ok) return result;
        dispatch (startGettingAccounts(token, customer_id));
    }
}

export const startDeletingAcount = (token, customer_id, id) => {
    return async (dispatch) => {
        const result = await deleteAccount(token, id);

        if (!result.ok) return result;
        dispatch (startGettingAccounts(token, customer_id));
    }
}

export const startGettingAccounts = (token, uid) => {

    return async( dispatch ) => {
        const result = await getAccounts(token, uid);

       if ( !result.ok ) return result;
       dispatch( setItemlist( result.data ));

    }
}

export const createAccount = async (token, account_name, customer_id, currency_id) => {
    try {
        const axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_APP_API_URL,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
      const response = await axiosInstance.post('/account', {
        name: account_name,
        customer_id,
        currency_id
      });
      response.data.ok = true;
      return response.data;
    } catch (error) {
        const response = { ok: false};
      return response;
    }
  };

  
export const updateAccount = async (token, id, name) => {
    try {
        const axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_APP_API_URL,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
      const response = await axiosInstance.put('/account', {
        id,
        name
      });
      response.data.ok = true;
      return response.data;
    } catch (error) {
        const response = { ok: false};
      return response;
    }
  };

  export const deleteAccount = async (token, id) => {
      try {
          const axiosInstance = axios.create({
              baseURL: import.meta.env.VITE_APP_API_URL,
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
        const response = await axiosInstance.delete('/account', { data: { id: id } });
        response.data.ok = true;
        return response.data;
      } catch (error) {
          const response = { ok: false};
        return response;
      }
    };

  export const getAccounts = async (token, uid) => {
    try {
        const axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_APP_API_URL,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
      const response = await axiosInstance.get('/account/' + uid);
      response.data.ok = true;
      return response.data;
    } catch (error) {
        const response = { ok: false};
      return response;
    }
  };