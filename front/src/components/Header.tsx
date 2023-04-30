import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { FiUsers, FiLogIn } from 'react-icons/fi';
import { BiHomeSmile, BiLogOut } from 'react-icons/bi';
import { notification } from "antd";

export const Header = () => {
    const [cookie, setCookie, removeItem] = useCookies();

    const isUserAuth = cookie.token;
    
    const navigate = useNavigate();

    const handleLogout = () => {
        removeItem('token');        
        removeItem('user');        
        navigate('/login')
        notification.open({
            message: 'Вы вышли'
        })
    }    

   return (
    <>
        <div className="header">
                <div className="button" onClick={() => navigate('/')}>
                    <BiHomeSmile/>  Мои задачи</div>
                {
                    isUserAuth
                        ? <><div className="button" onClick={handleLogout}>
                            <BiLogOut/>  Выйти</div></> 
                        : 
                        <>
                            <div className="button" onClick={() => navigate('/registration')}>
                                <FiUsers/>  Зарегестрироваться</div>
                            <div className="button" onClick={() => navigate('/login')}>
                                <FiLogIn/>  Войти</div>                        
                        </>
                }
        </div>
        <Outlet />    
    </>
   );
}; 