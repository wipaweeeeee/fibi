import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import Pill from '../pill/Pill';
import Placeholder from '../../assets/general.svg';
import BG from '../../assets/service_bg.svg';

const Features = (props) => {

	const [ show, setShow ] = useState(false);

	let frontContent = props.content.filter( item => item.fields.subSection === "frontOffice" ).sort((a,b) => a.fields.id - b.fields.id);
	let backContent = props.content.filter( item => item.fields.subSection === "backOffice").sort((a,b) => a.fields.id - b.fields.id);

	const featureList = (office) => {
		let featureList;
		if (office === "frontOffice") {
			featureList = frontContent;
		} else if (office === "backOffice") {
			featureList = backContent;
		}

		let list = featureList.map((item, index) => {
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
					<div key={index} className={classNames(styles.featureItem, index > 2 && !show ? styles.hide : index > 2 && show ? styles.show : null)}>
						<div className={styles.image}>
							<img src={item.fields.image === undefined ? Placeholder : image} />
						</div>
						{titles}
						<p>{item.fields.content}</p>
					</div>
				)
		})

		return list;
	}


	return ( 
		<div className={styles.container}>
			<div className={styles.content}>
				<Pill title="services" color="red" />
				<h2>front office services</h2>
				<div className={styles.featureContainer}>
					{featureList("frontOffice")}
				</div>
				<div className={styles.buttonContainer} onClick={() => setShow(!show)}><button>{show ? "Hide ↑" : "See All ↓"}</button></div>

				<h2>back office services</h2>
				<div className={styles.featureContainer}>
					{featureList("backOffice")}
				</div>
			</div>
			<img src={BG} className={styles.BG}/>
		</div>
	)
}

export default Features;