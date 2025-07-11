<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-3">
        <SidebarMenu />
      </div>
      <div class="col-md-9">
        <div class="card border-0 rounded-4 shadow-sm">
          <div class="card-header">EDIT USER</div>
          <div class="card-body">
            <form @submit="updateUser">
              <div class="form-group mb-3">
                <label class="mb-1 fw-bold">Full Name</label>
                <input
                  type="text"
                  v-model="name"
                  class="form-control"
                  placeholder="Full Name"
                />
                <div
                  v-if="errors.Name"
                  class="alert alert-danger mt-2 rounded-4"
                >
                  {{ errors.Name }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label class="mb-1 fw-bold">Username</label>
                <input
                  type="text"
                  v-model="username"
                  class="form-control"
                  placeholder="Username"
                />
                <div
                  v-if="errors.Username"
                  class="alert alert-danger mt-2 rounded-4"
                >
                  {{ errors.Username }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label class="mb-1 fw-bold">Email address</label>
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  placeholder="Email Address"
                />
                <div
                  v-if="errors.Email"
                  class="alert alert-danger mt-2 rounded-4"
                >
                  {{ errors.Email }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label class="mb-1 fw-bold">Password</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  placeholder="Password"
                />
                <div
                  v-if="errors.Password"
                  class="alert alert-danger mt-2 rounded-4"
                >
                  {{ errors.Password }}
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-md btn-primary rounded-4 shadow-sm border-0"
                :disabled="isPending"
              >
                {{ isPending ? 'Updating...' : 'Update' }}
              </button>

              <router-link
                to="/admin/users"
                class="btn btn-md btn-secondary rounded-4 shadow-sm border-0 ms-2"
              >
                Cancel
              </router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SidebarMenu from '../../../components/SidebarMenu.vue'
import { useUserById } from '../../../composables/user/useUserById'
import { useUserUpdate } from '../../../composables/user/useUserUpdate'

const route = useRoute()
const router = useRouter()

const id = Number(route.params.id)

const name = ref<string>('')
const username = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')

const errors = reactive<Record<string, string>>({})

const { data: user } = useUserById(id)

watchEffect(() => {
  if (user.value) {
    ;(name.value = user.value.name),
      (username.value = user.value.username),
      (email.value = user.value.email)
  }
})

const { mutate, isPending } = useUserUpdate()

const updateUser = (e: Event) => {
  e.preventDefault()

  mutate(
    {
      id,
      data: {
        name: name.value,
        username: username.value,
        email: email.value,
        password: password.value,
      },
    },
    {
      onSuccess: () => {
        router.push('/admin/users')
      },
      onError: (error: any) => {
        Object.assign(errors, error.response.data.errors)
      },
    }
  )
}
</script>

<style scoped></style>
