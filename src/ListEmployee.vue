<template>
    <div class="container">
    	Current sort: {{ sort }}
    	<div class="row">
    		<div class="col-md-12">
				<table class="table table-responsive">
					<thead>
						<tr>
							<th>ID</th>
							<th @click="toggleSort('login')">Login</th>
							<th @click="toggleSort('name')">Name</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="data.length > 0" v-for="d in data">
							<td>{{ d.id }}</td>
							<td>{{ d.login }}</td>
							<td>{{ d.name }}</td>
						</tr>
						<tr v-else>
							<td colspan="3">No data</td>
						</tr>
					</tbody>
				</table>
				Page {{ this.page }} of {{ this.totalPage }}
				<p>
					<button class="btn btn-secondary" @click="prev">Previous</button> 
					<button class="btn btn-secondary" @click="next">Next</button>
				</p>
    		</div>
    	</div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
	created() {
		this.load();
	},
    data() {
        return {
        	data: [],
        	limit: 5,
        	page: 1,
        	totalPage: 0,
        	sort: '+login'
        };
    },
    methods: {
    	load: function() {
    		let searchParams = new URLSearchParams();
    		searchParams.set('limit', this.limit);
    		const offset = (this.page - 1) * this.limit;
    		searchParams.set('offset', offset);
    		searchParams.set('sort', this.sort);

    		axios.get('api/employees?' + searchParams.toString())
				.then(res => {
					this.data = res.data.rows;
					this.totalPage = Math.ceil(res.data.count / this.limit);
				})
				.catch(e => {
					console.error(e);
				});
    	},
    	toggleSort: function(fieldName) {
    		const direction = this.sort.substring(0, 1);
    		const curFieldName = this.sort.substring(1, this.sort.length);
    		if (curFieldName === fieldName) {
    			if (direction === '+') {
    				this.sort = '-' + fieldName;
    			} else {
    				this.sort = '+' + fieldName;
    			}
    		} else {
    			this.sort = '+' + fieldName;
    		}
    		this.load();
    	},
    	next: function() {
    		if (this.page < this.totalPage) {
    			this.page++;
    			this.load();
    		}
    	},
    	prev: function() {
    		if (this.page !== 1) {
    			this.page--;
    			this.load();
    		}
    	}

    }
};
</script>