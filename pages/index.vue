<template>
  <div class="body">
    <div class="container">
      <div class="dialog-container">
        <p class="header">{{ $t('control') }}</p>
        <ETextField v-model="currentUser.name" type="string" :label="$t('account')" />
        <ETextField v-model="currentUser.age" type="number" :label="$t('age')" />
        <div class="button-group">
          <EBtn :text="$t('Modify')" color="success" @click="confirmModifyUser" />
          <EBtn :text="$t('new')" color="warn" @click="confirmAddUser" />
        </div>
      </div>

      <div class="table-container">
        <div v-if="loading" class="loading">
          <p>Loading...</p>
        </div>
        <table v-else>
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t('name') }}</th>
              <th>{{ $t('age') }}</th>
              <th>{{ $t('operate') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in userStore.users" :key="user.id">
              <td>{{ index + 1 }}</td>
              <!--  <td>{{ user.id }}</td>  -->
              <td>{{ user.name }}</td>
              <td>{{ user.age }}</td>
              <td class="button">
                <EBtn :text="$t('Modify')" color="success" @click="editUser(user)" />
                <EBtn :text="$t('Delete')" color="error" @click="confirmDeleteUser(user.id)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <label for="language-select">{{ $t('selectLanguage') }}</label>
        <select id="language-select" v-model="selectedLanguage" @change="changeLanguage">
          <option value="zh">繁體中文</option>
          <option value="en">English</option>
        </select>
      </div>

      <!-- Confirmation Dialog -->
      <dialog ref="confirmDialog">
        <p>{{ confirmationMessage }}</p>
        <div class="button-group">
          <EBtn @click="executeAction" color="success">{{ $t('confirm') }}</EBtn>
          <EBtn @click="cancelAction" color="error">{{ $t('cancel') }}</EBtn>
        </div>
      </dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import { useUserStore } from '@/store/userStore'
const runtimeConfig = useRuntimeConfig()
const { API_BASE_URL } = runtimeConfig.public // Define a constant for the base URL

import axios from 'axios'
import EBtn from '@/components/EBtn.vue'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const userStore = useUserStore()
const { locale, t } = useI18n() // Access the i18n locale
const currentUser = ref({ id: null, name: '', age: null }) // Reactive object for current user
const selectedLanguage = ref(locale.value) // Reactive variable for selected language
const loading = ref(false) // Loading state

const confirmDialog = ref(null)
const confirmationMessage = ref('')
let pendingAction = null

const fetchUsers = async () => {
  loading.value = true // Set loading to true before fetching
  try {
    const response = await axios.get(`${API_BASE_URL}/api/user`)
    userStore.setUsers(response.data.data)
  } finally {
    loading.value = false // Set loading to false after fetching
  }
}

// Fetch users when the component is mounted
onMounted(() => {
  fetchUsers()
})

// Watch for changes in selectedLanguage and update locale
watch(selectedLanguage, (newLang) => {
  locale.value = newLang
})

const editUser = (user) => {
  currentUser.value = { ...user }
}

const modifyUser = async () => {
  if (currentUser.value.id) {
    await axios.put(`${API_BASE_URL}/api/user`, {
      name: currentUser.value.name,
      age: currentUser.value.age,
      id: currentUser.value.id,
    })
    fetchUsers()
  }
}

const addUser = async () => {
  await axios.post(`${API_BASE_URL}/api/user`, {
    name: currentUser.value.name,
    age: currentUser.value.age,
  })
  fetchUsers()
}

const deleteUser = async (userId: number) => {
  await axios.delete(`${API_BASE_URL}/api/user`, {
    data: {
      id: userId,
    },
  })
  fetchUsers()
}

const changeLanguage = (e) => {
  e.preventDefault();
  locale.value = selectedLanguage.value // Update the locale based on the selected language
}

const confirmModifyUser = () => {
  confirmationMessage.value = t('modifyConfirmMessage')
  pendingAction = modifyUser
  confirmDialog.value.showModal()
}

const confirmAddUser = () => {
  confirmationMessage.value = t('addConfirmMessage')
  pendingAction = addUser
  confirmDialog.value.showModal()
}

const confirmDeleteUser = (userId) => {
  confirmationMessage.value = t('deleteConfirmMessage')
  pendingAction = () => deleteUser(userId)
  confirmDialog.value.showModal()
}

const executeAction = async () => {
  if (pendingAction) {
    await pendingAction()
    confirmDialog.value.close()
  }
}

const cancelAction = () => {
  confirmDialog.value.close()
}
</script>
