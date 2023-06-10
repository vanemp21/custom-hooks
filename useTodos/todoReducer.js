export const todoReducer = (initialState=[],action)=>{
    switch (action.type) {
        case '[TODO] Add Todo':
            //el action.payload es la nueva entrada, es como un push
           return [...initialState,action.payload];
        case '[TODO] Remove Todo':
            //muestrame el initialstate sin el action.payload la descripcion del boton clickado donde la id esa
            return initialState.filter(todo=>todo.id !==action.payload);
        //recorre todo el initialstate y si donde clickas es la misma id 
        //que el nombre, retorna falso o verdadero
        //que en el dispatch si es true lo tachara
        case '[TODO] Toggle Todo':
        return initialState.map(todo=>{
            if(todo.id === action.payload){
                return {
                    ...todo,
                    done:!todo.done
                }
            }
            return todo;
        });
        default:
            return initialState;
    }
}