import { test, expect, beforeEach, vi, describe, Mock } from 'vitest'
import { nextTick, reactive } from 'vue'

import { onRouteQueryChange } from './router'
import { LocationQuery } from 'vue-router'

const route = reactive<{
    path: string
    query: LocationQuery
}>({
    path: '/',
    query: {}
})

vi.mock('vue-router', async () => {
    return {
        useRoute: () => route
    }
})

let callback: Mock
beforeEach(() => {
    route.path = '/'
    route.query = {}
    callback = vi.fn()
})

test('route query 改变时触发回调', async () => {
    onRouteQueryChange(callback)
    route.query.t = '1'

    await nextTick()
    expect(callback).toHaveBeenCalledTimes(1)
})

test('当 route path 变化之后，route query 改变也不会触发回调', async () => {
    onRouteQueryChange(callback)
    route.path = '/about'
    route.query.t = '1'

    await nextTick()
    expect(callback).toHaveBeenCalledTimes(0)
})

test('当 route path 变回来之后，route query 没有改变不会触发回调', async () => {
    route.path = '/about'
    onRouteQueryChange(callback)
    route.path = '/'
    route.path = '/about'

    await nextTick()
    expect(callback).toHaveBeenCalledTimes(0)
})

test('当 route path 变回来之后，如果 route query 改变则触发回调', async () => {
    route.path = '/about'
    onRouteQueryChange(callback)
    route.path = '/'
    route.path = '/about'
    route.query.t = '1'

    await nextTick()
    expect(callback).toHaveBeenCalledTimes(1)
})

test('开启 immediate 之后，会在调用 onRouteQueryChange 后立刻回调', async () => {
    onRouteQueryChange(callback, { immediate: true })

    await nextTick()
    expect(callback).toHaveBeenCalledTimes(1)
})

describe('在 dependencies 设置监听的依赖项', () => {
    test('如果 dependencies 为空数组，那 query 的任何变化都不会触发回调了', async () => {
        onRouteQueryChange(callback, {
            dependencies: []
        })
    
        await nextTick()
        expect(callback).toHaveBeenCalledTimes(0)
    })

    test('只有 dependencies 数组内的参数变化时会触发回调', async () => {
        onRouteQueryChange(callback, {
            dependencies: ['t']
        })
        route.query.t = '1'
        route.query.s = '1'
    
        await nextTick()
        expect(callback).toHaveBeenCalledTimes(1)
    })
})