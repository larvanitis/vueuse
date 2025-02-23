import YAML from 'js-yaml'
import type { CSSProperties } from 'react'
import { computed, defineComponent, reactive, ref } from 'vue-demi'
import { defineDemo, html } from '../../_docs'
import { useMediaQuery } from '../useMediaQuery'
import { useParallax } from '.'

const targetStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '500px',
  transition: '.3s ease-out all',
}
const cardWindowStyle: CSSProperties = {
  overflow: 'hidden',
  fontSize: '6rem',
  position: 'absolute',
  top: 'calc(50% - 1em)',
  left: 'calc(50% - 1em)',
  height: '2em',
  width: '2em',
  margin: 'auto',
}
const layerBase: CSSProperties = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  transition: '.3s ease-out all',
}
const containerStyle: CSSProperties = {
  margin: '3em auto',
  perspective: '300px',
}

defineDemo(
  {
    name: 'useParallax',
    category: 'Sensors',
    docs: require('./index.md'),
    module,
  },
  defineComponent({
    setup() {
      const target = ref(null)
      const isMobile = useMediaQuery('(max-width: 700px)', { window: window.parent })

      const parallax = reactive(useParallax(target, { window: isMobile.value ? window.parent : window }))

      const infoStyle = computed<CSSProperties>(() => ({
        opacity: 0.4,
        top: '60px',
        left: '60px',
        position: isMobile.value ? 'inherit' : 'absolute',
      }))

      const layer0 = computed(() => ({
        ...layerBase,
        transform: `translateX(${parallax.tilt * 10}px) translateY(${parallax.roll * 10}px) scale(1.33)`,
      }))

      const layer1 = computed(() => ({
        ...layerBase,
        transform: `translateX(${parallax.tilt * 20}px) translateY(${parallax.roll * 20}px) scale(1.33)`,
      }))

      const layer2 = computed(() => ({
        ...layerBase,
        transform: `translateX(${parallax.tilt * 30}px) translateY(${parallax.roll * 30}px) scale(1.33)`,
      }))

      const layer3 = computed(() => ({
        ...layerBase,
        transform: `translateX(${parallax.tilt * 40}px) translateY(${parallax.roll * 40}px) scale(1.33)`,
      }))

      const layer4 = layerBase

      const cardStyle = computed(() => ({
        background: '#fff',
        height: '20rem',
        width: '15rem',
        borderRadius: '5px',
        overflow: 'hidden',
        transition: '.3s ease-out all',
        boxShadow: '0 0 20px 0 rgba(255, 255, 255, 0.25)',
        transform: `rotateX(${parallax.roll * 20}deg) rotateY(${parallax.tilt * 20}deg)`,
      }))

      return {
        target,
        parallax,
        infoStyle,
        layer0,
        layer1,
        layer2,
        layer3,
        layer4,
        cardStyle,
        cardWindowStyle,
        containerStyle,
        targetStyle,
        YAML,
      }
    },

    template: html`
      <div>
        <div ref="target" :style="targetStyle">
          <pre :style="infoStyle">{{YAML.safeDump(parallax)}}</pre>
          <div :style="containerStyle">
            <div :style="cardStyle">
              <div :style="cardWindowStyle">
                <img :style="layer0" src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer0.png" alt=""/>
                <img :style="layer1" src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer1.png" alt=""/>
                <img :style="layer2" src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer2.png" alt=""/>
                <img :style="layer3" src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer3.png" alt=""/>
                <img :style="layer4" src="https://jaromvogel.com/images/design/jumping_rabbit/page2layer4.png" alt=""/>
              </div>
            </div>
          </div>
          <note class="opacity-1">Credit of images to <a href="https://codepen.io/jaromvogel" target="__blank">Jarom Vogel</a></note>
        </div>
      </div>
    `,
  }),
)
