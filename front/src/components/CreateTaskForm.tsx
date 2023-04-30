import { observer } from "mobx-react-lite";
import { globalStore } from "../store/store";
import { AiOutlineClose } from 'react-icons/ai'
import { BiTask } from "react-icons/bi";
import { useCookies } from "react-cookie";
import { Form, Input, DatePicker, Switch, Button } from "antd";
import { MdOutlineCreate } from 'react-icons/md'

export const CreateTaskForm = observer(() => {
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
