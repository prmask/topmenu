import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

import classes from './Header.module.scss';

const Header = () => {
	const router = useRouter();

	const [menuOpen, setMenuOpen] = useState(false);

	const [size, setSize] = useState({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		const handleResize = () => {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (size.width > 768 && menuOpen) {
			setMenuOpen(false);
		}
	}, [size.width, menuOpen]);

	const menuToggleHandler = () => {
		setMenuOpen((p) => !p);
	};

	const ctaClickHandler = () => {
		menuToggleHandler();
		router.push('/CTA');
	};

	return (
		<section className={classes.header}>
			<div className={classes.header__content}>
				<Link href="/">
					<a className={classes.header__content__logo}>HostDoma.in</a>
				</Link>

				<nav
					className={`${classes.header__content__nav} ${
						menuOpen && size.width < 768 ? classes.isMenu : ''
					}`}
				>
					<ul>
						<li>
							<Link href="/Blog">
								<a onClick={menuToggleHandler}>Blog</a>
							</Link>
						</li>
						<li>
							<Link href="/Login">
								<a onClick={menuToggleHandler}>Login</a>
							</Link>
						</li>
					</ul>
					<button onClick={ctaClickHandler}>$2.69 Trials</button>
				</nav>
				<div className={classes.header__content__toggle}>
					{menuOpen ? (
						<AiOutlineClose onClick={menuToggleHandler} />
					) : (
						<BiMenuAltRight onClick={menuToggleHandler} />
					)}
				</div>
			</div>
		</section>
	);
};

export default Header;
