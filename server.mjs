import express from "express";
import cors from "cors";


const app = express();
const port = process.env.PORT || 5002;
const todos = [];

app.use(express.json()); // to convert body in to json
app.use(cors( {origin:['http://localhost:5173','https://frontend.surgey.sh']}));
app.get("/api/v1/todos", (request, response) => {
 
  const message = !todos.length ? "todos empty" : "ye lo sab todos"

  response.send(
    {data:todos,message: message}
  );
});
// post use for to add new to-do

app.post("/api/v1/todo", (request, response) => {
  const obj = {
    todoContent: request.body.todo,
    id: String(new Date().getTime()),
  }
  todos.push(obj);
  response.send({message:"todo add ho gia ha", data:obj});
});
// patch use for to update or edit your api
app.patch("/api/v1/todo/:id", (request, response) => {
  const id = request.params.id;

  let isFound = false;

  for (let i = 0; i < todos.length; i++) {
    if(todos[i].id === id){
      todos[i].todoContent = request.body.todoContent
      isFound = true;
      break;
    }
    
  }
  if(isFound){
    response.status(201).send({
      data:{todoContent: request.body.todoContent,id:id,}
      ,message:'todo updated succesfully'})
  }else{
    response.status(200).send({data:null,message:'todo not found'})

  }
});
app.delete("/api/v1/todo/:id", (request, response) => {

  const id = request.params.id;

  let isFound = false;

  for (let i = 0; i < todos.length; i++) {
    if(todos[i].id === id){
      todos.splice(i,1)
      isFound = true;
      break;
    }
    
  }
  if(isFound){
    response.status(201).send({
      // data:{todoContent: request.body.todoContent,id:id,},
      message:'todo deleted succesfully!'})
  }else{
    response.status(200).send({data:null,message:'todo not found'})

  }

});

app.use((request, response) => {
  response.status(404).send("no route found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const a = [{
//   id:2,
//   todo:"assiment krna ha",
//   createdAt:"1:15",
//   todoAddBy:"Malik"
// },
// {
//   id:3,
//   todo:"kal tk assiment bn jana chahiye",
//   createdAt:"1:17",
//   todoAddBy:"Azmat"
// }]
