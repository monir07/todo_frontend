<template>
    <div class="container mt-5">
        <div class="row d-flex justify-content-center">
            <div class="col-md-12">
                <form v-if="!editing.status" @submit.prevent="addNew" action="" method="POST">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="What do you wanna do" name="title"
                            v-model="newItem.title" required>
                        <div class="input-group-append">
                            <button class="btn btn-primary" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-plus-circle me-2" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path
                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                </svg>
                                Add New</button>
                        </div>
                    </div>
                </form>
                <form v-else @submit.prevent="updateItem" action="" method="POST">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="What do you wanna do" name="title"
                            v-model="editing.item.title" required>
                        <div class="input-group-append">
                            <button class="btn btn-primary" type="submit">Update</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Task Description</th>
                            <th scope="col"></th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in todos" v-bind:key="item.id">
                            <td class="text-start text-wrap">{{ item.title }}</td>
                            <td class="text-center">
                                <div class="form-check" v-if="item.completed">
                                    <input class="form-check-input" type="checkbox" checked :id="item.id">
                                </div>
                                <div v-else class="form-check">
                                    <input class="form-check-input" type="checkbox" :id="item.id"
                                        @change="changeStatus(item)">
                                </div>
                            </td>
                            <td>
                                <button class="btn btn-warning me-2" type="button" @click="edit(item)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd"
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                    Update</button>
                                <button class="btn btn-danger" type="button" @click="deleteItem(item.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-trash" viewBox="0 0 16 16">
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                        <path
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                    </svg>
                                    Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-12">
                <button class="btn btn-success" type="button" @click="logout()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                        <path fill-rule="evenodd"
                            d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                    </svg>
                    Logout from system</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'TodoList',
    data() {
        return {
            todos: [],
            newItem: {
                title: "",
                completed: false,
                user: this.$store.state.user_id
            },
            editing: {
                status: false,
                item: {}
            }
        }
    },
    methods: {
        fetchTodoList() {
            axios.defaults.headers['Authorization'] = `Token ${this.$store.state.token}`;
            const url = '/list-create-todo/';
            axios.get(url)
                .then(response => {
                    this.todos = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        addNew() {
            axios.defaults.headers['Authorization'] = `Token ${this.$store.state.token}`;
            const url = '/list-create-todo/';
            axios.post(url, this.newItem)
                .then(response => {
                    this.todos.unshift(response.data);
                    this.newItem = { title: "", completed: false, user: this.$store.state.user_id }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        edit(item) {
            this.editing.status = true;
            this.editing.item = item;

        },
        changeStatus(item) {
            this.editing.item = item;
            this.editing.item.completed = !item.completed;
            this.updateItem();
        },
        updateItem() {
            axios.defaults.headers['Authorization'] = `Token ${this.$store.state.token}`;
            const url = '/retrieve-update-destroy-todo/' + this.editing.item.id + '/';
            axios.put(url, this.editing.item)
                .then(response => {
                    this.editing.status = false;
                    this.editing.item = {};
                    this.fetchTodoList();
                })
                .catch(error => {
                    console.log(error);
                })
        },
        deleteItem(id) {
            axios.defaults.headers['Authorization'] = `Token ${this.$store.state.token}`;
            const url = '/retrieve-update-destroy-todo/' + id + '/';
            axios.delete(url)
                .then(response => {
                    this.fetchTodoList();
                })
                .catch(error => {
                    console.log(error);
                })
        },
        logout() {
            this.$store.commit('removeToken');
            this.$router.push('/');
        }
    },
    mounted() {
        this.fetchTodoList();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>