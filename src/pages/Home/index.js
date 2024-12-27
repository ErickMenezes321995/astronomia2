
import { useState } from'react';
import './style.css'
import astro from '../img/astro.png'
import futuro from '../img/futuro.png'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConnection'
import {signInWithEmailAndPassword} from 'firebase/auth'


function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const Navigate = useNavigate();



  async function handleLogin(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
       
      await signInWithEmailAndPassword(auth, email, password)

      .then(() => {

        Navigate('/admin', {replace: true})

      })

      .catch(() => {
        alert('EMAIL OU SENHA INCORRETOS!!!!')
      })

    }else{
      alert('Preencha todos os campos!!')
    }

  }
 
return (
<div className="App">
  
  <div className='container'>
    
    <div className='login'>

    <h1>ASTRONOMY</h1>
    <h2>PICTURE OF THE DAY</h2>

      <form className='form' onSubmit={handleLogin} >
        <div className='enter'>
          <label>Email:</label>

          <input type='email' id='email' placeholder='Digite seu email'
          value={email} onChange={(e) => setEmail(e.target.value)} />
        
          <label>Senha:</label>
          <input type='password' id='password' placeholder='Digite sua senha'
          value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className='btn' type='submit'>Entrar</button>
          <Link className='' to='./Register'>Não possui uma conta? Cadastre-se!</Link>
        </div>
      </form>

    </div>

  </div>   


  <div className='conteudo1'>
    <div className='exploração'>
      <img src={astro} alt='imagem de logo'/>
      <h2>Bem-vindo ao Universo Fascinante da Astronomia!</h2>
    </div>

    <div className='exploração2'>
      <div className='lua'>
        <p><strong>Exploração Espacial:</strong> Acompanhe as mais recentes missões espaciais e avanços tecnológicos que estão ampliando os limites da nossa compreensão do universo.</p>
      </div>

    <div className='sol'>
      <p><strong>Sistemas Solares e Exoplanetas:</strong> Descubra os segredos do nosso sistema solar e de mundos distantes orbitando outras estrelas.</p>
    </div>

    <div className='marte'>
          <p>
          <strong>Fenômenos Celestes:</strong> Saiba mais sobre eclipses, chuvas de meteoros, auroras boreais e outros eventos espetaculares que encantam o céu noturno.
          </p>
    </div>
    </div>

    <div className='exploração3'>
      <div className='aprenda1'> 
        <img src={futuro} alt='imagem de texto'/>   
        <h1>Aprenda e participe!!</h1>
        <h3>Nosso site não é apenas para ler, mas também para interagir. Confira:</h3>
      </div>

      <div className='partial'>
        <p className='part1'><strong>Guias de Observação:</strong> Dicas para explorar o céu noturno com binóculos, telescópio ou a olho nu.</p>
        <p className='part2'><strong>Blog de Atualizações</strong> Artigos sobre as mais recentes descobertas astronômicas e curiosidades do universo.</p>
        <p className='part3'><strong>Comunidade:</strong> Junte-se a outros entusiastas em discussões, eventos e observações compartilhadas. </p>
      </div>

    </div>
  </div>

  <footer className='footer'>
    <div className='redesocial'>
      <Link to={'https://www.facebook.com/?locale=pt_BR'}>Facebook</Link>
      <Link to={'https://www.instagram.com/'}>Instagram</Link>
      <Link to={'https://www.youtube.com/'}> Youtube </Link>      
      
    </div>

    <div className='direitos'>
      <p>
        Todos os diretos reservados - Erick Menezes 
      </p>
    </div>

  </footer>

</div>
       
  );
}

export default Home;