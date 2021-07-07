import React, { useRef, useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Pill from '../pill/Pill';

import FB from '../../assets/fb.svg';
import Line from '../../assets/line.svg';
import Blogspot from '../../assets/blogspot.svg';

const Contact = (props) => {

	const year = new Date().getFullYear();
	let content = props.content.map((item, index) => {

		if (item.fields.title == undefined) {
			let lines = item.fields.content.split(';');
		
			let descItems = [];
			for (var i = 0; i < lines.length; i++) {
				//make sure no empty lines
				if (lines[i].length > 1) {
					descItems.push(<p key={i}>{lines[i]}</p>)
				}
			}

			return (
				<div className={styles.set} key={index}>{descItems}</div>
			)
		}
	})	

	const socialLink = (social, img) => {
		let link = props.content.map((item, index) => {
			if (item.fields.title === social) {
				return (
					<a href={item.fields.content} target="_blank" key={index}><img src={img} /></a>
				)
			}
		})

		return link;
	}

	return (
		<div className={styles.container} id="contact" ref={props._ref}>
			<div className={styles.content}>
				<Pill title="contact" color="black" />
				<div className={styles.text}>
					<div className={styles.set}>
						Interested in working with us? <br /> 
						Get in touch here:
					</div>
					{content}
					<div className={styles.social}>
						{socialLink("facebook", FB)}
						{socialLink("line", Line)}
						{socialLink("blogspot", Blogspot)}
					</div>
				</div>
				<div className={styles.mapContainer}>
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.952243216998!2d100.617238451!3d13.78175249028055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29dff5709337b%3A0x9203883ee1b18d07!2sInfo-D%20Software%20Co.%2CLtd.!5e0!3m2!1sen!2sus!4v1625626096075!5m2!1sen!2sus" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy"></iframe>
				</div>
				<div className={styles.copyrights}>
					<p>copyright {year} info-d software co ltd.</p>
					<p>all rights reserved</p>
				</div>
			</div>
		</div>
	)
}

export default Contact;