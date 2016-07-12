import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import NavItem from './Nav-item';

const searchbarInputActive = {
	width: '150px',
	fontSize: '14px',
	outline: 'none',
	borderRadius: '15px',
	borderColor: '#555',
	padding: '4px 5px 4px 22px',
	zIndex: '105',
};

const styles = {
	base: {
		display: 'block',
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '50px',
		backgroundColor: '#FFF',
		padding: '0px',
		boxSizing: 'border-box',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottom: '1px solid #EEE',
		boxShadow: '0 3px 3px 1px rgba(0,0,0,.15)',
		zIndex: '100',
	},

	brandLogo: {
		height: '30px',
		alignSelf: 'flex-start',
		width: 'auto',
		padding: '10px 20px',
		display: 'inline-block',
	},
	brandLogoImg: {
		maxHeight: '100%',
		height: '100%',
	},

	nav: {
		float: 'right',

		'@media (max-width: 1024px)': {
			position: 'absolute',
			top: '-5px',
			left: 0,
			width: '100%',
			zIndex: '99',
			opacity: 0,
			transform: 'translateY(-100%)',
			transition: 'transform 0.2s ease-out, top 0.2s ease-out, opacity 0.2s ease-out', // eslint-disable-line
		},
	},
	navChecked: {
		'@media (max-width: 1024px)': {
			top: '50px',
			transform: 'translateY(0%)',
			opacity: '1',
		},
	},

	menuIcon: {
		position: 'absolute',
		left: '-9999px',

		'@media (max-width: 1024px)': {
			left: 0,
			display: 'inline-block',
			float: 'left',
			border: '1px solid #CCC',
			height: '30px',
			width: '30px',
			margin: '10px 0 10px 15px',
			cursor: 'pointer',
			position: 'relative',
			zIndex: '101',
		},
	},
	menuIconPseudo: {
		bottom: 0,
		right: 0,
		margin: 'auto',
		boxSizing: 'padding-box',
		backgroundColor: '#555',
		position: 'absolute',
		left: 0,
		top: 0,
	},
	menuIconBefore: {
		height: '60%',
		width: '2.5px',
		opacity: 0,
		transition: 'transform .2s ease-out, opacity .2s ease-out',
	},
	menuIconBeforeChecked: {
		transform: 'rotate(45deg)',
		opacity: '1',
	},
	menuIconAfter: {
		height: '2.5px',
		borderRadius: '2.5px',
		width: '60%',
		boxShadow: '0 6px 0 0 #555,0 -6px 0 0 #555',
		transition: 'transform .2s ease-out, box-shadow .2s ease-out',
	},
	menuIconAfterChecked: {
		transform: 'rotate(45deg)',
		boxShadow: 'none',
	},

	navbarWrapper: {
		display: 'flex',
		alignSelf: 'flex-end',
		height: '100%',
		float: 'left',

		'@media (max-width: 1024px)': {
			width: '100%',
		},
	},
	navbar: {
		listStyle: 'none',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 0,
		margin: 0,
		position: 'relative',

		'@media (max-width: 1024px)': {
			flexDirection: 'column',
			backgroundColor: '#FFF',
			width: '100%',
			boxShadow: '0 3px 3px rgba(0, 0, 0, 0.15)',
			display: 'block',
		},
	},

	otherList: {
		display: 'flex',
		height: '50px',
		justifyContent: 'space-between',
		alignItems: 'center',
		fontSize: '14px',
		letterSpacing: '0.1em',
		float: 'left',

		'@media (max-width: 1024px)': {
			display: 'none',
		},
	},

	otherListA: {
		textDecoration: 'none',
		color: '#999',
		border: '1px solid #999',
		borderRadius: '20px',
		padding: '0 5px',
		lineHeight: '20px',
		margin: '0 5px',
		transition: 'color 0.2s ease-out, border-color 0.2s ease-out',

		':hover': {
			color: '#555',
			borderColor: '#555',
		},
	},

	searchbar: {
		display: 'flex',
		position: 'relative',
		margin: '0 5px',
	},
	searchbarInput: {
		position: 'absolute',
		left: '-2px',
		top: 0,
		bottom: 0,
		margin: 'auto 0',
		height: '20px',
		width: '20px',
		border: '1px solid #999',
		borderRadius: '20px',
		fontSize: 0,
		transition: 'width 0.2s ease-out, border-radius 0.2s ease-out, padding 0.2s ease-out, border-color 0.2s ease-out', // eslint-disable-line

		':focus': searchbarInputActive,
		':valid': searchbarInputActive,
	},
	searchbarLabel: {
		zIndex: '106',
		height: '20px',
		width: '20px',
		display: 'flex',
		fontSize: '14px',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#999',
		cursor: 'pointer',
		transition: 'color 0.2s ease-out',

		':hover': {
			color: '#555',
		},
	},

	sideLogo: {
		backgroundColor: '#102A7C',
		height: '100%',
		minWidth: '80px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0 25px',
		position: 'relative',
		marginLeft: '30px',
	},
	sideLogoImg: {
		width: '83px',
	},
	sideLogoBefore: {
		top: 0,
		right: '100%',
		height: 0,
		width: 0,
		borderBottom: '50px solid transparent',
		borderRight: '30px solid #102A7C',
		position: 'absolute',
	},
	sideLogoHide: {
		backgroundColor: 'transparent',
	},
	sideLogeBeforeHide: {
		borderRight: '30px solid transparent',
	},
};


