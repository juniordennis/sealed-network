<template>
	<div class="container">
    	<h1>
    		Create Employee
    	</h1>
    	<div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
			<strong>Error!</strong> {{ errorMessage }}
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
    	<div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
			<strong>Success!</strong> {{ successMessage }}
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
    	<button type="button" class="btn btn-secondary mb-2" v-on:click="addRow">Add row</button>
    	<form v-on:submit.prevent="onSubmit">
    		<div class="row" v-for="(row, index) in rows">
    			<div class="col-md-5">
    				<div class="form-group">
			    		<!-- <label>Login</label> -->
			    		<input type="text" name="login" v-model="row.login" placeholder="Login" class="form-control">
			    	</div>
    			</div>
    			<div class="col-md-6">
    				<div class="form-group">
			    		<!-- <label>Name</label> -->
			    		<input type="text" name="name" v-model="row.name" placeholder="Name" class="form-control">
			    	</div>
    			</div>
    			<div class="col-md-1">
    				<button type="button" class="btn btn-danger" v-on:click="removeRow(index)">Remove</button>
    			</div>
    		</div>
    		<div class="row">
    			<div class="col-md-12">
    				<button type="submit" class="btn btn-primary">Submit</button>
    			</div>
    		</div>
    	</form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            rows: [{ login: '', name: '' }],
        	errorMessage: '',
        	successMessage: '',
        };
    },
    methods: {
    	addRow: function() {
    		this.rows.push({ login: '', name: '' });
    	},
    	removeRow: function(index) {
    		this.rows.splice(index, 1);
    	},
    	onSubmit: function(e) {
    		axios.post('api/employees/create', { employees: this.rows })
    			.then(res => {
    				this.rows = [{ login: '', name: '' }];
    				this.successMessage = 'Employee successfully added';
    			})
    			.catch(e => {
    				console.error(e);
    				this.errorMessage = e.response.data.message;
    			});
    	}
    }
};
</script>