<template>
	<q-page class="flex flex-center">
		<q-stepper
			v-model="step"
			ref="stepper"
			color="primary"
			animated
		>
			<q-step
				:name="1"
				title="Выбрать файл"
				icon="add"
				:done="step > 1"
			>
				For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more.
			</q-step>
			<q-step
				:name="2"
				title="Данные"
				icon="table_chart"
				:done="step > 2"
			>
				An ad group contains one or more ads which target a shared set of keywords.
			</q-step>
			<template v-slot:navigation>
				<q-stepper-navigation>
					<q-btn @click="$refs.stepper.next()" color="primary" :label="step === 2 ? 'Выбрать файл' : 'Получить данные'" />
					<q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
				</q-stepper-navigation>
			</template>
		</q-stepper>
	</q-page>
</template>

<script setup>
import { ref } from 'vue'

let step = ref()
</script>
