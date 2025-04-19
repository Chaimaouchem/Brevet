import React from 'react';
import {
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsBoxArrowRight
} from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprime le token de l'utilisateur pour déconnecter
    localStorage.removeItem("token");
    // Redirige vers la page de login
    navigate("/Login");
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          IPManag
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/dash">
            <BsGrid1X2Fill className='icon' /> Tableau de board
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/table">
            <BsFillArchiveFill className='icon' /> Innovations
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/ajout">
            <BsFillGrid3X3GapFill className='icon' /> Add Innovation
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsPeopleFill className='icon' /> 
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsListCheck className='icon' /> 
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsMenuButtonWideFill className='icon' /> Reports
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsFillGearFill className='icon' /> Setting
          </a>
        </li>

        {/* Ajout du bouton Logout */}
        <li className='sidebar-list-item'>
          <span onClick={handleLogout}>
            <BsBoxArrowRight className='icon' /> Logout
          </span>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
