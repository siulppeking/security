import React, { useState } from 'react'
import { publicApi } from '../../apis/publicApi';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../contexts/AuthContext';
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';


const LoginPage = () => {

  const { checkUser, contador, incrementar, decrementar, reset } = useAuth();
  const navigate = useNavigate();

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

      if (response.data.type === 'success') {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem('access_token', token);
        localStorage.setItem('refresh_token', response.data.refreshToken);

        await checkUser();

        const lastPath = localStorage.getItem('lastPath') || '/admin';
        navigate(lastPath, { replace: true });
      }
    } catch (error) {
      console.log('Error:', error);
      if (error.response.data.type === 'unauthorized') {
        alert(error.response.data.message);
      }
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

      <Link to={'/perfil'}>Perfil</Link> <br />
      <Link to={'/admin'}>Admin</Link>
      <h4>{contador}</h4>
      <button type='button' disabled={contador == 0} onClick={decrementar}>Decrementar</button>
      <button type='button' disabled={contador == 0} onClick={reset}>Reset</button>
      <button type='button' onClick={incrementar}>Incrementar</button>
    </form>
  )
}

export default LoginPage