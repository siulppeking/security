import React, { useState } from 'react'
import { publicApi } from '../../apis/publicApi';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../contexts/AuthContext';
import { jwtDecode } from "jwt-decode";


const LoginPage = () => {

  const { contador, incrementar, decrementar, reset } = useAuth();

  const { values, handlerInputChange, reset: onReset } = useForm({
    username: '',
    clave: ''
  });

  const [token, setToken] = useState('');

  const [loading, setLoading] = useState(false);


  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await publicApi.post('/api/auth/login', values);
      if (response.data.type === 'unauthorized') {
        alert(response.data.message)
      }
      if (response.data.type === 'success') {
        setToken(response.data.token)
        localStorage.setItem('access_token', response.data.token);
        localStorage.setItem('refresh_token', response.data.refreshToken);
      }
    } catch (error) {
      console.log('Error: ' + error);
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    localStorage.clear();
    setToken('');
    onReset();
  }

  return (
    <form onSubmit={handlerSubmit}>
      <label>Usuario</label>
      <input type="text" name='username' value={values.username} onChange={handlerInputChange} autoComplete='off' />
      <br />

      <label>Clave</label>
      <input type="password" name='clave' value={values.clave} onChange={handlerInputChange} autoComplete='off' />
      <br />

      <input type="submit" disabled={loading} value={loading ? 'Cargando...' : 'Ingresar'} />
      <br />
      <br />
      {
        token !== '' && <button type='button' onClick={logout}>Logout</button>
      }
      {
        token !== '' && JSON.stringify(jwtDecode(token), null, 2)
      }

      <h4>{contador}</h4>
      <button type='button' disabled={contador == 0} onClick={decrementar}>Decrementar</button>
      <button type='button' disabled={contador == 0} onClick={reset}>Reset</button>
      <button type='button' onClick={incrementar}>Incrementar</button>
    </form>
  )
}

export default LoginPage