import { defineStore } from 'pinia'


interface User {
    id: number
    name: string
    age: number
}

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [] as User[],
    }),
    actions: {
        setUsers(users: User[]) {
            this.users = users
        },
        addUser(user: User) {
            this.users.push(user)
        },
        removeUser(userId: number) {
            this.users = this.users.filter(user => user.id !== userId)
        },
    },
}) 