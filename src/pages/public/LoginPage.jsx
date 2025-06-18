import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { publicApi } from '../../apis/publicApi';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../contexts/AuthContext';


const LoginPage = () => {

  const { checkUser } = useAuth();
  const navigate = useNavigate();

  const { values, handlerInputChange } = useForm({
    username: '',
    clave: ''
  });

  const [loading, setLoading] = useState(false);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await publicApi.post('/api/auth/login', values);

      if (response.data.type === 'success') {
        localStorage.setItem('access_token', response.data.token);
        localStorage.setItem('refresh_token', response.data.refreshToken);

        await checkUser();

        const lastPath = localStorage.getItem('lastPath') || '/admin';
        localStorage.removeItem('lastPath');
        navigate(lastPath, { replace: true });
      }
    } catch (error) {
      console.log('Error:', error);
      if (error.response?.data?.type === 'unauthorized') {
        alert(error.response.data.message);
      } else {
        alert('Error inesperado al iniciar sesión.');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handlerSubmit}>
      <label>Usuario</label>
      <input type="text" name='username' value={values.username} onChange={handlerInputChange} autoComplete='off' />
      <br />

      <label>Clave</label>
      <input type="password" name='clave' value={values.clave} onChange={handlerInputChange} autoComplete='off' />
      <br />

      <input type="submit" disabled={loading} value={loading ? 'Cargando...' : 'Ingresar'} />
    </form>
  )
}

export default LoginPage