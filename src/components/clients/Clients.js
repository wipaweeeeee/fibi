import React from 'react';
import styles from './styles.module.scss';
import Pill from '../pill/Pill';
import BG from '../../assets/clients_bg.svg';

const clientTypes = ["tertiary care", "secondary care", "private hospital"];

const Clients = (props) => {

	const clientCount = (category) => {
		return props.content.filter( item => item.fields.subSection === category ).length;
	}

	let highlights = clientTypes.map((item, index) => {
		return (
			<React.Fragment key={index}>
				<div className={styles.num}>{clientCount(item)}</div>
				<div className={styles.text}>{item}</div>
			</React.Fragment>
		)
	})

	let clientList = props.content.map((item, index) => {
		let lines = item.fields.title.split('(');
		let titles = [];
		for (var i = 0; i < lines.length; i++) {
			//make sure no empty lines
			if (lines[i].length > 1) {
				titles.push(<p key={i}>{lines[i].replace(")", "")}</p>)
			}
		}

		return titles;
	})

	return (
		<div className={styles.container} id="clients" ref={props._ref}>
			<div className={styles.content}>
				<Pill title="clients" color="blue" />
				<div className={styles.highlight}>
					{highlights}
					<div className={styles.BGLine}>
						<img src={BG} className={styles.BG}/>
					</div>
				</div>
				<div className={styles.list}>
					{clientList}
				</div>
			</div>
		</div>
	)
}

export default Clients;