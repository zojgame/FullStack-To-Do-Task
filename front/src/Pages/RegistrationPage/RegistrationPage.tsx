import {  Button, Form, Input, notification  } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/api';

export const RegistrationPage = () => {
    const navigate = useNavigate();
    const onFinishHandle = (values : any) => {
        console.log('Received values of form: ', values);
        createUser(values.username, values.password)
        .then(() => {
            notification.open({
                message: `Аккаунт создан! Войдите`
            })        
            navigate('/login')
        })
        .catch(err => notification.open({message: `Ошибка ${err}`}))  
    };

    const onClickRedirectToLoginPage = () => {
        navigate('/login');
    }

    return (
    <>
       <div className="register-page-container">
        <div className="register-form-container">
            <div className="register-form">
                <p>Регистрация</p>
                <Form onFinish={onFinishHandle}>
                    <Form.Item 
                    name={'username'}
                    rules={[
                        {
                            required: true,
                            message: 'Введите логин входа'
                        }

                    ]}
                    >       
                    <Form.Item label={<p style={{color: 'white'}}>Логин</p>}>
                        <Input placeholder='Введите логин'/>                        
                    </Form.Item>  
                                   
                    </Form.Item>
                    <Form.Item 
                    name={'password'}
                    rules={[
                        {
                            required: true,
                            message: 'Введите пароль'
                        }

                    ]}
                    >
                    <Form.Item label={<p style={{color: 'white'}}>Пароль</p>}>
                        <Input placeholder='Введите пароль' type='password'/>                       
                    </Form.Item>
                        
                    </Form.Item>
                    <Form.Item>
                        <div className='register-buttons'>
                            <Button type='primary' htmlType='submit'>Создать аккаунт</Button>
                            <Button type='primary' onClick={onClickRedirectToLoginPage}>Уже есть аккаунт</Button>
                        </div>
                    </Form.Item>
                </Form>                                
            </div>            
        </div>
       </div>    
    </>
   );
};
