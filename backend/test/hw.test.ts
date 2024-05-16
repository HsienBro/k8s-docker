import { describe, test, it, vi, expect } from 'vitest'
import { serverOf } from '../src/server'
import * as TodoService from '../src/services/todo'
import { afterEach } from 'node:test'

describe ('Testing createTodo from Todo Api', () => {
    afterEach(() => {
        vi.resetAllMocks()
    })

    it ('should have name <Peter in todo1', async () => {
        const todo1 = {
            id: '0000',
            name: 'Peter',
            description: 'Doing assignment',
            status: false
        }
        vi.spyOn(TodoService, 'addTodo').mockImplementation(async () => todo1)

        const test1 = await TodoService.addTodo(todo1)
        expect(test1).toHaveProperty('name', 'Peter')
    })
})

describe ('Testing fastify header and msg', () => {
    const server = serverOf()

    test ('when send a request ot /ping, it has a header <test/server> and should send <pong>', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/ping'
        })

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(JSON.parse(response.body).msg).toBe('pong!')
    })
})