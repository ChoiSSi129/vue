<template>
	<div class="ui container">
      <vuetable ref="vuetable"
        api-url="https://vuetable.ratiw.net/api/users"
        :fields="fields"
        pagination-path=""
        @vuetable:pagination-data="onPaginationData"
      ></vuetable>
      <vuetable-pagination ref="pagination"
    @vuetable-pagination:change-page="onChangePage"
  ></vuetable-pagination>
    </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import accounting from 'accounting'
import moment from 'moment'

export default {
	components: {
		Vuetable,
		VuetablePagination
	},

	data(){
		return{
			fields: [
				'id', 'name', 'nickname', 'email', 'age', 'birthdate', 'gender', 'address', 'created_at', 'fghjfgjfgj'
			],
			perPage: 10
		}
	},
	
	methods: {
		// transform (data) {
		// 	let transformed = {}
		// 	transformed.pagination = {
		// 		total: data.total,
		// 		per_page: data.per_page,
		// 		current_page: data.current_page,
		// 		last_page: data.last_page,
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
		// 			name: data[i].name,
		// 			nickname: data[i].nickname,
		// 			email: data[i].email,
		// 			age: data[i].age,
		// 			birthdate: data[i].birthdate,
		// 			gender: data[i].gender,
		// 			address: data[i].address.line1 + ' ' + data[i].address.line2 + ' ' + data[i].address.zipcode
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