import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Vid from '../../assets/header_video.mp4';
import Gif from '../../assets/header.gif';

const Hero = (props) => {

	const [ showVid, setShowVid ] = useState();

	useEffect(() => {
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		  // hide video on mobile device
		  setShowVid(false);
		} else {
		  // show vid on desktop
		  setShowVid(true);
		}
	})

	return (
		<div className={styles.container} id="home">
			{ showVid && 
				<video autoPlay loop muted src={Vid} className={styles.video} />
			}
			{ !showVid && 
				<img src={Gif} className={styles.gif}/>
			}
		</div>
	)
}

export default Hero;