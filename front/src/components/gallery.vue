<template>
    <div class="ui container">
		<vuetable ref="vuetable"
			api-url="/api/galleryData"
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
				'모델명', '제품명', '라벨표', '자동차모델'
            ]
		}
    },

    methods: {
		onPaginationData (paginationData) {
			this.$refs.pagination.setPaginationData(paginationData)
		},
		onChangePage (page) {
			this.$refs.vuetable.changePage(page)
		}
	}
}
</script>