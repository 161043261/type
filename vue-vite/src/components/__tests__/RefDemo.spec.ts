import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import RefDemo from '../RefDemo.vue'

//! vitest --run --testNamePattern=TestSuiteName.testCaseName <TestFileRelativePath>
//! ./node_modules/.bin/vitest --run --testNamePattern=RefDemo.renderProperly ./src/components/__tests__/RefDemo.spec.ts
describe('RefDemo' /** TestSuiteName */, () => {
  it('renderProperly' /** testCaseName */, () => {
    const wrapper = mount(RefDemo)
    expect(wrapper.text()).toContain('Ref Demo')
  } /** fn */)
})
