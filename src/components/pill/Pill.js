import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

const Pill = (props) => {
	return (
		<div className={styles.pillContainer}>
			<div className={classNames(styles.pill, styles[props.color])}>
				<p>{props.title}</p>
			</div>
		</div>
	)
}

export default Pill;