<template>
    <div class="container mt-5">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6">
                <div class="card px-5 py-5">
                    <h3 class="text-muted">Login to account</h3>
                    <form @submit.prevent="submitForm">
                        <div v-if="errors.wrong_credentials" class="form-group mb-4 text-start">
                            <small v-if="errors.wrong_credentials" class="text-danger"> {{ errors.wrong_credentials
                            }}</small>
                        </div>
                        <div class="form-group mb-4 text-start">
                            <input class="form-control" type="text" placeholder="Enter your username" name="username"
                                v-model="username">
                            <small v-if="errors.username" class="text-danger"> {{ errors.username }}</small>
                        </div>
                        <div class="form-group mb-4 text-start">
                            <input class="form-control" type="password" placeholder="Enter your password" name="password"
                                v-model="password">
                            <small v-if="errors.password" class="text-danger"> {{ errors.password }}</small>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary w-100">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Home',
    data() {
        return {
            username: "",
            password: "",
            errors: {
                username: "",
                password: "",
                wrong_credentials: "",
            }

        }
    },
    methods: {
        isValidForm() {
            this.errors.username = !this.username ? "This field cannot be blank" : "";
            this.errors.password = !this.password ? "This field cannot be blank" : "";

            return !this.errors.username && !this.errors.password;
        },
        submitForm() {
            if (this.isValidForm()) {
                // console.log(this.username, this.password)
                const url = '/login/';
                axios.post(url, { username: this.username, password: this.password })
                    .then(response => {
                        this.$store.commit('setToken', response.data);
                        this.errors.wrong_credentials = "";
                        this.username = "";
                        this.password = "";
                    })
                    .catch(error => {
                        // console.log(error);
                        if (error.response.data.non_field_errors) {
                            this.errors.wrong_credentials = error.response.data.non_field_errors.join('');
                        }
                    })
            }
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>