<template>
    <div class="container mt-5">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6">
                <div class="card px-5 py-5">
                    <h3 class="text-muted">Signup to account</h3>
                    <form @submit.prevent="submitForm">

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
                        <div class="form-group mb-4 text-start">
                            <input class="form-control" type="password" placeholder="Re-type your password" name="password2"
                                v-model="password2">
                            <small v-if="errors.password2" class="text-danger"> {{ errors.password2 }}</small>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary w-100">Signup</button>
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
    name: 'SignUp',
    data() {
        return {
            username: "",
            password: "",
            password2: "",
            errors: {
                username: "",
                password: "",
                password2: "",
            }

        }
    },
    methods: {
        isValidForm() {
            this.errors.username = !this.username ? "This field cannot be blank" : "";
            this.errors.password = !this.password ? "This field cannot be blank" : "";
            this.errors.password2 = this.password && this.password2 && this.password2 != this.password ? "Password mismatched" : "";

            return !this.errors.username && !this.errors.password && !this.errors.password2;
        },
        submitForm() {
            if (this.isValidForm()) {
                // console.log(this.username, this.password, this.password2)
                const url = '/auth/users/';
                axios.post(url, { username: this.username, password: this.password })
                    .then(response => {
                        this.username = "";
                        this.password = "";
                        this.password2 = "";
                    })
                    .catch(error => {
                        // console.log(error.response.data);
                        if (error.response.data.username) {
                            this.errors.username = error.response.data.username.join('');
                        }
                    })
            }
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>