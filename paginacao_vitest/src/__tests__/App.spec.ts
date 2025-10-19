import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'
import { nextTick } from 'vue'

describe('App.vue', () => {
  it('Renderiza a primeira página de itens por padrão', async () => {
    const wrapper = mount(App)
    
    await nextTick()

    const items = wrapper.findAll('.space-y-3 > div')
    expect(items.length).toBe(5)
    expect(items[0].text()).toContain('Produto 1')
    expect(items[4].text()).toContain('Produto 5')
  })

  it('Muda para a segunda página e renderiza os itens corretos ao clicar na página 2', async () => {
    const wrapper = mount(App)
    await nextTick()

    await wrapper.findAll('button')[2].trigger('click')
    await nextTick() 

    const items = wrapper.findAll('.space-y-3 > div')
    expect(items.length).toBe(5)
    expect(items[0].text()).toContain('Produto 6')
    expect(items[4].text()).toContain('Produto 10')
    expect(wrapper.find('h1').text()).toContain('Página 2')
  })

  it('Exibe os últimos itens ao ir para a última página', async () => {
    const wrapper = mount(App)
    await nextTick()

    await wrapper.findAll('button')[7].trigger('click')
    await nextTick() 

    const items = wrapper.findAll('.space-y-3 > div')
    expect(items.length).toBe(2) 
    expect(items[0].text()).toContain('Produto 31')
    expect(items[1].text()).toContain('Produto 32')
    expect(wrapper.find('h1').text()).toContain('Página 7')
  })
})