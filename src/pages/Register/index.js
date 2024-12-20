
import { useState } from'react';
import './register.css'
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConnection'

import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword} from 'firebase/auth';




function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();


  async function handleRegister(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      
      await createUserWithEmailAndPassword(auth, email, password)

      .then(() => {
        navigate('/admin', {replace: true})
      })
      .catch(() => {
        alert('ERROR AO CADASTRAR')
      })

    }else{
      alert('Preencha todos os campos!!')
    }

}
 
return ( 
    
    <div className='register'>

    <h1>Cadastre-se</h1>
    <span>Criar sua conta!</span>

      <form className='formregister' onSubmit={handleRegister} >
          <label>Email:</label>

          <input type='email' id='email' placeholder='Digite seu email'
          value={email} onChange={(e) => setEmail(e.target.value)} />
        
          <label>Senha:</label>
          <input type='password' id='password' placeholder='******'
          value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className='btn' >Cadastrar</button>

          <Link className='button-link' to='/'>Já possui uma? Faça um login!</Link>

          <div className='redesocial'>
      <Link to={'https://www.facebook.com/?locale=pt_BR'}>Facebook</Link>
      <Link to={'https://www.instagram.com/'}>Instagram</Link>
      <Link to={'https://www.youtube.com/'}> Youtube </Link>      
      
    </div>
       
    </form>
</div>

   )

}

export default Register;
