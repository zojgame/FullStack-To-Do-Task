// import './styles.sass'
import { BiTask, BiEdit } from "react-icons/bi";
import { Form, Input, DatePicker, Switch, Button } from "antd";
import { globalStore } from "../../store/store";
import { observer } from "mobx-react-lite";
import { MdOutlineCreate } from 'react-icons/md'
import { AiOutlineClose, AiFillDelete } from 'react-icons/ai'
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { Task } from "../../types/types";
import dayjs from "dayjs";

export const MainPage = observer(() => {
   const [cookie] = useCookies()
   const user = cookie.user;
   const token = cookie.token;

   useEffect(() => {
      globalStore.getAllUserTasks(user, token)
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

const UserTask = ({ task }: { task: Task }) => {
   const date = `Выполнить до ${dayjs(new Date(task.deadline)).locale('ru').format('D MMMM')}`;
   const [isTaskEditing, setIsTaskEditing] = useState(false);
   const isDone = task.isDone ? 'Сделано' : 'Не сделано';
   const [cookies] = useCookies();
   const [isTaskDone, setIsTaskDone] = useState(task.isDone);

   const onFinishEditing = (values: any) => {
      const deadline = new Date(dayjs(values.deadline).format('YYYY-MM-DD'))
      const newTask : Task= {...task,
            description: values.description,
            title: values.title,
            isDone: values.isDone,
            deadline: deadline
         }
      setIsTaskEditing(prev => !prev);

      globalStore.updateTask(task._id, newTask, cookies.token, cookies.user);
   }

   const onDeleteBtn = () => {
      globalStore.deleteTask(task._id, cookies.token, cookies.user);
   }

   const onClickEditBtn = () => {
      setIsTaskEditing(prev => !prev);
   }

   return (
      <div className="user-task">
         {!isTaskEditing 
            ? <>
               <div>Название: {task.title}</div>
               {task.description.length === 0 || <div>Описание: {task.description}</div>}
               {task.deadline ? <div>{`${date}`}</div> : <></>}
               <div>{`${isDone}`}</div>
               <div>
                  <Button onClick={onClickEditBtn}>
                     <BiEdit style={{ fontSize: '20px', margin: '1px auto' }}/>
                  </Button>
                  <Button
                     type='dashed'
                     onClick={onDeleteBtn}
                     style={{ marginLeft: '5px' }}>
                        <AiFillDelete style={{ fontSize: '20px', margin: '1px auto' }} />
                  </Button>
               </div>
            </>
            : <>
               <Form className='task-form-editing' 
                  onFinish={onFinishEditing}
                  initialValues={{
                     ['description']: `${task.description}`,
                     ['title']: `${task.title}`,
                     ['deadline']: dayjs(task.deadline),
                     ['isDone']: isTaskDone
                     
                  }}>
                  <Form.Item
                     name='title'
                     rules={[
                        {
                           required: true,
                           message: 'Введите название'
                        }
                     ]}>
                     <Input placeholder='Введите название'/>
                  </Form.Item>

                  <Form.Item
                     name='description'
                     rules={[
                        {
                           message: 'Введите Описание'
                        }
                     ]}>
                     <Input placeholder='Введите описание' />
                  </Form.Item>

                  <Form.Item name='deadline'>
                     <DatePicker  placeholder='Выполнить до:'/>
                  </Form.Item>

                  <Form.Item name='isDone'>
                     <Switch 
                     checked={isTaskDone ? true : false}
                     onChange={() => setIsTaskDone(prev => !prev)}/>
                  </Form.Item>
                     <div>
                        <Button
                           type='primary'
                           htmlType='submit'
                           icon={<MdOutlineCreate style={{ marginRight: '5px' }} />}>Обновить</Button>                        
                     </div>
                  
             </Form>
            </>
            }  
      </div>
         
   );
};

const CreateTaskForm = observer(() => {
   const [cookies] = useCookies();
   const onCreateTask = (values: any) => {
      globalStore.createTask(values.title, values.isDone, values.deadline, values.description, cookies.token, cookies.user);
      globalStore.switchCreationForm();
   }

   const onCloseTaskForm = () => {
      globalStore.switchCreationForm();
   }

   return (
      <div className='task-container'>
         <h2><BiTask /> Создание задачи </h2>
         <div className="title-header task-field">Название задачи</div>
         <div className="description-header task-field">Описание задачи</div>
         <div className="deadline-header task-field">К какому времени выполнить</div>
         <div className="isDone-header task-field">Выполнено</div>

         <Form 
            className='task-form' 
            onFinish={onCreateTask}
            initialValues={{
               ['title']:'',
               ['description']:'',
               ['deadline']:null,
               ['isDone']:false
            }}
            >
            <Form.Item
               className="title"
               name='title'
               rules={[
                  {
                     required: true,
                     message: 'Введите название'
                  }
               ]}>
               <Input placeholder='Введите название' />
            </Form.Item>

            <Form.Item
               className="description"
               name='description'
               rules={[
                  {
                     message: 'Введите Описание'
                  }
               ]}>
               <Input placeholder='Введите описание' />
            </Form.Item>

            <Form.Item className="deadline" name='deadline'>
               <DatePicker placeholder='Выполнить до:' />
            </Form.Item>

            <Form.Item className="isDone" name='isDone'>
               <Switch />
            </Form.Item>

            <Button className='close-task-btn'

               type="dashed"
               icon={<AiOutlineClose style={{ marginRight: '5px' }} />} onClick={onCloseTaskForm}>Закрыть </Button>

            <Button className='create-task-btn '
               type='primary'
               htmlType='submit'
               icon={<MdOutlineCreate style={{ marginRight: '5px' }} />}>Создать задачу </Button>
         </Form>
      </div>
   );
});
