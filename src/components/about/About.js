import React, { useState } from 'react';
import styles from './styles.module.scss';
import Ring from '../../assets/about_curve.svg';
import Circle from '../../assets/about_circle.svg';
import Rec from '../../assets/about_rec.svg';
import BG from '../../assets/about_bg.svg';
import Pill from '../pill/Pill';

const About = (props) => {

	const [ lang, setLang ] = useState("English");

	const ContentLang = (lang) => {
		let result = props.content.map((item, index) => {
			if (item.fields.lang === lang) {

				let lines = item.fields.content.split(';');
				let descItems = [];
				for (var i = 0; i < lines.length; i++) {
					//make sure no empty lines
					if (lines[i].length > 1) {
						descItems.push(<p key={i}>{lines[i]}</p>)
					}
				}
				return (
					<div className={styles.text} key={index}>{descItems}</div>
				)
			}
		})

		return result;
	}

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<Pill title="about" color="yellow" />
				{ContentLang(lang)}
				<div className={styles.image}>
					<img src={Ring} className={styles.ring}/>
					<img src={Circle} className={styles.circle} />
					<img src={Rec} className={styles.rec} />
				</div>
				<div className={styles.langSelect}>
					<div onClick={() => setLang("Thai")} className={lang === "Thai" ? styles.selected : null}>Thai</div>
					<div onClick={() => setLang("English")} className={lang === "English" ? styles.selected : null}>English</div>
				</div>
			</div>
			<img src={BG} className={styles.BG}/>
		</div>
	)
}

export default About;