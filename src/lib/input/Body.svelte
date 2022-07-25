<script lang="ts">
	import type { FormType } from "$lib/types";
	export let value: string;
	export let type: FormType;
</script>

<div class="sm:col-span-6 mt-6">
	<label for="body" class="block text-sm font-medium text-gray-700">
		{type === "individual"
			? "In 100 words or less give us reasons to award you our grant."
			: "Justify your organization's eligibility for our grant award, highlighting the benefit to the public."}
	</label>
	<div class="mt-1">
		<textarea
			bind:value
			id="body"
			name="body"
			rows="3"
			class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md" />
	</div>
	<p class="mt-2 text-sm text-gray-500">Write a few sentences about your reasons.</p>
</div>
