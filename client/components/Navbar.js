import React, { useState} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { motion } from "framer-motion";

const Navbar = ({ handleClick, isLoggedIn, userId, isAdmin }) => {
  const [isOpen, setOpen] = useState(false)
  //console.log(this.props);
  return (
    <motion.div 
      className="
      align-middle
      bg-blue-900 
      rounded-b-full 
      sticky 
      top-0 
      border-none 
      justify-center 
      flex 
      flex-col 
      place-self-center 
      divide-none"
      initial={{
        opacity: 1,
        y:"-50"
      }}
      whileHover={{
        opacity: 1,
        y:0
      }}
      transition={{
        duration: .25
      }}
      onMouseEnter={()=> setOpen(true)}
      onMouseLeave={()=> setOpen(false)}
      >

      <motion.h1 
      initial={{
        scale: 1,
        opacity: 0
      }}
      animate={{
        scale: isOpen?2:1,
        opacity: isOpen?1:0,
        zIndex: 1
      }} 
      className="
      text-center
      font-extrabold
      py-4
      ">Grace Shopper Honeydew</motion.h1>
      <nav className="flex flex-col justify-center mb-3 border-none z-10">
        {isLoggedIn ? (
          <div className="flex justify-center border-none">
            {/* The navbar will show these links after you log in */}
            <Link className="mx-2" to="/cars">Store</Link>
            {/* <Link to="/users">Users</Link> */}

            <Link className="mx-2" to={`/users/${userId}`}>Profile</Link>
            {isAdmin?
            (
            <Link className="mx-2" to="/users">Users</Link>
            )
            :<></>}
            <a className="mx-2" href="#" onClick={handleClick}>
              Logout
            </a>
            <Link className="mx-2" to="/cart">Cart</Link>
          </div>
        ) : (
          <div className="flex justify-center border-none">
            {/* The navbar will show these links before you log in */}
            <Link className="mx-2" to="/login">Login</Link>
            <Link className="mx-2" to="/signup">Sign Up</Link>
            <Link className="mx-2" to="/cars">Store</Link>
            <Link className="mx-2" to="/cart">Cart</Link>
          </div>
        )}
      </nav>
      <hr />
    </motion.div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
    isAdmin: state.auth.admin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
