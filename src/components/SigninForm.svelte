<script lang="ts">
	import Email from '$lib/input/Email.svelte';
	import axios from 'axios';
	import { config } from '$lib/vars';

	let data: any;
	$: data = {
		email: '',
		password: ''
	};
	$: error = {
		msg: ''
	};
	$: loading = false;

	const onSubmit = async () => {
		if (data.email && data.password) {
			loading = true;
			try {
				const { data: apiRes } = await axios.post(`${config.ENDPOINT_URL}auth/local`, {
					identifier: data.email,
					password: data.password
				});
				if (apiRes?.jwt) {
					localStorage.setItem('jwt', apiRes?.jwt);
					localStorage.setItem('email', apiRes?.user.email);
					localStorage.setItem('username', apiRes?.user.username);
					loading = false;
					return (location.href = '/');
				}
			} catch (err) {
				console.log(error);
				loading = false;
				error.msg = 'Please fill correct details.';
				localStorage.removeItem('jwt');
				localStorage.removeItem('email');
				localStorage.removeItem('username');
			}
		}
	};
</script>

<section class="h-screen">
	<div class="px-6 h-full text-gray-800">
		<div
			class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
		>
			<div
				class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
			>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
					class="w-full"
					alt="Sample image"
				/>
			</div>
			<div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
				<div class="flex flex-row items-center justify-center lg:justify-start">
					<p class="text-sm font-semibold mt-2 mr-4 pt-1 mb-0">Sign in with</p>
					<!-- google button -->
					<button
						id="customBtn"
						type="button"
						data-mdb-ripple="true"
						data-mdb-ripple-color="light"
						class="inline-block mt-3"
					>
						<svg
							class="inline-block h-8 cursor-pointer"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							viewBox="0 0 48 48"
							><defs
								><path
									id="a"
									d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
								/></defs
							><clipPath id="b"><use xlink:href="#a" overflow="visible" /></clipPath><path
								clip-path="url(#b)"
								fill="#FBBC05"
								d="M0 37V11l17 13z"
							/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" /><path
								clip-path="url(#b)"
								fill="#34A853"
								d="M0 37l30-23 7.9 1L48 0v48H0z"
							/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" /></svg
						>
					</button>
					<!-- fb button -->
					<button type="button" class="fb-login-button px-2 inline-block mt-3" id="fbLogin">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="40px" height="40px"
							><path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" /><path
								fill="#fff"
								d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
							/></svg
						>
					</button>
					<!-- twitter button -->
					<button type="button" class="fb-login-button inline-block mt-3" id="fbLogin">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="40px" height="40px"
							><path
								fill="#03A9F4"
								d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
							/></svg
						>
					</button>
					<!-- to start google oauth -->
					<script>
						startApp();
					</script>
					<script>
						$('#signinButton').click(function () {
							// signInCallback defined in step 6.
							auth2.grantOfflineAccess().then(signInCallback);
						});
					</script>
					<!-- fb auth -->
					<script>
						function statusChangeCallback(response) {
							if (response.status === 'connected') {
								testAPI();
							} else if (response.status === 'not_authorized') {
								FB.login(
									function (response) {
										statusChangeCallback2(response);
									},
									{ scope: 'public_profile,email' }
								);
							} else {
							}
						}
						function statusChangeCallbackClicked(response) {
							FB.login(
								function (response) {
									statusChangeCallback2(response);
								},
								{ scope: 'public_profile,email' }
							);
						}
						function statusChangeCallback2(response) {
							if (response.status === 'connected') {
								testAPI();
								location.href = '/';
							} else if (response.status === 'not_authorized') {
								console.log('still not authorized!');
							} else {
								// alert("not connected, not logged into facebook, we don't know");
							}
						}

						function checkLoginState() {
							FB.getLoginStatus(function (response) {
								statusChangeCallback(response);
								localStorage.setItem('jwt', response?.authResponse.accessToken);
							});
						}
						function checkLoginStateClicked() {
							FB.getLoginStatus(function (response) {
								statusChangeCallbackClicked(response);
								localStorage.setItem('jwt', response?.authResponse.accessToken);
							});
						}
						function testAPI() {
							FB.api('/me?fields=name,email', function (response) {
								localStorage.setItem('email', response?.email);
								localStorage.setItem('username', response?.name);
							});
						}

						$(document).ready(function () {
							FB.init({
								appId: '676251100098701',
								autoLogAppEvents: true,
								xfbml: true,
								version: 'v15.0'
							});
							checkLoginState();
						});
					</script>
					<script>
						$('#fbLogin').click(function () {
							checkLoginStateClicked();
						});
					</script>
					<!-- twitter auth -->
					<script>
						window.twttr = (function (d, s, id) {
							var js,
								fjs = d.getElementsByTagName(s)[0],
								t = window.twttr || {};
							if (d.getElementById(id)) return t;
							js = d.createElement(s);
							js.id = id;
							js.src = 'https://platform.twitter.com/widgets.js';
							fjs.parentNode.insertBefore(js, fjs);

							t._e = [];
							t.ready = function (f) {
								t._e.push(f);
							};

							return t;
						})(document, 'script', 'twitter-wjs');
					</script>
				</div>

				<div
					class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
				>
					<p class="text-center font-semibold mx-4 mb-0">Or</p>
				</div>

				{#if error.msg.length > 0}
					<div class="text-red-500 font-bold my-2">{error.msg}</div>
				{/if}
				<form on:submit|preventDefault={onSubmit}>
					<!-- Email input -->
					<div class="mb-6">
						<Email bind:value={data.email} title="Email address" />
					</div>

					<!-- Password input -->
					<div class="mb-6">
						<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
						<input
							bind:value={data.password}
							type="password"
							name="password"
							class={`shadow-sm ${
								data.password.length < 0
									? `focus:ring-red-500 focus:border-red-500 border-red-300`
									: `focus:ring-indigo-500 focus:border-indigo-500 border-gray-300`
							} block w-full sm:text-sm rounded-md`}
						/>
					</div>

					<!-- <div class="flex justify-between items-center mb-6">
						<div class="form-group form-check">
							<input
								type="checkbox"
								class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
								id="exampleCheck2"
							/>
							<label class="form-check-label inline-block text-gray-800" for="exampleCheck2"
								>Remember me</label
							>
						</div>
						<a href="#!" class="text-gray-800">Forgot password?</a>
					</div> -->

					<div class="text-center lg:text-left">
						<button
							type="submit"
							class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
						>
							{loading ? 'Loading...' : 'Login'}
						</button>
						<p class="text-sm font-semibold mt-2 pt-1 mb-0">
							Don't have an account?
							<a
								href="register"
								class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
								>Register</a
							>
						</p>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>
