<script lang="ts">
    import { validate } from "$lib/formValidation";
	export let value: string;
    let valid: boolean = true;

    const onInput = () => {
        valid = validate.age(value);
    }
</script>

<div class="sm:col-span-3 justify-center">
	<label for="birthday" class="block text-sm font-medium text-gray-700">Date of Birth</label>
	<div class="mt-1">
		<input
			bind:value={value}
            on:input={onInput}
			type="date"
			name="birthday"
			id="birthday"
			autocomplete="bday"
			required
			class={`shadow-sm ${
				valid
					? `focus:ring-indigo-500 focus:border-indigo-500 border-gray-300`
					: `focus:ring-red-500 focus:border-red-500 border-red-300`
			} block w-full sm:text-sm rounded-md`}
			aria-describedby="birthday-description"
		/>
		<p class={`mt-2 text-sm ${valid ? `text-gray-500` : `text-red-500`}`} id="birthday-description">
			Must be over 18 years old
		</p>
	</div>
</div>
