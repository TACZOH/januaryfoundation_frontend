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
				const { data: apiRes } = await axios.post(`${config.ENDPOINT_URL}/auth/local`, {
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
					<button
						id="customBtn"
						type="button"
						data-mdb-ripple="true"
						data-mdb-ripple-color="light"
						class="inline-block mt-3"
					>
						<svg class="inline-block h-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
					</button>
					<script>
						startApp();
					</script>
					<script>
						$('#signinButton').click(function () {
							// signInCallback defined in step 6.
							auth2.grantOfflineAccess().then(signInCallback);
						});
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