class Nav extends Component {
	constructor(props) {
		super(props);

		this.state = { checked: false, searchExpand: false };

		this.handleChange = this.handleChange.bind(this);
		this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
		this.handleSearchKeyDown = this.handleSearchKeyDown.bind(this);
		this.handleSearchClick = this.handleSearchClick.bind(this);
		this.handleCloseNav = this.handleCloseNav.bind(this);
	}

	handleChange(e) {
		this.setState({ checked: e.target.checked && true });
	}
	handleSearchInputChange(e) {
		this.setState({ searchExpand: e.target.value && true });
	}
	handleSearchKeyDown(e) {
		if (e.key === 'Enter') {
			location.href = `result.php?keyword=${e.target.value}`;
		}
	}
	handleSearchClick(e) {
		if (this.state.searchExpand) {
			location.href = `result.php?keyword=${e.target.value}`;
		}
	}
	handleCloseNav() {
		this.setState({ checked: false });
	}

	render() {
		const { logo, logo2, logo2White, alt, nav, lang, fb } = this.props;
		const { checked, searchExpand } = this.state;

		return (
			<nav style={styles.base}>
				<a style={styles.brandLogo} href="index.php">
					<img style={styles.brandLogoImg} src={logo} alt={alt} />
				</a>

				<input
					type="checkbox"
					id="menu-icon"
					style={{ position: 'absolute', left: '-9999px' }}
					onChange={this.handleChange}
				/>
				<label htmlFor="menu-icon" style={styles.menuIcon}>
					<div
						style={[
							styles.menuIconPseudo,
							styles.menuIconBefore,
							checked && styles.menuIconBeforeChecked,
						]}
					></div>
					<div
						style={[
							styles.menuIconPseudo,
							styles.menuIconAfter,
							checked && styles.menuIconAfterChecked,
						]}
					></div>
				</label>

				<div style={[styles.nav, checked && styles.navChecked]}>
					<div style={styles.navbarWrapper}>
						<ul style={styles.navbar}>
							{nav.map((item, i) => (
								<NavItem
									key={i}
									{...item}
									handleCloseNav={this.handleCloseNav}
								/>
							))}
						</ul>
					</div>

					<div style={styles.otherList}>
						{lang ? (
							<a
								key="lang"
								style={styles.otherListA}
								href={lang}
							>中文</a>
						) : ''}
						<a key="fb" style={styles.otherListA} href={fb}>
							<i className="fa fa-facebook"></i>
						</a>
						<div style={styles.searchbar}>
							<input
								ref="seachbarInput"
								id="searchbar"
								type="text"
								placeholder="search"
								style={[
									styles.searchbarInput,
									searchExpand && searchbarInputActive,
								]}
								onChange={this.handleSearchInputChange}
								onKeyDown={this.handleSearchKeyDown}
								required
							></input>
							<label
								key="searchbarLabel"
								htmlFor="searchbar"
								style={styles.searchbarLabel}
								onClick={this.handleSearchClick}
							><i className="fa fa-search"></i></label>
						</div>
						<div
							style={[
								styles.sideLogo,
								(!logo2 || logo2White) && styles.sideLogoHide,
							]}
						>
							<div
								style={[
									styles.sideLogoBefore,
									(!logo2 || logo2White) &&
										styles.sideLogeBeforeHide,
								]}
							></div>
							{logo2 ? (
								<img
									style={styles.sideLogoImg}
									src={logo2}
									alt=""
								/>
							) : ''}
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

const NavStyled = Radium(Nav);

const NavWrapper = props => (
	<StyleRoot>
		<NavStyled {...props} />
	</StyleRoot>
);

export default NavWrapper;
