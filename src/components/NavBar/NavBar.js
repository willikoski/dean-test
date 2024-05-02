import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';
import * as userService from '../../utilities/users-service';

function NavBar({ user, logOut }) {
    useEffect(() => {
        const navbar = document.querySelector(`.${styles.NavBar}`);

        let lastScrollTop = 0;

        const handleScroll = () => {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop) {
                navbar.classList.add(styles.scrollDown);
            } else {
                navbar.classList.remove(styles.scrollDown);
            }

            lastScrollTop = scrollTop < 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function handleLogOut() {
        userService.logOut();
        logOut(); // Update user state in parent component after logout
    }

    // Log the value of the user prop for debugging
    console.log('User prop:', user);

    return (
        <div className={styles.NavBar}>
            <div className={styles.innerNav}>
                <label className={styles.label}>
                    Search
                    <input className={styles.search} type="text" />
                </label>
                <Link className={styles.LogoLink} to="/">
                    <div className={styles.LogoContainer}>
                        <div className={styles.LogoInnerContainer}>
                            <img className={styles.Logo} src="/img/logo.jpg" alt="Dean's Logo" />
                        </div>
                    </div>
                </Link>
                <ul className={styles.navList}>
                    <li className={styles.Link}>
                        <Link to="/" className={styles.iconContainer}>
                            <img className={styles.homeIcon} src="/img/home-logo-navy.png" alt="Home Icon" />
                            <img className={styles.outerIcon} src="/img/outer-circle.png" alt="Outer Circle" />
                        </Link>
                    </li>
                    <li className={styles.Link}>
                        <Link to="/profile" className={styles.iconContainer}>
                            <img className={styles.homeIcon} src="/img/profile-logo-navy.png" alt="Profile Icon" />
                            <img className={styles.outerIcon} src="/img/outer-circle.png" alt="Outer Circle" />
                        </Link>
                    </li>
                    <li className={styles.Link}>
                        <Link to="/data" className={styles.iconContainer}>
                            <img className={styles.homeIcon} src="/img/data-logo-navy.png" alt="Data Icon" />
                            <img className={styles.outerIcon} src="/img/outer-circle.png" alt="Outer Circle" />
                        </Link>
                    </li>
                    {/* Conditionally render "LOG OUT" link */}
                    {user ? (
                        <li className={styles.UserLogOut}>
                            <div className={styles.name}>{user.firstName}</div>
                            <div className={styles.email}>{user.email}</div>
                            <Link className="btn-sm" to="/" onClick={handleLogOut}>
                                LOG OUT
                            </Link>
                        </li>
                    ) : null}
                </ul>
            </div>
        </div>
    );
}

export default NavBar;
