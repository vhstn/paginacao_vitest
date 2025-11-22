import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '../components/Pagination.vue'

describe('Pagination.vue', () => {
  it('Renderiza o número correto de páginas', () => {
    const wrapper = mount(Pagination, {
      props: {
        totalItems: 32,
        itemsPerPage: 5,
        currentPage: 1,
      },
    })
    const pageButtons = wrapper.findAll('button')
    expect(pageButtons.length).toBe(7 + 2) 
  })

  it('Desabilita o botão "Anterior" na primeira página', () => {
    const wrapper = mount(Pagination, {
      props: {
        totalItems: 32,
        itemsPerPage: 5,
        currentPage: 1,
      },
    })
    const previousButton = wrapper.find('button:first-child')
    expect(previousButton.attributes('disabled')).toBeDefined()
  })

  it('Desabilita o botão "Próximo" na última página', () => {
    const wrapper = mount(Pagination, {
      props: {
        totalItems: 32,
        itemsPerPage: 5,
        currentPage: 7, 
      },
    })
    const nextButton = wrapper.find('button:last-child')
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('Emite o evento "page-changed" com o número da página correto ao clicar em um botão de página', async () => {
    const wrapper = mount(Pagination, {
      props: {
        totalItems: 32,
        itemsPerPage: 5,
        currentPage: 1,
      },
    })
    await wrapper.findAll('button')[3].trigger('click') 
    expect(wrapper.emitted('page-changed')).toBeTruthy()
    expect(wrapper.emitted('page-changed')![0]).toEqual([3])
  })

  it('Emite o evento "page-changed" ao clicar no botão "Próximo"', async () => {
    const wrapper = mount(Pagination, {
      props: {
        totalItems: 32,
        itemsPerPage: 5,
        currentPage: 1,
      },
    })
    await wrapper.find('button:last-child').trigger('click')
    expect(wrapper.emitted('page-changed')).toBeTruthy()
    expect(wrapper.emitted('page-changed')![0]).toEqual([2])
  })

  it('Emite o evento "page-changed" ao clicar no botão "Anterior"', async () => {
    const wrapper = mount(Pagination, {
      props: {
        totalItems: 32,
        itemsPerPage: 5,
        currentPage: 3,
      },
    })
    await wrapper.find('button:first-child').trigger('click')
    expect(wrapper.emitted('page-changed')).toBeTruthy()
    expect(wrapper.emitted('page-changed')![0]).toEqual([2])
  })
})