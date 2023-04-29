import {  Button, Form, Input, notification  } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authUser } from '../../api/api';
import { useCookies } from 'react-cookie';

export const LoginPage = () => {
    const [cookie, setCookie] = useCookies();
    const navigate = useNavigate();
    
    const onFinishHandle = (values : any) => {
        authUser(values.username, values.password)
        .then(res => {
            navigate('/')
            setCookie('token', res.data.token)
            setCookie('user', values.username)
            notification.open({
                message: 'Вы успешно вошли!'
            })
        })
        .catch(err => {
            notification.open({
                message: `Ошибка ${err}`
            })
        })
    };

    const onClickRedirectOnRegistrationPage = () => {
        navigate('/registration');
    }

    return (
    <>
       <div className="login-page-container">
        <div className="login-form-container">
            <div className="login-form">
            <p>Авторизация</p>
                <Form onFinish={onFinishHandle}>
                    <Form.Item 
                    name={'username'}
                    rules={[
                        {
                            required: true,
                            message: 'Введите логин для входа'
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
                            message: 'Введите пароль для входа'
                        }

                    ]}
                    >
                        <Form.Item label={<p style={{color: 'white'}}>Пароль</p>}>
                            <Input placeholder='Введите пароль' type='password'/>                       
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <div className='login-buttons'>
                            <Button type='primary' htmlType='submit'>Войти</Button>
                            <Button type='primary' onClick={onClickRedirectOnRegistrationPage}>Ещё нет аккаунта?</Button>
                        </div>
                    </Form.Item>
                </Form>
                                
            </div>            
        </div>
       </div>    
    </>
   );
};
