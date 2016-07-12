import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
	base: {
		height: '50px',
		fontSize: '14px',
		padding: 0,
		lineHeight: '50px',
		letterSpacing: '0.1em',
		cursor: 'pointer',
		position: 'relative',
		marginRight: '1px',

		':hover': {
			boxShadow: '0 1px 3px 1px rgba(0,0,0,.15)',
		},

		'@media (max-width: 1024px)': {
			width: '100%',
			display: 'block',
			height: 'auto',
		},
	},

	a: {
		textDecoration: 'none',
		color: '#000',
		padding: '0 20px',
		display: 'block',
		height: '100%',
		lineHeight: '50px',

		':hover': {
			textDecoration: 'none',
		},
	},

	subNav: {
		display: 'flex',
		zIndex: '-100',
		opacity: 0,
		height: 0,
		overflow: 'hidden',
		position: 'absolute',
		top: '100%',
		left: '50%',
		transform: 'translateX(-50%)',
		margin: '0 auto',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		backgroundColor: '#FFF',
		borderRight: '1px solid #EEE',
		borderLeft: '1px solid #EEE',
		borderBottom: '1px solid #EEE',
		borderTop: '1px solid #FFF',
		boxShadow: '0 3px 3px 1px rgba(0,0,0,.15)',
		transition: 'opacity 0.2s ease-out',

		'@media (max-width: 1024px)': {
			position: 'relative',
			width: '100%',
			display: 'none',
		},
	},
	subNavOpened: {
		height: 'auto',
		zIndex: '101',
		opacity: '1',

		'@media (max-width: 1024px)': {
			display: 'block',
			top: 0,
		},
	},

	subNavItem: {
		height: 'auto',
		fontSize: '14px',
		lineHeight: '30px',
		letterSpacing: '0.1em',
		cursor: 'pointer',
		position: 'relative',
		backgroundColor: '#FFF',
		whiteSpace: 'nowrap',
		textAlign: 'center',
		transition: 'box-shadow 0.2s ease-out',
		display: 'block',
		overflow: 'auto',

		':hover': {
			boxShadow: '0 1px 3px 1px rgba(0,0,0,.15)',
			zIndex: '102',
		},
	},
	subNavItemA: {
		textDecoration: 'none',
		color: '#000',
		zIndex: '103',
		width: '100%',
		height: '100%',
		display: 'block',
		padding: '5px 30px',
		boxSizing: 'border-box',

		':hover': {
			textDecoration: 'none',
		},
	},
};

const SubNavItem = Radium(({ text, href, handleCloseNav }) => (
	<div key={text + href} style={styles.subNavItem}>
		<a
			style={styles.subNavItemA}
			href={href}
			onClick={e => {
				e.stopPropagation();
				handleCloseNav();
			}}
		>
			{text}
		</a>
	</div>
));

const SubNav = Radium(({ nav, opened, handleCloseNav }) => (
	<div style={[styles.subNav, opened && styles.subNavOpened]}>
		{nav.map(item => (
			<SubNavItem
				key={item.href}
				text={item.text}
				href={item.href}
				handleCloseNav={handleCloseNav}
			/>
		))}
	</div>
));

class NavItem extends Component {
	constructor(props) {
		super(props);

		this.state = { hover: false };

		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleMouseEnter(e) {
		e.preventDefault();
		if (window.innerWidth >= 1024) {
			this.setState({ hover: true });
		}
	}
	handleMouseLeave(e) {
		e.preventDefault();
		if (window.innerWidth >= 1024) {
			this.setState({ hover: false });
		}
	}
	handleClick(e) {
		if (this.props.subNav) {
			e.preventDefault();
			e.stopPropagation();
			const { hover } = this.state;

			this.setState({ hover: !hover });
		}
	}

	render() {
		const { href, text, subNav } = this.props;
		const { hover } = this.state;

		return (
			<div
				key={href + text}
				style={styles.base}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
				onClick={this.handleClick}
			>
				<a style={styles.a} href={href}>{text}</a>
				{subNav ? (
					<SubNav
						opened={hover}
						nav={subNav}
						handleCloseNav={this.props.handleCloseNav}
					/>
				) : ''}
			</div>
		);
	}
}

export default Radium(NavItem);
