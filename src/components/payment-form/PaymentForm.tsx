import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { BUTTON_TYPES } from '../button/Button';
import { FormContainer, PaymentButton, PaymentFormContainer } from './PaymentFormStyles';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../store/cart/cartSelector';
import { userSelector } from '../../store/user/userSelector';
import { FormEvent, useState } from 'react';
import { StripeCardElement } from '@stripe/stripe-js';

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

export function PaymentForm() {
	const stripe = useStripe();
	const elements = useElements();
	const amount = useSelector(selectCartTotal);
	const { currentUser } = useSelector(userSelector);
	const [isLoadingPayment, setIsLoadingPayment] = useState(false);

	const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!stripe || !elements) return;

		setIsLoadingPayment(true)

		const response = await fetch('/.netlify/functions/createPaymentIntent', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ amount: amount * 100 })
		}).then(res => res.json());

		const clientSecret = response.paymentIntent.client_secret

		const cardDetails = elements.getElement(CardElement);

		if (!ifValidCardElement(cardDetails)) return;

		const paymentResult = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: cardDetails,
				billing_details: {
					name: currentUser ? currentUser.displayName : 'Guest'
				}
			}
		})

		setIsLoadingPayment(false)

		if (paymentResult.error) {
			alert(paymentResult.error)
		} else {
			if (paymentResult.paymentIntent.status === 'succeeded') {
				alert('Payment successful')
			}
		}
	}

	return (
		<PaymentFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<h2>Credit Card Payment: </h2>
				<CardElement />
				<PaymentButton isLoading={isLoadingPayment} buttonType={BUTTON_TYPES.inverted}>Pay now</PaymentButton>
			</FormContainer>
		</PaymentFormContainer>
	);
}
