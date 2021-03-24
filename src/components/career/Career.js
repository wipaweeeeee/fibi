import React, { useState } from 'react';
import styles from './styles.module.scss';
import Pill from '../pill/Pill';
import BGImage from '../../assets/joinus.svg';

const Career = (props) => {

	const [ select, setSelect ] = useState(0);

	let titles = props.content.map((item, index) => {
		if (item.fields.subSection !== "contactInfo") {
			return (
				<div key={index} className={select === index ? styles.selected : null} onClick={() => setSelect(index)} >
					{item.fields.title}
				</div>
			)
		}
	})

	let descriptions = props.content.map((item, index) => {

		let lines = item.fields.content.split(';');

		let descItems = [];
		for (var i = 0; i < lines.length; i++) {
			//make sure no empty lines
			if (lines[i].length > 1) {
				descItems.push(<p key={i}>{lines[i]}</p>)
			}
		}

		return (
			<div key={index} className={select === index ? styles.showDesc : styles.hideDesc}>
				{ item.fields.subSection !== "contactInfo" && <p className={styles.mobTitle}>{item.fields.title}</p>}
				{descItems}
			</div>
		)
	})

	let contact = props.content.map((item, index) => {
		if (item.fields.subSection === "contactInfo") {
			return (<a key={index} href={`mailto:${item.fields.other}`}>{item.fields.other}</a>)
		}
	})

	return (
		<div className={styles.container}>
			<img src={BGImage} className={styles.BGImage}/>
			<div className={styles.content}>
				<Pill title="career" color="red" />
				<div className={styles.position}>
					{titles}
				</div>
				<div className={styles.description}>
					{descriptions}
				</div>
				<div className={styles.contact}>
					Apply here: <br />
					{contact}
				</div>
			</div>
		</div>
	)
}

export default Career;