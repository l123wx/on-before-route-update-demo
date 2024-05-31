import { test, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'

import { onRouteQueryChange } from './router'
import Index from '../views/index.vue'

beforeAll(async () => {
    const mockRoute = {
        path: '/',
        query: {
            id: 1
        }
    }
    const mockRouter = {
        push: () => {
            console.log(123)
        }
    }

    const wrapper = mount(Index, {
        global: {
            mocks: {
                $route: mockRoute,
                $router: mockRouter
            }
        }
    })
    console.log(wrapper)
})

test('当', () => {
    onRouteQueryChange(query => {
        console.log(query)
    }, {
        dependencies: []
    })
    expect(1).toBe(1)
})