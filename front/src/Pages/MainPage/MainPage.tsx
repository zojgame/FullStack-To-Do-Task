import { Button } from "antd";
import { globalStore } from "../../store/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useCookies } from 'react-cookie';
import { CreateTaskForm, UserTask } from "../../components";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

export const MainPage = observer(() => {
   const [cookie] = useCookies()
   const user = cookie.user;
   const token = cookie.token;
   const navigate = useNavigate();

   useEffect(() => {
      if(token){
         globalStore.getAllUserTasks(user, token)
      }
      else{
         notification.open({message: 'Вы не авторизованы'})
         navigate('/login');         
      }
   }, [])


   const onCreateTaskBtn = () => {
      globalStore.switchCreationForm();
   }

   return (
      <>
         <div className="main-page-container">
            <div className="main-page">
               <h1>
                  Мои задачи
               </h1>

               {!globalStore.isCreateFormOpen
                  ? <Button onClick={onCreateTaskBtn}>Создать задачу</Button>
                  : <CreateTaskForm />}


            </div>
            <div className="user-tasks">{globalStore.userTasks.map((task) => {
               return (<UserTask task={task} key={`${task._id}`} />)
            })}
            </div>
         </div>
      </>
   );
});



