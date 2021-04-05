import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import Pill from '../pill/Pill';
import Placeholder from '../../assets/general.svg';
import BG from '../../assets/service_bg.svg';

const Features = (props) => {

	const [ showFront, setShowFront ] = useState(false);
	const [ showBack, setShowBack ] = useState(false);

	let frontContent = props.content.filter( item => item.fields.subSection === "frontOffice" ).sort((a,b) => a.fields.id - b.fields.id);
	let backContent = props.content.filter( item => item.fields.subSection === "backOffice").sort((a,b) => a.fields.id - b.fields.id);

	let frontOfficeList = frontContent.map((item, index) => {
			let image; 
			if (item.fields.image !== undefined) image = item.fields.image[0].url;

			let lines = item.fields.title.split('(');
			let titles = [];
			for (var i = 0; i < lines.length; i++) {
				//make sure no empty lines
				if (lines[i].length > 1) {
					titles.push(<h4 key={i}>{lines[i].replace(")", "")}</h4>)
				}
			}

			return (
				<div key={index} className={classNames(
						styles.featureItem, 
						index > 2 && !showFront ? styles.hide : 
						index > 2 && showFront ? styles.show : null)}>
					<div className={styles.image}>
						<img src={item.fields.image === undefined ? Placeholder : image} />
					</div>
					{titles}
					<p>{item.fields.content}</p>
				</div>
			)
	})

	let backOfficeList = backContent.map((item, index) => {
			let image; 
			if (item.fields.image !== undefined) image = item.fields.image[0].url;

			let lines = item.fields.title.split('(');
			let titles = [];
			for (var i = 0; i < lines.length; i++) {
				//make sure no empty lines
				if (lines[i].length > 1) {
					titles.push(<h4 key={i}>{lines[i].replace(")", "")}</h4>)
				}
			}

			return (
				<div key={index} className={classNames(
						styles.featureItem, 
						index > 2 && !showBack ? styles.hide : 
						index > 2 && showBack ? styles.show : null)}>
					<div className={styles.image}>
						<img src={item.fields.image === undefined ? Placeholder : image} />
					</div>
					{titles}
					<p>{item.fields.content}</p>
				</div>
			)
	})

	return ( 
		<div className={styles.container} ref={props._ref} id="services" ref={props._ref}>
			<div className={styles.content}>
				<Pill title="services" color="red" />
				<h2>front office services</h2>
				<div className={styles.featureContainer}>
					{frontOfficeList}
				</div>
				<div className={styles.buttonContainer} onClick={() => { setShowFront(!showFront); }}><button>{showFront ? "Hide ↑" : "See All ↓"}</button></div>

				<h2>back office services</h2>
				<div className={styles.featureContainer}>
					{backOfficeList}
				</div>
				<div className={styles.buttonContainer} onClick={() => setShowBack(!showBack)}><button>{showBack ? "Hide ↑" : "See All ↓"}</button></div>
			</div>
			<img src={BG} className={styles.BG}/>
		</div>
	)
}

export default Features;