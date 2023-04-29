import { BiEdit } from "react-icons/bi";
import { Form, Input, DatePicker, Switch, Button } from "antd";
import { MdOutlineCreate } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'
import { useState } from "react";
import { useCookies } from 'react-cookie';
import { Task } from "../types/types";
import dayjs from "dayjs";
import { globalStore } from "../store/store";

export const UserTask = ({ task }: { task: Task }) => {
    const date = `Выполнить до ${dayjs(new Date(task.deadline)).locale('ru').format('D MMMM')}`;
    const [isTaskEditing, setIsTaskEditing] = useState(false);
    const isDone = task.isDone ? 'Выполнено' : 'Не выполнено';
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