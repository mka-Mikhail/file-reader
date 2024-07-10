<template>
	<q-page class="q-pa-md q-gutter-y-lg">
		<div class="row q-gutter-x-md">
			<div class="col">
				<q-file v-model="file" @update:model-value="getFile" clearable label="Выбрать файл" outlined>
					<template #prepend>
						<q-icon name="attach_file" />
					</template>
				</q-file>
			</div>
			<div class="col-auto">
				<q-btn color="primary" unelevated label="получить данные" :disable="file === null ? true : false" @click="getData" />
			</div>
		</div>
		<q-inner-loading :showing="visibleLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
	</q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'

let file = ref(null)
let pathToFile
let visibleLoading = ref(false)

onMounted(() => {
	window.api.on('file-has-been-read', () => {
		visibleLoading.value = false
	})
})

const getFile = () => {
	if (file.value !== null) {
		pathToFile = file.value.path
	}
}

const getData = () => {
	window.api.invoke('read-file', pathToFile)
	visibleLoading.value = true
}
</script>
