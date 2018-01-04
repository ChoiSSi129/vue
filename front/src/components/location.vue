<template>
	<div class="ui container">
		<vuetable ref="vuetable"
			api-url="/api/locationData"
			:fields="fields"
			:per-page = "perPage"
			pagination-path=""
			@vuetable:pagination-data="onPaginationData"
		></vuetable>
		<vuetable-pagination ref="pagination"
			@vuetable-pagination:change-page="onChangePage"
		></vuetable-pagination>
    </div>
</template>

<script>
import accounting from 'accounting'
import moment from 'moment'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'

export default {
	components: {
		Vuetable,
		VuetablePagination
	},

	data(){
		return{
			fields: [
				'가맹점', '주소', '대표자', 'tel', '타입', 'lat', 'lng', '이메일'
			], 
			perPage: 10
		}
	},
	
	methods: {
		// transform (data) {
		// 	let transformed = {}
		// 	transformed.pagination = {
		// 		total: data.data.length,
		// 		per_page: 10,
		// 		current_page: 1,
		// 		last_page: Math.ceil(data.data.length/10),
		// 		next_page_url: data.next_page_url,
		// 		prev_page_url: data.prev_page_url,
		// 		from: data.from,
		// 		to: data.to
		// 	}

		// 	transformed.data = []
		// 	data = data.data
		// 	for (let i = 0; i < data.length; i++) {
		// 		transformed['data'].push({
		// 			id: data[i].id,
		// 			가맹점: data[i].가맹점,
		// 			주소: data[i].주소,
		// 			대표자: data[i].대표자,
		// 			tel: data[i].tel,
		// 			타입: data[i].타입,
		// 			lat: data[i].lat,
		// 			lng: data[i].lng,
		// 			이메일: data[i].이메일,
		// 		})
		// 	}

		// 	return transformed
		// },
	
		onPaginationData (paginationData) {
			this.$refs.pagination.setPaginationData(paginationData)
		},
		onChangePage (page) {
			this.$refs.vuetable.changePage(page)
		}
	}
}
</script>