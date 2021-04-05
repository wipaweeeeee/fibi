import React, { useRef, useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Pill from '../pill/Pill';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

import FB from '../../assets/fb.svg';
import Line from '../../assets/line.svg';
import Blogspot from '../../assets/blogspot.svg';

const Contact = (props) => {

	mapboxgl.workerClass = MapboxWorker;
	mapboxgl.accessToken = 'pk.eyJ1Ijoibmlja3NlZHoiLCJhIjoiY2ttcWk4eDlxMDg4ZDJ2dDdvZTRvcmlkZiJ9.SOBiD7cf5_nF4NvOuzvgCA'

	const mapContainer = useRef();
	const [ lang, setLang ] = useState(100.619482);
	const [ lat, setLat ] = useState(13.781787);
	const [ zoom, setZoom ] = useState(15);

	const year = new Date().getFullYear();
	var map;

	useEffect(() => {
		map = new mapboxgl.Map({
		container: mapContainer.current,
		style: 'mapbox://styles/mapbox/dark-v10', //'mapbox://styles/nicksedz/ckmo2ik6x01vt17oh9p5rnowo',
		center: [lang, lat],
		zoom: zoom
		});

		var marker = new mapboxgl.Marker({color: '#F53B3B'})
			.setLngLat([lang, lat])
			.setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false}).setHTML(
				`<h2 className=${styles.popup}>Info D Software</h2>`
			))
			.addTo(map)
			.togglePopup();
		 
		map.on('move', () => {
			setLang(map.getCenter().lng.toFixed(4));
			setLat(map.getCenter().lat.toFixed(4));
			setZoom(map.getZoom().toFixed(2));
		});

		map.on('load', function () {
		    map.resize();
		});

		map.on('click', () => {
			window.open('https://goo.gl/maps/zxMgJZFwnW72', '_blank');
		})
		 
	return () => map.remove();
	}, []);

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
					<a href={item.fields.content} target="_blank"><img src={img} /></a>
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
					<div className={styles.map} ref={mapContainer} />
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