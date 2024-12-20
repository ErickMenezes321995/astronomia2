import {useState, useEffect} from 'react'
import './admin.css'

import {auth,db} from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

import {
    addDoc,
    collection
} from 'firebase/firestore'



export default function Admin(){

    const [tarefaInput, setTarefaInput] = useState('')
    const [user, setUser] = useState({})

    useEffect(() =>{
        async function loadTarefas(){

            const userDetail = localStorage.getItem("@detailUser")

            setUser(JSON.parse(userDetail))
        }

        loadTarefas();
    },[])

     async function handleRegistre(e){
        e.preventDefault();
        

        if(tarefaInput === ''){
            alert('Digite sua tarefa')
            return;
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid,
        })
        .then(()=>{
            console.log('tarefa registrada')
            setTarefaInput('');

        })
        .catch((error)=>{
            alert("error"+ error)
        })
    }

    async function handleLogout(){
        await signOut(auth);
    }

    return(
        <div className='admin-container register'>
            <h1>minhas tarefas</h1>

            <form className='formregister' onSubmit={handleRegistre}>
                <textarea
                placeholder='Digite sua tarefa'
                value={tarefaInput}
                onChange={(e) => setTarefaInput(e.target.value)}/>

                <button type='submit'>Registrar tarefa</button>
            </form>

            <article className='list'>
                <p>estudar</p>

                <div>
                    <button>Editar</button>
                    <button className='delete'>Concluir</button>
                </div>
            </article>

            <button className='btn-logout' onClick={handleLogout}>sair</button>
            
        </div>
    )
}