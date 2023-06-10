import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const initialState = []
const init = ()=>{
    return JSON.parse(localStorage.getItem('todos')) || [];
}
export const useTodos = () => {
    //la tercera condicion del usereducer para que se quede guardado lo que se añada
//en el array del todos tras actualizar la pagina

    //todoReducer es la funcion donde se va a modificar o añadir el objeto del initialstate
    //que necesitara usar el action.type y payload.type por eso se necesita el action
    //una vez modificado se devuelve el nuevo state
    // initialState: es como va a iniciar, que se declara 

    //todos es como queda los objetos/array de objetos despues de haber sido modificado
    const [todos, dispatch] = useReducer(todoReducer, initialState, init);
    const pendingTodosCount = todos.filter(todo=>!todo.done).length;
    const todosCount = todos.length;

      //meter las cosas en el localstorage cuando haya un cambio en todos
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos]) //cuando los todos cambian, voy a ejecutar arriba de nuevo
    
    const handleNewTodo = (todo) =>{
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch(action);
    } 
    const handleDeleteTodo = (id)=>{
        dispatch({
            type:'[TODO] Remove Todo',
            payload: id
        })
    }
    const handleToggleTodo = (id)=>{
       dispatch({
        type: '[TODO] Toggle Todo',
        payload: id
       })
    }
  return {
    todos,
    handleDeleteTodo,
    handleNewTodo,
    handleToggleTodo,
    pendingTodosCount,
    todosCount
  }
 
}
