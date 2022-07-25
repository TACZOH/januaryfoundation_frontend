import { loadScript } from '@paypal/paypal-js';
import { config } from '$lib/vars';

const paypal = (amount: number, create: any) => {
	loadScript({
		'client-id': config.CLIENT
	}).then((paypal) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		paypal
			.Buttons({
				style: {
					color: 'gold',
					shape: 'rect',
					label: 'paypal',
					layout: 'vertical'
				},
				createOrder: function (data, actions) {
					// Set up the transaction
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									currency_code: 'USD',
									value: `${amount}`
								}
							}
						]
					});
				},
				onApprove: function (data, actions) {
					// Capture order after payment approved
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					return actions.order.capture().then(function (details) {
						create().then(async (result: any) => {
							location.href = `/housing-grant/${await result.data.id}`;
						});
						alert('Payment successful!');
					});
				},
				onError: function (err) {
					// Log error if something goes wrong during approval
					alert('Something went wrong');
					console.log('Something went wrong', err);
				}
			})
			.render('#contribute');
	});
};
