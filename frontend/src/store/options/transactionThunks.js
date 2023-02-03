import axios from 'axios';
import { setCategoriesList, setTransactions, startGettingAccounts, setDashboard } from './';

export const startGettingCategories  = () => {

    return async( dispatch ) => {
        const result = await getCategories();

       if ( !result.ok ) return result;
       dispatch( setCategoriesList( result.data ));

    }
}

export const getCategories = async () => {
    try {
        const axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_APP_API_URL
          });
          
      const response = await axiosInstance.get('/category');
      response.data.ok = true;
      return response.data;
    } catch (error) {
        const response = { ok: false};
      return response;
    }
  };

  export const startGettingDashboard = (token, customer_id) => {

    return async( dispatch ) => {
        const result = await getDashboard(token, customer_id);
       if ( !result.ok ) return result;
       dispatch( setDashboard( result ));

    }
}

export const getDashboard = async (token, customer_id) => {
    try {
        const axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_APP_API_URL,
            headers: {
                'Authorization': `Bearer ${token}`
              }
          });
        const response = await axiosInstance.get('/dashboard', {params: {customer_id}
        });
      response.data.ok = true;
      return response.data;
    } catch (error) {
        const response = { ok: false};
      return response;
    }
  };

export const startGettingTransactions = (token, customer_id, filters) => {
    return async( dispatch ) => {
        const result = await getTransactions(customer_id, filters);

       if ( !result.ok ) return result;
       dispatch( setTransactions( result.data ));

    }
}

export const getTransactions = async (customer_id, filters) => {
    try {
        const axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_APP_API_URL
          });
          console.log('FILTESR SENDING');
          console.log(filters);
      const response = await axiosInstance.get(`/transaction/${customer_id}`, {params: {filters}});
      response.data.ok = true;
      return response.data;
    } catch (error) {
        const response = { ok: false};
      return response;
    }
  };

export const startCreatingTransaction = (token, customer_id, account_id, category_id, transaction_type, transaction_amount) => {
    return async (dispatch) => {
        const result = await createTransaction(token, account_id, category_id, transaction_type, transaction_amount);

        if (!result.ok) return result;
        dispatch (startGettingTransactions(token, customer_id));
        dispatch (startGettingAccounts(token, customer_id));
        }
    };

    

export const createTransaction = async (token, account_id, category_id, transaction_type, transaction_amount) => {
    try {
        const axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_APP_API_URL,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          const float_amount = parseFloat(transaction_amount);
      const response = await axiosInstance.post('/transaction', {
        account_id,
        category_id,
        transaction_type,
        transaction_amount: float_amount
      });
      response.data.ok = true;
      return response.data;
    } catch (error) {
        const response = { ok: false};
      return response;
    }
  };

  export const startCreatingTranfer = (token, customer_id, receiver, sender, amount) => {
    return async (dispatch) => {
        const result = await createTransfer(token, receiver, sender, amount);

        if (!result.ok) return result;
        dispatch (startGettingTransactions(token, customer_id));
        dispatch (startGettingAccounts(token, customer_id));
        }
    };

export const createTransfer  = async (token, receiver, sender, amount) => {
    try {
        const axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_APP_API_URL,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const float_amount = parseFloat(amount);
      const response = await axiosInstance.post('/transfer', {
        receiver,
        sender,
        amount: float_amount
      });
      response.data.ok = true;
      return response.data;
    } catch (error) {
        const response = { ok: false};
      return response;
    }
  };

  export const startDeletingTransaction = (token, customer_id, id) => {
    return async (dispatch) => {
        const result = await deleteTransaction(token, id);

        if (!result.ok) return result;
        dispatch (startGettingTransactions(token, customer_id));
        dispatch (startGettingAccounts(token, customer_id));
    }
}

  export const deleteTransaction = async (token, id) => {
    try {
        const axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_APP_API_URL,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
      const response = await axiosInstance.delete('/transaction', { data: { id: id } });
      response.data.ok = true;
      return response.data;
    } catch (error) {
        const response = { ok: false};
      return response;
    }
  };
  
  /*
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
  };*/