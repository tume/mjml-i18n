import { BodyComponent } from 'mjml-core'
import { registerDependencies } from 'mjml-validator'

registerDependencies({
  'mj-column': ['mj-number'],
  'mj-number': []
})

export default class MjNumber extends BodyComponent {
  static endingTag = true

  static allowedAttributes = {
    locale: 'string',
    style: 'string',
    currency: 'string'
  }

  static defaultAttributes = {
    style: 'decimal'
  }

  render () {
    const NumberFormatter = new Intl.NumberFormat(this.getAttribute('locale'), {
      style: this.getAttribute('style'),
      currency: this.getAttribute('currency')
    })

    return `
      <div>${NumberFormatter.format(this.getContent())}</div>
    `
  }
}
