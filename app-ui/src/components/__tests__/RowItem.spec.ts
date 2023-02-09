import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import RowItem from '../RowItem.vue';

describe('RowItem', () => {
  it('renders properly', () => {
    const wrapper = mount(RowItem, { props: { item: {name: 'test'}} })
    expect(wrapper.text()).toContain('test')
  })
})
