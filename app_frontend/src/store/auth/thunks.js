import { loginWithEmailPassword, registerUserWithEmailPassword, singInWithGoogle, logoutFirebase } from '../../firebase/providers';
import { checkingCredentials, logout, login } from './';

import axios from 'axios';

export const checkingAuthentication = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await registerService(email, password, displayName, displayName);
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ))

    }

}


export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await loginService(email, password);

        if ( !result.ok ) return dispatch( logout( result ) );
        dispatch( login( result ));

    }
}

export const loginService = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/login`, {
        email,
        password,
      });
      if (response.data && response.data.person_token) {
        response.data.ok = true;
      }
      response.data.displayName = response.data.first_name;
      response.data.token = response.data.person_token;
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const registerService = async (email, password, first_name, last_name) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/register`, {
        email,
        password,
        first_name,
        last_name
      });
      if (response.data && response.data.email) {
        response.data.ok = true;
      } 
      return response.data;
    } catch (error) {
        const result = {
            ok: false
        }
        return result;
    }
  };
  


export const startLogout = () => {
    return async( dispatch ) => {
        
        await logoutFirebase();

        dispatch( logout() );

    }
}

