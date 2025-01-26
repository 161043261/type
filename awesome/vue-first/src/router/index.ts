// route table
import { createRouter, createWebHistory } from 'vue-router'
import Hook from '@/views/Hook.vue'
import Computed from '@/views/Computed.vue'
import ToRefs from '@/views/ToRefs.vue'
import Query from '@/views/Query.vue'
import QueryChild from '@/views/QueryChild.vue'
import Param from '@/views/Param.vue'
import ParamChild from '@/views/ParamChild.vue'
//
// inter-component communication
//
import Model from '@/views/communicate/v-model/Parent.vue'
import Props from '@/views/communicate/props/Parent.vue'
import Event from '@/views/communicate/custom-event/Parent.vue'
import Bus from '@/views/communicate/mitt/Parent.vue'
import Attrs from '@/views/communicate/$attrs/Grandparent.vue'
import RefsParent from '@/views/communicate/$refs-$parent/Parent.vue'
import ProvideInject from '@/views/communicate/provide-inject/Grandparent.vue'
import Slot from '@/views/communicate/slot/Parent.vue'
import ScopedSlot from '@/views/communicate/slot/scoped/Parent.vue'
// create router
const router = createRouter({
  history: createWebHistory(), // Router Mode
  routes: [
    { path: '/computed', component: Computed },
    { path: '/torefs', component: ToRefs },
    { name: 'hookComponent', path: '/hook', component: Hook },
    {
      path: '/query',
      component: Query,
      children: [
        {
          name: 'queryChild',
          path: 'child',
          component: QueryChild, // <QueryChild/>
          props(route) {
            return route.query
          } // <QueryChild :id=? :title=? :content=?/>
          // props: {a: 1, b: 2, c: 3}
        }
      ]
    }, // "/detail" ×
    {
      path: '/param',
      component: Param,
      children: [
        {
          name: 'paramChild',
          path: 'child/:id/:title/:content?', // ? optional path variable
          component: ParamChild, // <ParamChild />
          props: true // <ParamChild :id=? :title=? :content=? />
          // props(route) { return route.params; }
        }
      ]
    },
    { path: '/', redirect: '/computed' },
    { path: '/props', component: Props },
    { path: '/event', component: Event },
    { path: '/mitt', component: Bus },
    { path: '/model', component: Model },
    { path: '/attrs', component: Attrs },
    { path: '/refs-parent', component: RefsParent },
    { path: '/provide-inject', component: ProvideInject },
    { path: '/slot', component: Slot },
    { path: '/slot/scoped', component: ScopedSlot }
  ]
})

// expose router
export default router
