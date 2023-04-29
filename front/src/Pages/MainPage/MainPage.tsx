import { Button } from "antd";
import { globalStore } from "../../store/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useCookies } from 'react-cookie';
import { CreateTaskForm, UserTask } from "../../components";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { Menu } from "antd";
import type { MenuProps } from 'antd';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Task } from "../../types/types";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
   label: React.ReactNode,
   key: React.Key,
   icon?: React.ReactNode,
   children?: MenuItem[],
   type?: 'group',
 ): MenuItem {
   return {
     key,
     icon,
     children,
     label,
     type,
   } as MenuItem;
 }

const items = [
   getItem('Фильтр', 'sub4', <AppstoreOutlined />, [
      getItem('Умолчанию', 9),
      getItem('Только сделанные', 10),
      getItem('Только не стеланные', 11),
    ]),
]

const filterTasks = (tasks: Task[], filterType: String) => {
   if(filterType === 'compressed'){
      return tasks.filter(task => task.isDone);
      
   }
   if(filterType === 'unfinished'){
      return tasks.filter(task => !task.isDone);
   }
   return tasks;
}

export const MainPage = observer(() => {
   const [cookie] = useCookies()
   const user = cookie.user;
   const token = cookie.token;
   const [filter, setFilter] = useState('default')
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

   const onSortMenuClick = (e: any) => {
      console.log('click ', e);
      if(e.key === '10'){
         setFilter('compressed')
      }
      if(e.key === '11'){
         setFilter('unfinished')
      }
      if(e.key === '9'){
         setFilter('default')
      }
   }

   const onCreateTaskBtn = () => {
      globalStore.switchCreationForm();
   }



   return (
      <>
         <div className="main-page-container">
            <div className="main-page">
               <div>
                  <h1>
                     Мои задачи
                  </h1>
                  <Menu
                     onClick={onSortMenuClick}
                     style={{ width: 256 }}
                     defaultSelectedKeys={['1']}
                     defaultOpenKeys={['sub1']}
                     mode="vertical"
                     items={items}
                  />
               </div>

               {!globalStore.isCreateFormOpen
                  ? <Button onClick={onCreateTaskBtn}>Создать задачу</Button>
                  : <CreateTaskForm />}


            </div>
            <div className="user-tasks">{filterTasks(globalStore.userTasks, filter).map((task) => {
               return (<UserTask task={task} key={`${task._id}`} />)
            })}
            </div>
         </div>
      </>
   );
});



