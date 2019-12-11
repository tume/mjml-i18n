import { BodyComponent } from 'mjml-core'
import { registerDependencies } from 'mjml-validator'

registerDependencies({
  'mj-column': ['mj-date'],
  'mj-date': []
})

export default class MjDate extends BodyComponent {
  static endingTag = true

  static allowedAttributes = {
    locale: 'string',
    weekday: 'string',
    year: 'string',
    month: 'string',
    day: 'string',
    era: 'string',
    hour: 'string',
    minute: 'string',
    second: 'string',
    timeZoneName: 'string'
  }

  static defaultAttributes = {}

  render () {
    const DateFormatter = new Intl.DateTimeFormat(this.getAttribute('locale'), {
      weekday: this.getAttribute('weekday'),
      year: this.getAttribute('year'),
      month: this.getAttribute('month'),
      day: this.getAttribute('day'),
      era: this.getAttribute('era'),
      hour: this.getAttribute('hour'),
      minute: this.getAttribute('minute'),
      second: this.getAttribute('second'),
      timeZoneName: this.getAttribute('timeZoneName')
    })

    let value = this.getContent()

    if (typeof value === 'string') {
      value = new Date(value)
    }

    return `
      <div>${DateFormatter.format(value)}</div>
    `
  }
}
