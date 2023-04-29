import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { globalStore } from "../../store/store";
import { useEffect } from "react";
import { getCookie } from "react-use-cookie";
import { useCookies } from 'react-cookie';
import { FiUsers, FiLogIn } from 'react-icons/fi';
import { BiHomeSmile, BiLogOut } from 'react-icons/bi';

export const Header = () => {
    const [cookie, setCookie, removeItem] = useCookies(['token']);

    const isUserAuth = cookie.token;
    
    const navigate = useNavigate();

    const handleLogout = () => {
        removeItem('token');        
        navigate('/')
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