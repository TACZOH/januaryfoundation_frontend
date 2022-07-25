const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						height: '100%',
						'max-width': '100%',
						a: {
							color: '#7377df',
							textDecoration: 'none',
							'&:hover': {
								textDecoration: 'underline',
								color: '#7377df'
							}
						},
						p: {
							margin: 0,
							'margin-bottom': 28,
							'font-size': 18,
							width: '100%',
							'max-width': '896px',
							'align-self': 'center',
							'text-align': 'left'
						},
						img: {
							'margin-top': 0,
							width: '90%'
						},
						h1: {
							margin: 0,
							'margin-bottom': '1.25rem',
							'margin-top': '1.5rem',
							'font-size': '2.25rem',
							'line-height': '2.5rem',
							width: '100%',
							'max-width': '896px',
							'align-self': 'center',
							'text-align': 'left',
							fontWeight: 'bold'
						},
						h2: {
							width: '100%',
							'max-width': '896px',
							'align-self': 'center',
							'text-align': 'left',
							fontWeight: 'bold',
							'margin-bottom': 18,
							'margin-top': '1.5rem',
							'font-size': '2rem'
						},
						h3: {
							width: '100%',
							'max-width': '896px',
							'align-self': 'center',
							'text-align': 'left',
							fontWeight: 'bold',
							'margin-bottom': 10,
							'margin-top': '1.25rem',
							'font-size': '1.5rem'
						},
						h4: {
							width: '100%',
							'max-width': '896px',
							'align-self': 'center',
							'text-align': 'left',
							fontWeight: 'bold',
							'margin-bottom': 8,
							'margin-top': '1rem',
							'font-size': 20
						},
						h5: {
							width: '100%',
							'max-width': '896px',
							'align-self': 'center',
							'text-align': 'left',
							fontWeight: 'bold',
							'margin-bottom': 8,
							'margin-top': '0.75rem',
							'font-size': 20
						},
						h6: {
							width: '100%',
							'max-width': '896px',
							'align-self': 'center',
							'text-align': 'left',
							fontWeight: 'bold',
							'margin-bottom': 8,
							'margin-top': 8,
							'font-size': 18
						},
						pre: {
							'max-width': '768px',
							width: '100%',
							'margin-top': '1rem',
							'margin-bottom': '50px',
							padding: '2rem',
							'background-color': '#292c34',
							'font-size': '13px'
						},
						ul: {
							width: '100%',
							'max-width': '896px',
							'align-self': 'center',
							'text-align': 'left',
							padding: '15px 0 30px 30px'
						},
						li: {
							padding: 0,
							'padding-bottom': 15,
							margin: 0,
							'font-size': 18,

							'&:last-child': {
								'padding-bottom': 0
							}
						}
					}
				}
			}
		}
	},

	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};

module.exports = config;
