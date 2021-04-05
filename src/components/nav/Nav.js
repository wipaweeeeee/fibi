import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { NavHashLink } from 'react-router-hash-link';
import {
  BrowserRouter as Router
} from "react-router-dom";

import Menu from '../../assets/menu.svg';
import Close from '../../assets/close.svg';
import Logo from '../../assets/logo.svg';

const Nav = (props) => {

	const [ section, setSection ] = useState();
	const [ mobile, setMobile ] = useState();
	const [ mobileMenu, setMobileMenu ] = useState(false);

	const mobileWidth = 768;

	useEffect(() => {

		handleMobile();

		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleMobile);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleMobile);

		}

	})

	const handleMobile = () => {
		if (window.innerWidth <= mobileWidth) {
			setMobile(true);
		} else {
			setMobile(false);
		}
	}

	const handleScroll = () => {

		const currentScroll = window.scrollY;
		let about = props.about.current.offsetTop - 74;
		let features = props.features.current.offsetTop - 74;
		let clients = props.clients.current.offsetTop - 74;
		let careers = props.careers.current.offsetTop - 74;
		let contact = props.contact.current.offsetTop - 74;

		if (currentScroll >= about && currentScroll < features) {
			setSection("about");
		} else if (currentScroll >= features && currentScroll < clients) {
			setSection("services");
		} else if (currentScroll >= clients && currentScroll < careers) {
			setSection("clients");
		} else if (currentScroll >= careers && currentScroll < contact) {
			setSection("careers");
		} else if (currentScroll >= contact) {
			setSection("contact");
		} else {
			setSection("home");
		}
	}

	return (
		<Router>
		<div className={classNames(styles.container, styles[section])}>
			<div className={styles.content}>
			<NavHashLink to="#home" smooth onClick={() => setSection("home")} className={styles.logo}>
				<img src={Logo} />
			</NavHashLink>
				{
					!mobile && 
						<div className={styles.navItems}>
							<NavHashLink to="#about" smooth onClick={() => setSection("about")} 
								className={section === "about" ? styles.selected : null}>about</NavHashLink>
							<NavHashLink to="#services" smooth onClick={() => setSection("services")}
								className={section === "services" ? styles.selected : null}>services</NavHashLink>
							<NavHashLink to="#clients" smooth onClick={() => setSection("clients")}
								className={section === "clients" ? styles.selected : null}>clients</NavHashLink>
							<NavHashLink to="#careers" smooth onClick={() => setSection("careers")}
								className={section === "careers" ? styles.selected : null}>careers</NavHashLink>
							<NavHashLink to="#contact" smooth onClick={() => setSection("contact")}
								className={section === "contact" ? styles.selected : null}>contact</NavHashLink>
						</div>
				}
				{
					mobile && 
					<div className={styles.mobileIcon} onClick={() => setMobileMenu(true)}>
						<img src={Menu} />
					</div>
				}
			</div>
			{
				mobileMenu && 
				<div className={styles.mobNavItems}>
					<div className={styles.topLine}>
						<div className={styles.logo}><img src={Logo} /></div>
						<div onClick={() => setMobileMenu(false)}><img src={Close} className={styles.close}/></div>
					</div>
					<NavHashLink to="#about" smooth onClick={() => { setSection("about"); setMobileMenu(false)}} 
						className={section === "about" ? styles.selected : null}>about</NavHashLink>
					<NavHashLink to="#services" smooth onClick={() => { setSection("services"); setMobileMenu(false)}}
						className={section === "services" ? styles.selected : null}>services</NavHashLink>
					<NavHashLink to="#clients" smooth onClick={() => { setSection("clients"); setMobileMenu(false)}}
						className={section === "clients" ? styles.selected : null}>clients</NavHashLink>
					<NavHashLink to="#careers" smooth onClick={() => { setSection("careers"); setMobileMenu(false)}}
						className={section === "careers" ? styles.selected : null}>careers</NavHashLink>
					<NavHashLink to="#contact" smooth onClick={() => {setSection("contact"); setMobileMenu(false)}}
						className={section === "contact" ? styles.selected : null}>contact</NavHashLink>
				</div>
			}
		</div>
		</Router>
	)
}

export default Nav;